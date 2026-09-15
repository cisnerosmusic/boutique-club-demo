"""Revisor de la demo del Boutique Club. Sale con 1 si algo falla.

Uso: python pruebas/revisar.py
Las comprobaciones del QR necesitan segno y zxing-cpp (pip install segno zxing-cpp)
y la del emblema en JavaScript necesita node.
"""
import json
import pathlib
import re
import subprocess
import sys
from html.parser import HTMLParser

RAIZ = pathlib.Path(__file__).resolve().parent.parent
PAGINAS = ["index.html", "card/index.html", "welcome/index.html",
           "passport/index.html", "members/index.html"]
# Direcciones viejas (en español) que redirigen a las nuevas
REDIRECCIONES = {"tarjeta": "card", "bienvenida": "welcome", "pasaporte": "passport", "miembros": "members"}
VETADAS = [
    (re.compile("—"), "raya larga"),
    (re.compile(r"\bmaster\b", re.I), "'master' (regla del dueño: expert)"),
    (re.compile(r"\$\s?\d"), "precio"),
    (re.compile(r"de por vida|lifetime", re.I), "promesa de por vida"),
    (re.compile(r"exclusiv\w* (para|de|for|to) Tesla", re.I), "XPEL exclusivo de Tesla"),
]
CLAVES_USADAS = re.compile(r'data-i18n(?:-html)?="([\w.-]+)"')
ATRIBUTOS_I18N = re.compile(r'data-i18n-attr="([^"]+)"')
NUMERO_DEMO = 7   # el miembro de la tarjeta y el pasaporte


class Enlaces(HTMLParser):
    def __init__(self):
        super().__init__()
        self.refs = []
        self.meta_robots = None
        self.lang = None

    def handle_starttag(self, tag, attrs):
        a = dict(attrs)
        if tag == "html":
            self.lang = a.get("lang")
        if tag == "meta" and a.get("name") == "robots":
            self.meta_robots = a.get("content", "")
        for k in ("href", "src"):
            v = a.get(k)
            if v and not re.match(r"^(https?:|mailto:|tel:|#|data:)", v):
                self.refs.append(v)


def claves_de(txt):
    claves = set(CLAVES_USADAS.findall(txt))
    for grupo in ATRIBUTOS_I18N.findall(txt):
        for par in grupo.split(";"):
            if ":" in par:
                claves.add(par.split(":", 1)[1].strip())
    return claves


def revisar_paginas(fallos, i18n_txt):
    definidas = set(re.findall(r"'([\w.-]+)'\s*:", i18n_txt))
    for rel in PAGINAS:
        p = RAIZ / rel
        if not p.exists():
            fallos.append(f"falta {rel}")
            continue
        txt = p.read_text(encoding="utf-8")
        for rx, motivo in VETADAS:
            if rx.search(txt):
                fallos.append(f"{rel}: {motivo}")
        if "Demo with fictitious data" not in txt:
            fallos.append(f"{rel}: sin aviso de demo")
        if "not affiliated with Tesla, Inc." not in txt:
            fallos.append(f"{rel}: sin aviso de taller independiente")
        e = Enlaces()
        e.feed(txt)
        if e.lang != "en":
            fallos.append(f"{rel}: lang no es 'en' (el inglés es la primera lengua)")
        if not e.meta_robots or "noindex" not in e.meta_robots:
            fallos.append(f"{rel}: sin noindex")
        for ref in e.refs:
            destino = (p.parent / ref.split("#")[0].split("?")[0]).resolve()
            if destino.is_dir():
                destino = destino / "index.html"
            if not destino.exists():
                fallos.append(f"{rel}: enlace roto {ref}")
        for clave in sorted(claves_de(txt) - definidas):
            fallos.append(f"{rel}: sin traducción al español para '{clave}'")

    for viejo, nuevo in REDIRECCIONES.items():
        p = RAIZ / viejo / "index.html"
        if not p.exists():
            fallos.append(f"falta la redirección /{viejo}/")
            continue
        txt = p.read_text(encoding="utf-8")
        if f"../{nuevo}/" not in txt or "noindex" not in txt:
            fallos.append(f"/{viejo}/ no redirige bien a /{nuevo}/")


