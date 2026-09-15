"""Emblema único del miembro: rejilla de 5 x 5 módulos en espejo, derivada del número.

Mismo algoritmo que assets/js/emblema.js; el revisor comprueba que coinciden.
- 15 bits: 3 columnas x 5 filas; las columnas 4 y 5 son el espejo de la 2 y la 1.
- i -> (A * i + B) mod 2^15, con A impar, recorre los 32.768 valores sin repetir.
- Se descartan los casi vacíos y los casi llenos (menos de 6 o más de 10 bits).
- El miembro n recibe el n-ésimo valor válido: dos números nunca comparten emblema.
"""
BITS = 15
ESPACIO = 1 << BITS
A, B = 20021, 12345
MIN_ON, MAX_ON = 6, 10


def patrones(cuantos):
    """Los primeros `cuantos` valores válidos, en orden de asignación."""
    salida = []
    for i in range(ESPACIO):
        v = (A * i + B) % ESPACIO
        if MIN_ON <= bin(v).count("1") <= MAX_ON:
            salida.append(v)
            if len(salida) == cuantos:
                break
    return salida


def patron(n):
    """Valor de 15 bits del miembro número n (n >= 1)."""
    if n < 1:
        raise ValueError("el número de miembro empieza en 1")
    lista = patrones(n)
    if len(lista) < n:
        raise ValueError("no quedan emblemas libres")
    return lista[-1]


def rejilla(n):
    """Rejilla 5 x 5 de 0 y 1 (filas de arriba abajo)."""
    v = patron(n)
    return [[(v >> (fila * 3 + (c if c <= 2 else 4 - c))) & 1 for c in range(5)]
            for fila in range(5)]
