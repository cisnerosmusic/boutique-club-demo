/* Boutique Club (demo): idiomas. El inglés es la primera lengua y vive en el HTML;
   el español se aplica encima desde este diccionario. La elección se recuerda en
   este navegador. Marcado:
     data-i18n="clave"          sustituye el texto
     data-i18n-html="clave"     sustituye el contenido con marcado (textos propios)
     data-i18n-attr="alt:clave;placeholder:clave"   sustituye atributos */
window.BC_I18N = {
  es: {
    'demo.aviso': 'Demo con datos ficticios',
    'demo.nombre': 'Boutique Club es un nombre provisional',
    'a11y.inicio': 'Boutique Club, inicio',
    'a11y.idioma': 'Idioma',
    'a11y.principal': 'Principal',
    'a11y.secciones': 'Secciones',
    'nav.club': 'El club',
    'nav.card': 'Tarjeta',
    'nav.passport': 'Mi pasaporte',
    'nav.members': 'Miembros',
    'tab.club': 'Club',
    'tab.card': 'Tarjeta',
    'tab.passport': 'Pasaporte',
    'tab.members': 'Miembros',
    'pie.legal': 'Tesla Boutique Miami es un taller independiente, no afiliado a Tesla, Inc. XPEL Exclusive Dealer. 1835 NW 79th Ave, Doral, FL. Un servicio de Unlimited Wraps.',
    'pie.demo': 'Demo con datos ficticios: los nombres de los miembros son inventados. Boutique Club es un nombre provisional.',

    't.card': 'La tarjeta | Boutique Club · Tesla Boutique Miami',
    't.welcome': 'Bienvenida | Boutique Club · Tesla Boutique Miami',
    't.passport': 'Mi pasaporte | Boutique Club · Tesla Boutique Miami',
    't.members': 'Miembros | Boutique Club · Tesla Boutique Miami',

    'home.ir': 'Ir a tu pasaporte',
    'home.h1': 'Cada Tesla que protegemos entra con <span class="azul">nombre propio</span>.',
    'home.lead': 'El club de los dueños que cuidan su Tesla de verdad. Tu carnet es el pasaporte de tu carro: qué tiene, dónde, desde cuándo y cómo cuidarlo.',
    'home.verTarjeta': 'Ver la tarjeta',
    'home.verPasaporte': 'Ver un pasaporte',
    'home.comoTag': 'Cómo se entra',
    'home.comoH2': 'Nadie llena nada. Tu servicio es la entrada.',
    'home.p1t': 'Hacemos el trabajo',
    'home.p1': 'PPF, tintado, cerámico o lo que tu Tesla necesite, como siempre.',
    'home.p2t': 'Tu factura crea el pasaporte',
    'home.p2': 'Con el servicio, tu carro queda registrado: qué le pusimos, dónde y cuándo.',
    'home.p3t': 'Recibes tu tarjeta',
    'home.p3': 'Al recoger el carro te damos tu tarjeta del club. La escaneas con el teléfono y ya eres miembro, con tu número.',
    'home.recTag': 'Qué recibe el miembro',
    'home.recH2': 'Pertenecer, y saber lo que lleva tu carro.',
    'home.b1t': 'Tu número de miembro',
    'home.b1': 'Los primeros son miembros fundadores, y su número no se reasigna nunca.',
    'home.b2t': 'El pasaporte de tu Tesla',
    'home.b2': 'Todo lo que lleva tu carro, en tu teléfono. Va con el carro: si algún día lo vendes, el historial viaja con él.',
    'home.b3t': 'Prioridad de reserva',
    'home.b3': 'Cuando la agenda del taller se llena, los miembros van primero.',
    'home.b4t': 'Recordatorios de cuidado',
    'home.b4': 'Pocos y útiles, según lo que lleva tu carro. Nunca ofertas.',
    'home.dentroTag': 'Dentro del club',
    'home.dentroH2': 'Aquí nos conocemos por el nombre.',
    'home.dentroLead': 'Los miembros se ven entre ellos: quién es, qué Tesla tiene y cómo lo cuida. Cada uno decide cómo aparecer.',
    'home.fuera': '<strong>Fuera del club, nada.</strong> Nunca mostramos tu teléfono, tu correo, tu matrícula ni tu VIN.',
    'home.verMiembros': 'Ver todos los miembros',
    'home.vivelo': 'Vívelo como un cliente',
    'home.viveloH2': 'Empieza por la tarjeta que recibe al recoger su carro.',
    'home.irBienvenida': 'Ir a la bienvenida',

    'card.tag': 'La tarjeta de bienvenida',
    'card.h1': 'Esto es lo que el cliente recibe al recoger su carro.',
    'card.lead': 'Una tarjeta impresa con su número. Por detrás, un código que abre el pasaporte de su Tesla.',
    'card.fundador': 'Miembro fundador',
    'card.hola': 'Bienvenido al club, Carlos.',
    'card.escanea': 'Escanea para ver el pasaporte de tu Tesla.',
    'card.anverso': 'Anverso',
    'card.reverso': 'Reverso',
    'card.medida': 'Medida estándar de tarjeta bancaria: 85,60 × 53,98 mm (ISO/IEC 7810 ID-1).',
    'card.prueba': 'Pruébalo',
    'card.pruebaTxt': 'Escanea el código con otro teléfono. Si ya lo estás viendo en el tuyo, simula el escaneo.',
    'card.simular': 'Simular escaneo',
    'card.nota': 'En el club real, cada tarjeta lleva su propio enlace, único e imposible de adivinar.',
    'card.altMono': 'Monograma TB de Tesla Boutique Miami',
    'card.altQr': 'Código QR que abre la bienvenida al club',

    'wel.tag': 'Bienvenida',
    'wel.h1': 'Hola, Carlos. Tu Model Y ya tiene pasaporte.',
    'wel.lead': 'Antes de entrar, elige cómo quieres aparecer ante los demás miembros.',
    'wel.nombre': 'Entrar al club como Carlos M.',
    'wel.alias': 'Prefiero un alias',
    'wel.aliasLabel': 'Tu alias en el club',
    'wel.aliasPh': 'Por ejemplo: Y Blanco',
    'wel.aliasBtn': 'Entrar con este alias',
    'wel.privado': 'Solo quiero mi pasaporte',
    'wel.priv': 'Dentro del club, los miembros ven tu nombre (o tu alias) y tu carro. Nunca tu teléfono, tu correo, tu matrícula ni tu VIN. Puedes cambiarlo o salir cuando quieras, y tu pasaporte sigue siendo tuyo.',
    'wel.demo': 'En la demo, tu elección se guarda solo en este navegador.',
    'wel.previa': 'Así te verán los demás miembros',
    'wel.previaAria': 'Vista previa',

    'pas.ahora': 'ahora',
    'pas.notif': '<strong>Temporada de love bugs.</strong> Límpialos pronto del frontal: son ácidos y el calor de la Florida acelera el daño.',
    'pas.sinEleccion': 'Aún no has elegido cómo aparecer en el club.',
    'pas.elegir': 'Elegir ahora',
    'pas.alt': 'El Model Y blanco de este pasaporte, visto de lado',
    'pas.tag': 'Pasaporte de protección',
    'pas.color': 'Blanco',
    'pas.fundador': 'Miembro fundador #007',
    'pas.resumen': 'Resumen',
    'pas.resVidrio': 'Vidrios protegidos',
    'pas.resFrontal': 'Frontal sin PPF',
    'pas.resGarantia': 'Garantía XPEL',
    'pas.mapa': 'Mapa de protección',
    'pas.toca': 'Toca una zona',
    'pas.mapaTit': 'Model Y visto desde arriba, con el frontal hacia arriba',
    'pas.mapaDesc': 'Vidrios protegidos; frontal sin protección; el resto sin evaluar. La lista dice lo mismo en texto.',
    'e.prot': 'Protegido',
    'e.sin': 'Sin protección',
    'e.eval': 'Sin evaluar',
    'z.parabrisas': 'Parabrisas',
    'z.ventanasDel': 'Ventanas delanteras',
    'z.ventanasTras': 'Ventanas traseras',
    'z.luneta': 'Luneta',
    'z.parachoquesDel': 'Parachoques delantero',
    'z.capo': 'Capó',
    'z.faros': 'Faros',
    'z.guardabarrosDel': 'Guardabarros delanteros',
    'z.retrovisores': 'Retrovisores',
    'z.techo': 'Techo de cristal',
    'z.puertas': 'Puertas',
    'z.estribos': 'Estribos',
    'z.guardabarrosTras': 'Guardabarros traseros',
    'z.porton': 'Portón trasero',
    'z.parachoquesTras': 'Parachoques trasero',
    'o.film': 'Película XPEL · verificado en taller',
    'o.xr': 'XPEL Prime XR Plus · verificado en taller',
    'o.revisado': 'Revisado en taller',
    'pas.origen': '<strong>Verificado en taller:</strong> lo comprobamos con el carro delante. <strong>Derivado de factura:</strong> en carros atendidos antes del club, lo deducimos de la factura y se confirma en la próxima visita.',
    'pas.servicios': 'Servicios',
    'pas.tint': 'Tintado de ventanas',
    'pas.tintProd': 'Prime XR Plus · ventanas y luneta',
    'pas.fecha': '14 ago 2026',
    'pas.parabrisas': 'Protección de parabrisas',
    'pas.parabrisasProd': 'Película para parabrisas',
    'pas.garantia': 'Garantía',
    'pas.garantiaTxt': 'Emitida por XPEL y registrada al VIN terminado en 4F2K. La cobertura y sus condiciones son las del fabricante: este pasaporte las refleja, no las cambia.',
    'pas.xpel': 'Ver las condiciones en xpel.com',
    'pas.cuidar': 'Cómo cuidarlo',
    'pas.c1': '<strong>Los primeros días,</strong> no bajes las ventanas. Al recoger el carro te decimos cuántos.',
    'pas.c2': '<strong>Los vidrios,</strong> con microfibra y un limpiador sin amoníaco.',
    'pas.c3': '<strong>El lavado,</strong> a mano, con champú de pH neutro y dos cubos. Antes, activa el Car Wash Mode desde la pantalla.',
    'pas.c4': '<strong>Nunca dejes que el agua se seque al sol.</strong> Las manchas de agua no las cubre ninguna garantía.',
    'pas.sugTag': 'Para cuando quieras',
    'pas.sug': 'La pintura del frontal todavía no tiene PPF. Es donde pegan las piedras de la carretera. Si algún día quieres protegerla, te explicamos las opciones.',
    'pas.preguntar': 'Preguntar al taller',
    'pas.ocultar': 'No mostrar sugerencias',
    'pas.lugar': 'Tu lugar en el club',
    'pas.numero': 'Número',
    'pas.numeroVal': '#007 · fundador',
    'pas.desde': 'Miembro desde',
    'pas.desdeVal': 'septiembre de 2026',
    'pas.apareces': 'Apareces como',
    'pas.invit': 'Invitaciones',
    'pas.invitVal': '3 disponibles',
    'pas.cambiar': 'Cambiar cómo aparezco',

    'mem.tag': 'Miembros',
    'mem.h1': 'Los que cuidan su Tesla.',
    'mem.solo': 'Solo visible para miembros del club.'
  },

  /* Textos que pinta club.js, en las dos lenguas */
  dyn: {
    en: {
      'saludo.m': 'Good morning, {n}.',
      'saludo.t': 'Good afternoon, {n}.',
      'saludo.n': 'Good evening, {n}.',
      'devuelta': 'Welcome back, {n}.',
      'apareces.sin': 'Not chosen yet',
      'apareces.priv': 'Passport only, not on the wall',
      'ficha.fundador': 'Founding member',
      'ficha.tu': 'You',
      'ficha.miembro': 'Member #{n}',
      'ficha.alt': '{nombre}: {carro}, {color}',
      'color.white': 'white',
      'color.grey': 'grey',
      'color.lightblue': 'light blue',
      'color.black': 'black',
      'color.red': 'red',
      'color.blue': 'blue',
      'prot.ppfFront': 'Front PPF',
      'prot.ppfFull': 'Full PPF',
      'prot.tint': 'Tint',
      'prot.windshield': 'Windshield',
      'prot.ceramic': 'Ceramic',
      'prot.correction': 'Paint correction'
    },
    es: {
      'saludo.m': 'Buenos días, {n}.',
      'saludo.t': 'Buenas tardes, {n}.',
      'saludo.n': 'Buenas noches, {n}.',
      'devuelta': 'Qué bueno verte, {n}.',
      'apareces.sin': 'Sin elegir',
      'apareces.priv': 'Solo pasaporte, no apareces en el muro',
      'ficha.fundador': 'Miembro fundador',
      'ficha.tu': 'Tú',
      'ficha.miembro': 'Miembro #{n}',
      'ficha.alt': '{nombre}: {carro}, {color}',
      'color.white': 'blanco',
      'color.grey': 'gris',
      'color.lightblue': 'azul claro',
      'color.black': 'negro',
      'color.red': 'rojo',
      'color.blue': 'azul',
      'prot.ppfFront': 'PPF frontal',
      'prot.ppfFull': 'PPF completo',
      'prot.tint': 'Tintado',
      'prot.windshield': 'Parabrisas',
      'prot.ceramic': 'Cerámico',
      'prot.correction': 'Corrección de pintura'
    }
  }
};