def revisar_recursos(fallos, i18n_txt):
    for rel in ["assets/js/datos.js", "assets/js/club.js", "assets/js/i18n.js",
                "assets/js/emblema.js", "assets/css/club.css"]:
        p = RAIZ / rel
        if not p.exists():
            fallos.append(f"falta {rel}")
            continue
        txt = p.read_text(encoding="utf-8")
        for rx, motivo in VETADAS:
            if rx.search(txt):
                fallos.append(f"{rel}: {motivo}")
    datos = RAIZ / "assets/js/datos.js"
    if datos.exists():
        dtxt = datos.read_text(encoding="utf-8")
        for img in re.findall(r"img/([\w.-]+\.webp)", dtxt):
            if not (RAIZ / "assets/img" / img).exists():
                fallos.append(f"datos.js: falta imagen {img}")
        for color in set(re.findall(r'color: "(\w+)"', dtxt)):
            if f"'color.{color}'" not in i18n_txt:
                fallos.append(f"datos.js: color '{color}' sin texto en i18n.js")
        for grupo in re.findall(r"proteccion: \[([^\]]*)\]", dtxt):
            for prot in re.findall(r'"(\w+)"', grupo):
                if f"'prot.{prot}'" not in i18n_txt:
                    fallos.append(f"datos.js: protección '{prot}' sin texto en i18n.js")
    robots = RAIZ / "robots.txt"
    if not robots.exists() or "Disallow: /" not in robots.read_text(encoding="utf-8"):
        fallos.append("robots.txt no bloquea")


def revisar_emblema_y_qr(fallos):
    sys.path.insert(0, str(RAIZ / "herramientas"))
    try:
        import emblema
    except Exception as e:  # noqa: BLE001
        fallos.append(f"emblema: no se pudo cargar herramientas/emblema.py ({e})")
        return
    primeros = emblema.patrones(2000)
    if len(set(primeros)) != len(primeros):
        fallos.append("emblema: hay patrones repetidos entre los 2000 primeros miembros")
    datos_txt = (RAIZ / "assets/js/datos.js").read_text(encoding="utf-8")
    numeros = sorted({int(n) for n in re.findall(r'numero: "(\d+)"', datos_txt)})
    en_python = [emblema.patron(n) for n in numeros]
    codigo = ("global.window = {}; require('./assets/js/emblema.js');"
              "process.stdout.write(JSON.stringify(%s.map(function (n) { return window.BC_EMBLEMA.patron(n); })));"
              % json.dumps(numeros))
    try:
        r = subprocess.run(["node", "-e", codigo], cwd=RAIZ, capture_output=True, text=True, timeout=60)
        en_js = json.loads(r.stdout) if r.returncode == 0 else None
    except (OSError, ValueError, subprocess.TimeoutExpired):
        en_js = None
    if en_js is None:
        fallos.append("emblema: no se pudo ejecutar assets/js/emblema.js con node")
    elif en_js != en_python:
        fallos.append(f"emblema: Python y JavaScript no coinciden ({en_python} frente a {en_js})")

    try:
        import generar_qr
        m, tinta = generar_qr.matriz_con_emblema(NUMERO_DEMO)
    except ImportError as e:
        fallos.append(f"QR: falta una librería para comprobarlo ({e}); pip install segno zxing-cpp")
        return
    qr_svg = RAIZ / "assets/img/qr-welcome.svg"
    if not qr_svg.exists():
        fallos.append("falta el QR")
    elif qr_svg.read_text(encoding="utf-8") != generar_qr.svg(m, tinta):
        fallos.append("QR: el SVG no está al día; ejecuta python herramientas/generar_qr.py")
    for escala in (4, 2):
        try:
            texto = generar_qr.leer(m, tinta, escala)
        except ImportError as e:
            fallos.append(f"QR: falta una librería para leerlo ({e}); pip install zxing-cpp")
            return
        if texto != generar_qr.URL:
            fallos.append(f"QR: no se lee a escala {escala} (leído: {texto!r})")


def revisar():
    fallos = []
    i18n = RAIZ / "assets/js/i18n.js"
    i18n_txt = i18n.read_text(encoding="utf-8") if i18n.exists() else ""
    if not i18n_txt:
        fallos.append("falta assets/js/i18n.js")
    for frase in ("no afiliado a Tesla, Inc.", "Demo con datos ficticios"):
        if frase not in i18n_txt:
            fallos.append(f"i18n.js: falta '{frase}' en español")
    revisar_paginas(fallos, i18n_txt)
    revisar_recursos(fallos, i18n_txt)
    revisar_emblema_y_qr(fallos)
    return fallos


if __name__ == "__main__":
    f = revisar()
    print("\n".join(f) if f else "OK: la demo pasa el revisor")
    sys.exit(1 if f else 0)
