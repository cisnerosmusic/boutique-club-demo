/* Boutique Club (demo): lo único dinámico de la demo.
   - La elección de cómo aparecer se guarda en este navegador (localStorage).
   - El muro se pinta desde datos.js.
   - El mapa del pasaporte resalta la zona tocada.
   - La linterna del sitio se enciende al entrar en vista. */
(function () {
  'use strict';
  var CLAVE = 'bc-demo-eleccion';
  var CLAVE_SUG = 'bc-demo-sin-sugerencias';
  var raiz = document.body.getAttribute('data-raiz') || '';
  var BC = window.BC || { yo: {}, miembros: [] };

  function leer(clave) {
    try { var v = localStorage.getItem(clave); return v ? JSON.parse(v) : null; } catch (e) { return null; }
  }
  function guardar(clave, valor) {
    try { localStorage.setItem(clave, JSON.stringify(valor)); } catch (e) { /* sin almacenamiento: la demo sigue */ }
  }
  function eleccion() { return leer(CLAVE); }
  function nombreVisible(e) {
    if (!e) return null;
    if (e.modo === 'nombre') return BC.yo.nombre;
    if (e.modo === 'alias') return e.alias || ('Miembro #' + BC.yo.numero);
    return null;
  }
  function nodo(tag, clase, texto) {
    var n = document.createElement(tag);
    if (clase) n.className = clase;
    if (texto != null) n.textContent = texto;
    return n;
  }

  function ficha(m, esTu) {
    var art = nodo('article', 'ficha' + (esTu ? ' es-tu' : ''));
    var img = nodo('img');
    img.src = raiz + m.foto;
    img.alt = m.carro + ' ' + m.color + ' de ' + m.nombre;
    img.loading = 'lazy';
    art.appendChild(img);
    if (esTu) art.appendChild(nodo('span', 'marca-tu', 'Tú'));
    var c = nodo('div', 'ficha-cuerpo');
    c.appendChild(nodo('div', 'ficha-num', '#' + m.numero + (m.fundador ? ' · Miembro fundador' : '')));
    c.appendChild(nodo('div', 'ficha-nombre', m.nombre));
    c.appendChild(nodo('div', 'ficha-carro', m.carro + ' · ' + m.color));
    var chips = nodo('div', 'chips');
    (m.proteccion || []).forEach(function (p) { chips.appendChild(nodo('span', 'pill', p)); });
    c.appendChild(chips);
    art.appendChild(c);
    return art;
  }

  function pintarMuro() {
    var nv = nombreVisible(eleccion());
    document.querySelectorAll('[data-bc="muro"]').forEach(function (cont) {
      var limite = parseInt(cont.getAttribute('data-limite'), 10) || Infinity;
      var lista = [];
      if (nv) lista.push({ m: Object.assign({}, BC.yo, { nombre: nv }), tu: true });
      BC.miembros.forEach(function (m) { lista.push({ m: m, tu: false }); });
      cont.textContent = '';
      lista.slice(0, limite).forEach(function (x) { cont.appendChild(ficha(x.m, x.tu)); });
    });
  }

  function bienvenida() {
    var botones = document.querySelectorAll('[data-bc-elegir]');
    if (!botones.length) return;
    var caja = document.getElementById('alias-caja');
    var input = document.getElementById('alias');
    var mostrar = document.querySelector('[data-bc-mostrar-alias]');
    var prev = document.querySelector('[data-bc="preview"]');
    var prevNombre = null;
    if (prev) {
      var f = ficha(BC.yo, true);
      prev.appendChild(f);
      prevNombre = f.querySelector('.ficha-nombre');
    }
    function nombrePrevio() {
      if (!prevNombre) return;
      var abierto = caja && !caja.hidden;
      prevNombre.textContent = abierto ? (input.value.trim() || ('Miembro #' + BC.yo.numero)) : BC.yo.nombre;
    }
    if (mostrar && caja) {
      mostrar.addEventListener('click', function () {
        var abrir = caja.hidden;
        caja.hidden = !abrir;
        mostrar.setAttribute('aria-expanded', String(abrir));
        if (abrir) input.focus();
        nombrePrevio();
      });
    }
    if (input) input.addEventListener('input', nombrePrevio);
    botones.forEach(function (b) {
      b.addEventListener('click', function () {
        var modo = b.getAttribute('data-bc-elegir');
        guardar(CLAVE, { modo: modo, alias: modo === 'alias' && input ? input.value.trim() : '' });
        location.href = raiz + 'pasaporte/';
      });
    });
  }

  function pasaporte() {
    var span = document.querySelector('[data-bc="como-apareces"]');
    if (!span) return;
    var e = eleccion();
    var aviso = document.querySelector('[data-bc="sin-eleccion"]');
    if (!e) {
      span.textContent = 'Sin elegir';
      if (aviso) aviso.hidden = false;
    } else if (e.modo === 'privado') {
      span.textContent = 'Solo pasaporte, no apareces en el muro';
    } else {
      span.textContent = nombreVisible(e);
    }

    var sug = document.querySelector('[data-bc="sugerencia"]');
    var ocultar = document.querySelector('[data-bc="ocultar-sugerencias"]');
    if (sug && leer(CLAVE_SUG)) sug.hidden = true;
    if (sug && ocultar) {
      ocultar.addEventListener('click', function () { guardar(CLAVE_SUG, true); sug.hidden = true; });
    }

    var mapa = document.querySelector('[data-bc="mapa"]');
    if (!mapa) return;
    function activar(z) {
      document.querySelectorAll('.zona.activa, .zonas-lista li.activa').forEach(function (n) { n.classList.remove('activa'); });
      document.querySelectorAll('[data-zona="' + z + '"]').forEach(function (g) {
        if (g.tagName === 'LI') g.classList.add('activa');
        else g.querySelectorAll('.zona').forEach(function (s) { s.classList.add('activa'); });
      });
    }
    mapa.addEventListener('click', function (ev) {
      var g = ev.target.closest('[data-zona]');
      if (g) activar(g.getAttribute('data-zona'));
    });
    document.querySelectorAll('.zonas-lista li[data-zona]').forEach(function (li) {
      li.tabIndex = 0;
      li.addEventListener('click', function () { activar(li.getAttribute('data-zona')); });
      li.addEventListener('keydown', function (ev) {
        if (ev.key === 'Enter' || ev.key === ' ') { ev.preventDefault(); activar(li.getAttribute('data-zona')); }
      });
    });
  }

  function linterna() {
    var cards = document.querySelectorAll('.beam-edge');
    if (!cards.length) return;
    var luz = function (n) {
      var d = parseInt(n.getAttribute('data-beam-delay'), 10);
      if (isNaN(d)) d = 1200;
      setTimeout(function () { n.classList.add('beam-on'); }, d);
    };
    if (!('IntersectionObserver' in window)) { cards.forEach(luz); return; }
    var obs = new IntersectionObserver(function (es) {
      es.forEach(function (e) { if (e.isIntersecting) { obs.unobserve(e.target); luz(e.target); } });
    }, { threshold: 0.35 });
    cards.forEach(function (n) { obs.observe(n); });
  }

  pintarMuro();
  bienvenida();
  pasaporte();
  linterna();
})();
