
import { useEffect, useState } from "react";
import {
    productosPorCategoria,
    nombresCategorias,
    categorias
} from "./data/products";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Menu from "./components/Menu";
import Submenu from "./components/Submenu";
import Cart from "./components/Cart";
import OrderForm from "./components/OrderForm";

function App() {
    // ==========================================================
    // ESTADOS PRINCIPALES
    // ==========================================================

    const [carrito, setCarrito] = useState([]);
    const [categoriaSeleccionada, setCategoriaSeleccionada] = useState(null);
    const [productoInfo, setProductoInfo] = useState(null);

    const [tipoEntrega, setTipoEntrega] = useState("delivery");
    const [metodoPago, setMetodoPago] = useState("efectivo");

    const [porcentajeDescuento, setPorcentajeDescuento] = useState(0);
    const [codigoCupon, setCodigoCupon] = useState("");
    const [mensajeCupon, setMensajeCupon] = useState("");

    const [nombre, setNombre] = useState("");
    const [direccion, setDireccion] = useState("");
    const [telefono, setTelefono] = useState("");
    const [montoEfectivo, setMontoEfectivo] = useState("");

    const [telefonoValido, setTelefonoValido] = useState(false);
    const [formularioEnviado, setFormularioEnviado] = useState(false);

    const [introVisible, setIntroVisible] = useState(true);

    // ==========================================================
    // PRESENTACIÓN INICIAL
    // ==========================================================

    useEffect(() => {
        if ("scrollRestoration" in window.history) {
            window.history.scrollRestoration = "manual";
        }

        window.scrollTo(0, 0);

        const temporizador = setTimeout(() => {
            setIntroVisible(false);

            setTimeout(() => {
                const menu = document.getElementById("menu");

                if (menu) {
                    menu.scrollIntoView({
                        behavior: "smooth",
                        block: "start"
                    });
                }
            }, 100);
        }, 3000);

        return () => clearTimeout(temporizador);
    }, []);

    // ==========================================================
    // CARRITO
    // ==========================================================

    function agregarAlCarrito(id, nombreProducto, precio) {
        setCarrito((carritoActual) => {
            const productoExistente = carritoActual.find(
                (item) => item.id === id
            );

            if (productoExistente) {
                return carritoActual.map((item) =>
                    item.id === id
                        ? {
                              ...item,
                              cantidad: item.cantidad + 1
                          }
                        : item
                );
            }

            return [
                ...carritoActual,
                {
                    id,
                    nombre: nombreProducto,
                    precio: Number(precio),
                    cantidad: 1
                }
            ];
        });
    }

    function cambiarCantidad(id, cambio) {
        setCarrito((carritoActual) =>
            carritoActual
                .map((item) =>
                    item.id === id
                        ? {
                              ...item,
                              cantidad: item.cantidad + cambio
                          }
                        : item
                )
                .filter((item) => item.cantidad > 0)
        );
    }

    function eliminarDelCarrito(id) {
        setCarrito((carritoActual) =>
            carritoActual.filter((item) => item.id !== id)
        );
    }

    function calcularTotal() {
        return carrito.reduce(
            (acumulado, item) =>
                acumulado + item.precio * item.cantidad,
            0
        );
    }

    function calcularTotalConDescuento() {
        const totalOriginal = calcularTotal();

        if (porcentajeDescuento > 0) {
            return (
                totalOriginal -
                totalOriginal * (porcentajeDescuento / 100)
            );
        }

        return totalOriginal;
    }

    function formatearPrecio(numero) {
        return "$" + Number(numero).toLocaleString("es-AR");
    }

    // ==========================================================
    // SUBMENÚ
    // ==========================================================

    function mostrarSubmenu(categoria) {
        if (!productosPorCategoria[categoria]) {
            return;
        }

        setCategoriaSeleccionada(categoria);

        setTimeout(() => {
            const submenu = document.getElementById(
                "submenu-productos"
            );

            if (submenu) {
                submenu.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });
            }
        }, 100);
    }

    function volverAlMenu() {
        setCategoriaSeleccionada(null);

        setTimeout(() => {
            const menuCategorias =
                document.querySelector(".menu-categories");

            if (menuCategorias) {
                menuCategorias.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });
            }
        }, 100);
    }

    // ==========================================================
    // CUPONES
    // ==========================================================

    const CUPONES_VALIDOS = {
        PRIMERPEDIDO: 15,
        PROMO10: 10
    };

    function aplicarCupon() {
        const codigo = codigoCupon.trim().toUpperCase();

        if (CUPONES_VALIDOS[codigo]) {
            const descuento = CUPONES_VALIDOS[codigo];

            setPorcentajeDescuento(descuento);

            setMensajeCupon(
                `¡Cupón aplicado! Obtuviste un ${descuento}% de descuento.`
            );
        } else {
            setPorcentajeDescuento(0);

            setMensajeCupon(
                "El código ingresado no es válido o ya venció."
            );
        }
    }

    // ==========================================================
    // TELÉFONO
    // ==========================================================

    function manejarTelefono(evento) {
        const valor = evento.target.value.replace(/[^0-9]/g, "");

        setTelefono(valor);
        setTelefonoValido(valor.length >= 10);
    }

    // ==========================================================
    // CONFIRMAR PEDIDO
    // ==========================================================

    function manejarEnvioFormulario(evento) {
        evento.preventDefault();

        const totalFinal = calcularTotalConDescuento();

        if (totalFinal <= 0) {
            window.alert(
                "Tu carrito está vacío. Agregá productos antes de confirmar."
            );
            return;
        }

        if (telefono.length < 10) {
            setTelefonoValido(false);
            return;
        }

        if (
            metodoPago === "efectivo" &&
            montoEfectivo !== "" &&
            Number(montoEfectivo) < totalFinal
        ) {
            return;
        }

        if (!nombre.trim()) {
            return;
        }

        if (tipoEntrega === "delivery" && !direccion.trim()) {
            return;
        }

        setFormularioEnviado(true);

        setCarrito([]);
        setNombre("");
        setDireccion("");
        setTelefono("");
        setMontoEfectivo("");
        setCodigoCupon("");
        setPorcentajeDescuento(0);
        setMensajeCupon("");
        setTelefonoValido(false);

        setTimeout(() => {
            const confirmacion =
                document.getElementById("confirmacion");

            if (confirmacion) {
                confirmacion.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });
            }
        }, 100);
    }

    // ==========================================================
    // INFORMACIÓN DEL PRODUCTO
    // ==========================================================

    function abrirInformacionProducto(producto) {
        setProductoInfo(producto);
    }

    function cerrarInformacionProducto() {
        setProductoInfo(null);
    }

    // ==========================================================
    // RENDER
    // ==========================================================

    return (
        <>
            {/* ==================================================
                PRESENTACIÓN INICIAL
            ================================================== */}

            {introVisible && (
                <section
                    id="intro-screen"
                    className="intro-screen"
                >
                    <article className="intro-content text-center text-white">
                        <img
                            src="/media/logo_local.png"
                            alt="Logo de NombreDelLocal"
                            className="intro-logo"
                        />

                        <h1 className="fw-bold">
                            ¡Bienvenidos a NombreDelLocal!
                        </h1>
                    </article>
                </section>
            )}

            {/* ==================================================
                HEADER / HERO
            ================================================== */}

                <Hero />

                <Navbar />



            <main>
                {/* ==================================================
                    MENÚ
                ================================================== */}

                    <Menu
    categoriaSeleccionada={categoriaSeleccionada}
    mostrarSubmenu={mostrarSubmenu}
    volverAlMenu={volverAlMenu}
    agregarAlCarrito={agregarAlCarrito}
    abrirInformacionProducto={abrirInformacionProducto}
    formatearPrecio={formatearPrecio}
    productosPorCategoria={productosPorCategoria}
    nombresCategorias={nombresCategorias}
    categorias={categorias}
/>

                        {/* ==================================================
                            SUBMENÚ
                        ================================================== */}

                            <Submenu
    categoriaSeleccionada={categoriaSeleccionada}
    volverAlMenu={volverAlMenu}
    agregarAlCarrito={agregarAlCarrito}
    abrirInformacionProducto={abrirInformacionProducto}
    formatearPrecio={formatearPrecio}
    productosPorCategoria={productosPorCategoria}
    nombresCategorias={nombresCategorias}
/>

                {/* ==================================================
                    CARRITO
                ================================================== */}

                    <Cart
    carrito={carrito}
    cambiarCantidad={cambiarCantidad}
    eliminarDelCarrito={eliminarDelCarrito}
    formatearPrecio={formatearPrecio}
    calcularTotal={calcularTotal}
    porcentajeDescuento={porcentajeDescuento}
/>

                {/* ==================================================
                    FORMULARIO DE PEDIDO
                ================================================== */}

                    <OrderForm
    manejarEnvioFormulario={manejarEnvioFormulario}
    tipoEntrega={tipoEntrega}
    setTipoEntrega={setTipoEntrega}
    nombre={nombre}
    setNombre={setNombre}
    direccion={direccion}
    setDireccion={setDireccion}
    telefono={telefono}
    telefonoValido={telefonoValido}
    manejarTelefono={manejarTelefono}
    metodoPago={metodoPago}
    setMetodoPago={setMetodoPago}
    montoEfectivo={montoEfectivo}
    setMontoEfectivo={setMontoEfectivo}
    calcularTotalConDescuento={calcularTotalConDescuento}
    codigoCupon={codigoCupon}
    setCodigoCupon={setCodigoCupon}
    aplicarCupon={aplicarCupon}
    porcentajeDescuento={porcentajeDescuento}
    mensajeCupon={mensajeCupon}
/>

                {/* ==================================================
                    CONFIRMACIÓN
                ================================================== */}

                {formularioEnviado && (
                    <section
                        id="confirmacion"
                        className="py-5"
                    >
                        <section className="container">
                            <article
                                className="alert brand-alert-success text-center mx-auto p-4 shadow-sm"
                                style={{ maxWidth: "700px" }}
                            >
                                <h2 className="h4 fw-bold">
                                    ¡Pedido Confirmado!
                                </h2>

                                <p className="mb-1">
                                    Gracias por tu compra. Tu pedido
                                    está siendo preparado.
                                </p>

                                <p className="fw-bold mb-0">
                                    ¡Muchas gracias por elegirnos!
                                </p>
                            </article>
                        </section>
                    </section>
                )}

                {/* ==================================================
                    SOBRE NOSOTROS
                ================================================== */}

                <section
                    id="sobre-nosotros"
                    className="py-5"
                >
                    <section className="container">
                        <section className="row align-items-center g-5">
                            <article className="col-12 col-lg-6">
                                <img
                                    src="/media/carrusel-producto1.jpg"
                                    className="img-fluid rounded-4 shadow-sm w-100"
                                    alt="Comida preparada por NombreDelLocal"
                                />
                            </article>

                            <article className="col-12 col-lg-6">
                                <p className="fw-bold mb-2 brand-precio">
                                    SOBRE NOSOTROS
                                </p>

                                <h2 className="fw-bold mb-4 brand-title">
                                    Una historia que empezó con
                                    una idea sencilla
                                </h2>

                                <p className="text-muted">
                                    Todo comenzó con una idea simple:
                                    preparar comida rica, abundante y
                                    hecha con dedicación, para que
                                    cada persona pudiera disfrutarla
                                    desde la comodidad de su casa.
                                </p>

                                <p className="text-muted">
                                    Con el tiempo, ese pequeño sueño
                                    fue creciendo. Hoy seguimos
                                    manteniendo la misma esencia:
                                    elegir buenos ingredientes,
                                    preparar cada pedido con cuidado y
                                    ofrecer una experiencia agradable
                                    desde el primer clic hasta que la
                                    comida llega a la mesa.
                                </p>

                                <blockquote className="border-start border-4 ps-3 my-4">
                                    <p className="fst-italic mb-0">
                                        “Un buen pedido no es solamente
                                        una comida. Es un momento para
                                        compartir, darse un gusto y
                                        disfrutar.”
                                    </p>
                                </blockquote>

                                <p className="fw-bold mb-0">
                                    Gracias por elegirnos y ser parte
                                    de nuestra historia.
                                </p>
                            </article>
                        </section>
                    </section>
                </section>
            </main>

            {/* ==================================================
                FOOTER
            ================================================== */}

            <footer
                id="contacto"
                className="brand-footer pt-5 pb-3 mt-5"
            >
                <section className="container">
                    <section className="row g-4">
                        <article className="col-12 col-md-4">
                            <h3 className="h5 fw-bold">
                                NombreDelLocal
                            </h3>

                            <p>
                                Especialistas en{" "}
                                <strong>entregar pedidos</strong>,
                                para su comodidad.
                            </p>
                        </article>

                        <article className="col-12 col-md-4">
                            <h3 className="h5 fw-bold">
                                Enlaces
                            </h3>

                            <ul className="list-unstyled">
                                <li>
                                    <a
                                        href="#menu"
                                        className="brand-footer-link"
                                    >
                                        Menú
                                    </a>
                                </li>

                                <li>
                                    <a
                                        href="#carrito"
                                        className="brand-footer-link"
                                    >
                                        Carrito
                                    </a>
                                </li>

                                <li>
                                    <a
                                        href="#pedido"
                                        className="brand-footer-link"
                                    >
                                        Mi pedido
                                    </a>
                                </li>

                                <li>
                                    <a
                                        href="#contacto"
                                        className="brand-footer-link"
                                    >
                                        Contacto
                                    </a>
                                </li>
                            </ul>
                        </article>

                        <article className="col-12 col-md-4">
                            <h3 className="h5 fw-bold">
                                Contacto
                            </h3>

                            <p className="mb-1">
                                📧 delivery-app@gmail.com
                            </p>

                            <p className="mb-1">
                                📞 +54 9 381 xxx xxxx
                            </p>

                            <p className="mb-0">
                                📍 San Miguel de Tucumán, Argentina
                            </p>
                        </article>
                    </section>

                    <hr className="mt-4" />

                    <p className="text-center small mb-0">
                        &copy; 2026 Delivery-app. Todos los
                        derechos reservados.
                    </p>
                </section>
            </footer>

            {/* ==================================================
                MODAL DE INFORMACIÓN
            ================================================== */}

            {productoInfo && (
                <section
                    className="modal-info-overlay activo"
                    id="modal-info"
                    onClick={(evento) => {
                        if (evento.target === evento.currentTarget) {
                            cerrarInformacionProducto();
                        }
                    }}
                >
                    <article className="modal-info-content">
                        <button
                            type="button"
                            id="modal-info-cerrar"
                            className="modal-info-cerrar border-0 bg-transparent"
                            onClick={cerrarInformacionProducto}
                            aria-label="Cerrar información"
                        >
                            &times;
                        </button>

                        <img
                            id="modal-info-imagen"
                            src={productoInfo.imagen}
                            alt={productoInfo.nombre}
                        />

                        <section className="modal-info-body">
                            <h3 className="brand-title fw-bold">
                                {productoInfo.nombre}
                            </h3>

                            <h6 className="fw-bold mt-3 mb-2">
                                Ingredientes
                            </h6>

                            <ul className="mb-3">
                                {productoInfo.ingredientes.map(
                                    (ingrediente) => (
                                        <li key={ingrediente}>
                                            {ingrediente}
                                        </li>
                                    )
                                )}
                            </ul>

                            <h6 className="fw-bold mb-2">
                                Elaboración
                            </h6>

                            <p className="text-muted mb-0">
                                {productoInfo.elaboracion}
                            </p>
                        </section>
                    </article>
                </section>
            )}
        </>
    );
}

export default App;