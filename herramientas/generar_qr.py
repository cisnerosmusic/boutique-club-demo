"""Genera el QR de la tarjeta con el emblema del miembro en el centro.

Uso: python herramientas/generar_qr.py [numero]    (por defecto 7, el de la demo)
Necesita segno (pip install segno); para comprobar la lectura, zxing-cpp.
La web publicada no carga nada de esto: solo el SVG resultante.

El QR va con corrección de errores H (admite en torno a un 30 % de daño). En el
centro se abre un hueco claro y se dibuja el emblema en índigo, cada celda de
3 x 3 módulos. El revisor decodifica el resultado para asegurar que se lee.
"""
import pathlib
import sys

import segno

sys.path.insert(0, str(pathlib.Path(__file__).resolve().parent))
from emblema import rejilla  # noqa: E402

URL = "https://cisnerosmusic.github.io/boutique-club-demo/welcome/"
RAIZ = pathlib.Path(__file__).resolve().parent.parent
DESTINO = RAIZ / "assets" / "img" / "qr-welcome.svg"
CELDA = 3     # módulos por celda del emblema
MARGEN = 1    # módulos claros alrededor del emblema
BORDE = 2     # zona tranquila (el QR se muestra sobre blanco)
OSCURO, CLARO, TINTA = "#0a0a0a", "#ffffff", "#2B3990"


def matriz_con_emblema(numero):
    """Matriz del QR (1 = oscuro) con el emblema en el centro, y las celdas en tinta."""
    qr = segno.make(URL, error="h")
    m = [list(fila) for fila in qr.matrix]
    n = len(m)
    lado = 5 * CELDA + 2 * MARGEN
    ini = (n - lado) // 2
    for y in range(lado):
        for x in range(lado):
            m[ini + y][ini + x] = 0
    tinta = set()
    for fy, fila in enumerate(rejilla(numero)):
        for fx, on in enumerate(fila):
            if not on:
                continue
            for dy in range(CELDA):
                for dx in range(CELDA):
                    yy = ini + MARGEN + fy * CELDA + dy
                    xx = ini + MARGEN + fx * CELDA + dx
                    m[yy][xx] = 1
                    tinta.add((yy, xx))
    return m, tinta


def svg(m, tinta, borde=BORDE):
    """SVG nítido: un trazo por tramo horizontal, módulos del QR en negro y emblema en índigo."""
    n = len(m)
    total = n + 2 * borde
    oscuro, azul = [], []
    for y, fila in enumerate(m):
        x = 0
        while x < n:
            if not fila[x]:
                x += 1
                continue
            ini, es_tinta = x, (y, x) in tinta
            while x < n and fila[x] and ((y, x) in tinta) == es_tinta:
                x += 1
            (azul if es_tinta else oscuro).append(f"M{ini + borde} {y + borde}h{x - ini}v1h-{x - ini}z")
    return (f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {total} {total}" shape-rendering="crispEdges">'
            f'<rect width="{total}" height="{total}" fill="{CLARO}"/>'
            f'<path fill="{OSCURO}" d="{"".join(oscuro)}"/>'
            f'<path fill="{TINTA}" d="{"".join(azul)}"/>'
            "</svg>\n")


def pixeles(m, tinta, escala=4, borde=4):
    """Imagen en grises (bytes) para decodificar; la tinta índigo se ve como gris oscuro (60)."""
    n = len(m)
    lado = (n + 2 * borde) * escala
    buf = bytearray(b"\xff") * (lado * lado)
    for y in range(n):
        for x in range(n):
            if m[y][x]:
                valor = 60 if (y, x) in tinta else 0
                for dy in range(escala):
                    ini = ((y + borde) * escala + dy) * lado + (x + borde) * escala
                    buf[ini:ini + escala] = bytes([valor]) * escala
    return bytes(buf), lado


def leer(m, tinta, escala=4):
    """Texto que un lector de QR saca de la matriz, o None si no la lee."""
    import zxingcpp
    datos, lado = pixeles(m, tinta, escala)
    try:
        res = zxingcpp.read_barcodes(memoryview(datos).cast("B", shape=[lado, lado]))
    except (TypeError, ValueError):
        from PIL import Image
        res = zxingcpp.read_barcodes(Image.frombytes("L", (lado, lado), datos))
    return res[0].text if res else None


if __name__ == "__main__":
    numero = int(sys.argv[1]) if len(sys.argv) > 1 else 7
    m, tinta = matriz_con_emblema(numero)
    DESTINO.write_text(svg(m, tinta), encoding="utf-8")
    n = len(m)
    hueco = (5 * CELDA + 2 * MARGEN) ** 2
    print(f"QR -> {DESTINO}  ({n}x{n} módulos; el emblema ocupa {hueco} = {100 * hueco / n / n:.1f} %)")
    try:
        print("Lectura:", leer(m, tinta))
    except ImportError:
        print("Lectura: sin comprobar (pip install zxing-cpp)")
