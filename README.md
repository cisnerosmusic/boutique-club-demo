# Boutique Club (demo)

Demostración del club de dueños de Tesla Boutique Miami: la tarjeta de bienvenida, la entrada al club, el pasaporte de protección del carro y el muro de miembros. Sirve para ver y tocar la idea en el teléfono antes de construir nada.

- **Datos ficticios.** Ningún nombre corresponde a un cliente real. Las fotos son de trabajos publicados en el sitio de Tesla Boutique Miami.
- **Nombre provisional.** "Boutique Club" es un nombre de trabajo.
- **Sin afiliación.** Tesla Boutique Miami es un taller independiente, no afiliado a Tesla, Inc.
- **Sin rastreo ni envío de datos.** La única elección que guarda la demo (cómo apareces en el club) se queda en tu navegador.

## Estructura

Sitio estático, sin dependencias: cinco páginas (`/`, `/card/`, `/welcome/`, `/passport/`, `/members/`), una hoja de estilo, los datos ficticios en `assets/js/datos.js`, los idiomas en `assets/js/i18n.js` (inglés primero, español segundo; el inglés vive en el HTML) y un script pequeño en `assets/js/club.js`. Las direcciones viejas en español (`/tarjeta/`, `/bienvenida/`, `/pasaporte/`, `/miembros/`) redirigen a las nuevas.

## Comprobar

```
python pruebas/revisar.py
```

Revisa que estén las cinco páginas, los avisos, el `noindex`, los enlaces internos, las imágenes y las reglas de estilo del dueño (sin precios, sin promesas de por vida).

## Regenerar el QR de la tarjeta

```
pip install segno
python herramientas/generar_qr.py
```

Diseño y desarrollo: Index01 para Tesla Boutique Miami (Unlimited Wraps).
