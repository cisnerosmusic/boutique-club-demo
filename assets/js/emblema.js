/* Emblema único del miembro: rejilla de 5 x 5 módulos en espejo, derivada del número.
   Mismo algoritmo que herramientas/emblema.py (el revisor comprueba que coinciden):
   i -> (A * i + B) mod 2^15 recorre los 32.768 valores sin repetir; se descartan los
   casi vacíos y los casi llenos; el miembro n recibe el n-ésimo valor válido. */
(function (w) {
  'use strict';
  var ESPACIO = 1 << 15, A = 20021, B = 12345, MIN_ON = 6, MAX_ON = 10;
  var cache = {};

  function unos(v) { var c = 0; while (v) { c += v & 1; v >>= 1; } return c; }

  function patron(n) {
    if (cache[n] != null) return cache[n];
    var vistos = 0;
    for (var i = 0; i < ESPACIO; i++) {
      var v = (A * i + B) % ESPACIO;
      var k = unos(v);
      if (k >= MIN_ON && k <= MAX_ON) {
        vistos++;
        if (vistos === n) { cache[n] = v; return v; }
      }
    }
    return 0;
  }

  function rejilla(n) {
    var v = patron(n), g = [];
    for (var f = 0; f < 5; f++) {
      var fila = [];
      for (var c = 0; c < 5; c++) fila.push((v >> (f * 3 + (c <= 2 ? c : 4 - c))) & 1);
      g.push(fila);
    }
    return g;
  }

  /* SVG del emblema como avatar: celdas claras sobre una loseta oscura */
  function svg(n, etiqueta) {
    var g = rejilla(n), celdas = '';
    for (var f = 0; f < 5; f++) {
      for (var c = 0; c < 5; c++) {
        if (g[f][c]) celdas += '<rect x="' + (c + 1) + '" y="' + (f + 1) + '" width="1" height="1"/>';
      }
    }
    var titulo = String(etiqueta || '').replace(/[<>&"]/g, '');
    return '<svg class="emblema" viewBox="0 0 7 7" role="img" aria-label="' + titulo + '" shape-rendering="crispEdges">' +
      '<rect class="emblema-fondo" width="7" height="7" rx="1"/><g class="emblema-celdas">' + celdas + '</g></svg>';
  }

  w.BC_EMBLEMA = { patron: patron, rejilla: rejilla, svg: svg };
})(typeof window !== 'undefined' ? window : globalThis);
