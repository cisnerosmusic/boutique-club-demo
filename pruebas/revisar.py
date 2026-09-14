"""Revisor de la demo del Boutique Club. Sin dependencias. Sale con 1 si algo falla.

Uso: python pruebas/revisar.py
"""
import pathlib
import re
import sys
from html.parser import HTMLParser

RAIZ = pathlib.Path(__file__).resolve().parent.parent
PAGINAS = ["index.html", "tarjeta/index.html", "bienvenida/index.html",
           "pasaporte/index.html", "miembros/index.html"]
VETADAS = [
    (re.compile("—"), "raya larga"),
    (re.compile(r"\bmaster\b", re.I), "'master' (regla del dueño: expert)"),
    (re.compile(r"\$\s?\d"), "precio"),
    (re.compile(r"de por vida|lifetime", re.I), "promesa de por vida"),
    (re.compile(r"exclusiv\w* (para|de|for) Tesla", re.I), "XPEL exclusivo de Tesla"),
]


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


def revisar():
    fallos = []
    for rel in PAGINAS:
        p = RAIZ / rel
        if not p.exists():
            fallos.append(f"falta {rel}")
            continue
        txt = p.read_text(encoding="utf-8")
        for rx, motivo in VETADAS:
            if rx.search(txt):
                fallos.append(f"{rel}: {motivo}")
        if "Demo con datos ficticios" not in txt:
            fallos.append(f"{rel}: sin aviso de demo")
        if "no afiliado a Tesla, Inc." not in txt:
            fallos.append(f"{rel}: sin aviso de taller independiente")
        e = Enlaces()
        e.feed(txt)
        if e.lang != "es":
            fallos.append(f"{rel}: lang no es 'es'")
        if not e.meta_robots or "noindex" not in e.meta_robots:
            fallos.append(f"{rel}: sin noindex")
        for ref in e.refs:
            destino = (p.parent / ref.split("#")[0].split("?")[0]).resolve()
            if destino.is_dir():
                destino = destino / "index.html"
            if not destino.exists():
                fallos.append(f"{rel}: enlace roto {ref}")
    for rel in ["assets/js/datos.js", "assets/js/club.js", "assets/css/club.css"]:
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
        for img in re.findall(r"img/([\w.-]+\.webp)", datos.read_text(encoding="utf-8")):
            if not (RAIZ / "assets/img" / img).exists():
                fallos.append(f"datos.js: falta imagen {img}")
    if not (RAIZ / "assets/img/qr-bienvenida.svg").exists():
        fallos.append("falta el QR")
    robots = RAIZ / "robots.txt"
    if not robots.exists() or "Disallow: /" not in robots.read_text(encoding="utf-8"):
        fallos.append("robots.txt no bloquea")
    return fallos


if __name__ == "__main__":
    f = revisar()
    print("\n".join(f) if f else "OK: la demo pasa el revisor")
    sys.exit(1 if f else 0)