(function () {
  'use strict';
  var CLAVE = 'bc-lang';
  var D = window.BC_I18N;
  function leer() { try { return localStorage.getItem(CLAVE); } catch (e) { return null; } }
  function guardar(v) { try { localStorage.setItem(CLAVE, v); } catch (e) { /* sin almacenamiento */ } }
  var lang = leer() === 'es' ? 'es' : 'en';

  function aplicar(l) {
    document.documentElement.lang = l;
    document.querySelectorAll('[data-i18n]').forEach(function (n) {
      if (n.__en == null) n.__en = n.textContent;
      var k = n.getAttribute('data-i18n');
      n.textContent = l === 'es' && D.es[k] != null ? D.es[k] : n.__en;
    });
    document.querySelectorAll('[data-i18n-html]').forEach(function (n) {
      if (n.__en == null) n.__en = n.innerHTML;
      var k = n.getAttribute('data-i18n-html');
      n.innerHTML = l === 'es' && D.es[k] != null ? D.es[k] : n.__en;
    });
    document.querySelectorAll('[data-i18n-attr]').forEach(function (n) {
      if (!n.__enAttr) n.__enAttr = {};
      n.getAttribute('data-i18n-attr').split(';').forEach(function (par) {
        var p = par.split(':');
        var attr = p[0].trim(), k = (p[1] || '').trim();
        if (!attr || !k) return;
        if (n.__enAttr[attr] == null) n.__enAttr[attr] = n.getAttribute(attr) || '';
        n.setAttribute(attr, l === 'es' && D.es[k] != null ? D.es[k] : n.__enAttr[attr]);
      });
    });
    document.querySelectorAll('[data-lang]').forEach(function (b) {
      b.setAttribute('aria-pressed', String(b.getAttribute('data-lang') === l));
    });
    document.dispatchEvent(new CustomEvent('bc:idioma', { detail: l }));
  }

  window.BC_LANG = {
    actual: function () { return lang; },
    t: function (k, vars) {
      var s = (D.dyn[lang] && D.dyn[lang][k]) || D.dyn.en[k] || k;
      if (vars) Object.keys(vars).forEach(function (v) { s = s.split('{' + v + '}').join(vars[v]); });
      return s;
    },
    poner: function (l) { lang = l === 'es' ? 'es' : 'en'; guardar(lang); aplicar(lang); }
  };

  document.querySelectorAll('[data-lang]').forEach(function (b) {
    b.addEventListener('click', function () { window.BC_LANG.poner(b.getAttribute('data-lang')); });
  });
  if (lang === 'es') aplicar('es');
})();
