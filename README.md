# delivery-app

Aplicación web estilo delivery desarrollada como proyecto de la Tecnicatura Universitaria en Programación.

## Descripción

La idea principal del proyecto ‘Delivery App’ es una página web para pedir comidas, bebidas y postres de un restaurant en Tucumán, Argentina. La cual también incorpore un sistema de seguimiento de delivery’s.

El proyecto fue desarrollado inicialmente con HTML, CSS y JavaScript y posteriormente migrado a React + Vite, incorporando componentes reutilizables y una estructura más organizada.

## Funcionalidades

* Menú de comidas/postres/bebidas.
* Submenú de diferentes comidas/postres/bebidas.
* Agregar productos al pedido.
* Cambiar cantidades de productos.
* Consultar información de los productos.
* Calcular total del pedido.
* Eliminar productos del pedido.
* Formulario de pedido.
* Confirmación del pedido.
* Diseño responsive para distintos tamaños de pantalla.
* Navegación responsive mediante componentes de Bootstrap.
* Tarjetas de productos mediante componentes reutilizables de React.
* Uso de iconos mediante Bootstrap Icons.

## Integrantes del grupo

* [Pablo Cano](https://github.com/pablodev1337)
* [Alberto Roman](https://github.com/AlbertoRoman10)
* [Kevin Mendoza](https://github.com/kevinfacultad2025-blip)

## Contribuciones y Agradecimientos

Queremos agradecer especialmente a Matias Maza por contribuir en parte del código durante el desarrollo inicial del proyecto.

## Tecnologías utilizadas

* [Node.js](https://nodejs.org/es/docs)
* [NPM](https://www.npmjs.com/)
* [React](https://es.react.dev/learn)
* [Vite](https://vitejs.dev/guide/)
* [JavaScript ES6](https://developer.mozilla.org/es/docs/Web/JavaScript)
* [HTML5](https://developer.mozilla.org/es/docs/Web/HTML)
* [CSS3](https://developer.mozilla.org/es/docs/Web/CSS)
* [React-Bootstrap](https://react-bootstrap.github.io/)
* [Git y GitHub](https://docs.github.com/es)
* [Vercel](https://vercel.com/docs)

## React + Vite

El proyecto fue migrado a React + Vite para mejorar la organización y reutilización del código.

La interfaz se encuentra dividida en componentes reutilizables, permitiendo separar diferentes partes de la aplicación y facilitar su mantenimiento.

Entre los componentes utilizados se encuentran:

* Acerca de nosotros.
* Contacto.
* Navbar.
* Hero.
* Categorías del menú.
* Categorías del submenú.
* Tarjetas de productos.
* Carrito.
* Formulario de pedido.
* Confirmación del pedido.
* Modal de información de productos.
* Footer.

También se utilizan `props` para enviar información entre componentes y `useState` para manejar información dinámica de la aplicación, como los productos seleccionados en el carrito.

## Bootstrap

Se utiliza Bootstrap 5.3.3 junto con React-Bootstrap para facilitar el desarrollo de la interfaz, mejorar la adaptación responsive y utilizar componentes y clases de utilidad.

Se utiliza principalmente en:

* Navbar: navegación responsive.
* Sistema de grillas: utilización de `container`, `row` y `col-*`.
* Tarjetas: presentación de productos y diferentes secciones.
* Botones: acciones de la aplicación.
* Formularios: estilos y distribución de los campos.
* Utilidades: clases de Flexbox, espaciado, alineación y tipografía.
* Responsive Design: adaptación de los elementos a diferentes tamaños de pantalla.

También se utiliza CSS propio para mantener la identidad visual del proyecto y personalizar los componentes.

## Flexbox

Se utiliza Flexbox para organizar diferentes elementos de la interfaz, entre ellos:

* Componentes de navegación.
* Elementos del carrito.
* Contenido del footer.
* Campos y elementos del formulario.

También se utilizan clases de utilidad de Bootstrap relacionadas con Flexbox como `d-flex`, `align-items-center`, `justify-content-between` y `flex-column`.

## Grid

Se utiliza principalmente el sistema de grillas responsive de Bootstrap mediante las clases `container`, `row` y `col-*`.

Esto permite distribuir los productos y diferentes secciones de la aplicación de acuerdo con el tamaño de pantalla.

## Variables CSS

Definidas en `:root`:

* `--primary` y `--primary-dark`: color naranja principal, usado en botones y elementos de acción.
* `--secondary`: azul oscuro, usado en textos fuertes y títulos.
* `--success`: verde, para estados positivos (confirmación de pedido).
* `--danger`: rojo, para el botón de eliminar producto.
* `--background`: color de fondo general de la página.
* `--surface`: blanco, usado en tarjetas y el header.
* `--border`: color de bordes en tarjetas, inputs y separadores.

## Responsive Design

Se utilizaron dos estrategias principales para lograr un diseño adaptable:

### Bootstrap

Bootstrap proporciona un sistema responsive mediante sus clases de grilla y breakpoints.

Se utilizan clases como:

* `col-12`
* `col-sm-6`
* `col-md-4`
* `col-lg-4`
* `col-xl-3`
* `col-md-6`

Esto permite que los elementos cambien su distribución dependiendo del ancho de pantalla.

Por ejemplo, las tarjetas de productos pueden mostrarse en una sola columna en pantallas pequeñas y aumentar progresivamente la cantidad de columnas en pantallas más grandes.

También se utiliza una Navbar responsive que se transforma en un menú desplegable en dispositivos pequeños.

### Media Queries propias

Además de Bootstrap, se mantienen media queries personalizadas para controlar aspectos específicos del diseño:

* **Tablet (hasta 900px):** la grilla de productos reduce el tamaño mínimo de columna, el footer centra su contenido y el espaciado del nav se ajusta.
* **Mobile (hasta 600px):** el header pasa de fila a columna, la grilla de productos se convierte en una sola columna, el formulario y la confirmación reducen sus márgenes laterales y las columnas del footer se apilan una debajo de la otra ocupando el 100% del ancho.

De esta manera, Bootstrap y el CSS propio trabajan en conjunto para conseguir una interfaz adaptable.

## ¿Qué estrategias de SEO implementamos?

* **Meta description específica:** la etiqueta `<meta name="description">` describe puntualmente de qué trata la app ("Aplicación web de pedidos de comida estilo delivery"), en vez de un texto genérico.

* **Viewport para mobile-friendly:** `<meta name="viewport" content="width=device-width, initial-scale=1.0">` asegura que el sitio se vea correctamente en celulares y otros dispositivos.

* **HTML semántico:** usamos `header`, `nav`, `main`, `section`, `aside`, `article` y `footer` en vez de utilizar únicamente `div` genéricos, lo que ayuda a los buscadores a comprender la estructura del contenido.

* **Jerarquía de encabezados ordenada:** un solo `h1` (el nombre del local), `h2` por cada sección principal (Menú, Carrito, Confirmar Pedido) y `h3` por cada producto individual, sin saltos de nivel.

* **Atributos `alt` descriptivos en las imágenes:** cada imagen de producto tiene un `alt` que describe el plato real, por ejemplo, `"Hamburguesa con lechuga, tomate, queso y papas fritas"`, en vez de utilizar un texto genérico como `"imagen de producto"`. Esto también mejora la accesibilidad para lectores de pantalla.

* **Etiquetas Open Graph:** agregamos `og:title`, `og:description` y `og:image` para que, al compartir el link en redes sociales o WhatsApp, se pueda mostrar una vista previa con título, descripción e imagen.

* **Favicon configurado:** mejora el reconocimiento de la marca en la pestaña del navegador.

## Cómo instalar y ejecutar el proyecto

1. Cloná el repositorio:
```bash
git clone <url-del-repositorio>
```

2. Ingresar a la carpeta:
```bash
cd Delivery-app-Frontend
```

3. Instalar las dependencias:
```bash
npm.cmd install
```

4. Ejecutar el proyecto:
```bash
npm.cmd run dev
```

Vite iniciará un servidor de desarrollo local y mostrará una dirección similar a:

http://localhost:5173/

La aplicación puede visualizarse ingresando a esa dirección desde el navegador.

## Organización del proyecto

La aplicación se organiza mediante una estructura basada en componentes y páginas:

```bash
src/
├── assets/
├── components/
├── data/
├── pages/
├── routes/
├── App.css
├── App.jsx
├── main.jsx
└── index.css
```

## Organización de ramas

* `main`: rama estable, versión de entrega.
* `dev`: rama principal de desarrollo.
* `feature/nombre-de-la-tarea`: ramas de trabajo individuales, que se integran a `dev` mediante Pull Requests.
* `refactor/nombre-de-la-tarea`: ramas de refactorización.

## Despliegue

El proyecto se encuentra desplegado mediante Vercel.

[URL]: (https://delivery-app-frontend-xi.vercel.app/)

## Estado del proyecto

En desarrollo — TP nro. 7: Uso de hooks, efectos como useState y useEffect.