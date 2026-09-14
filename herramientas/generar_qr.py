"""Genera el QR de la tarjeta de bienvenida.

Uso: python herramientas/generar_qr.py
Necesita segno (pip install segno). Solo se ejecuta al preparar la demo; la web
publicada no carga nada de esto.
"""
import pathlib

import segno

URL = "https://cisnerosmusic.github.io/boutique-club-demo/bienvenida/"
destino = pathlib.Path(__file__).resolve().parent.parent / "assets" / "img" / "qr-bienvenida.svg"
segno.make(URL, error="m").save(str(destino), scale=6, border=2, dark="#0a0a0a", light="#ffffff")
print("QR ->", destino)
