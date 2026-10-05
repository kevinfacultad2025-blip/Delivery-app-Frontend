import { useEffect, useState } from "react";

import {
    productosPorCategoria,
    nombresCategorias,
    categorias
} from "./data/products";

import Navbar from "./components/Navbar";
import Confirmation from "./components/Confirmation";
import About from "./components/About";
import Footer from "./components/Footer";
import ProductModal from "./components/ProductModal";

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
            const submenu = document.getElementById("submenu-productos");

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

            <header
                id="inicio"
                className="hero position-relative"
            >
                <section
                    id="heroCarousel"
                    className="carousel slide hero-carousel"
                    data-bs-ride="carousel"
                    data-bs-interval="4000"
                >
                    <section className="carousel-inner h-100">
                        <article className="carousel-item active h-100">
                            <img
                                src="/media/carrusel-producto1.jpg"
                                className="d-block w-100 h-100 object-fit-cover"
                                alt="Hamburguesa de NombreDelLocal"
                            />
                        </article>

                        <article className="carousel-item h-100">
                            <img
                                src="/media/carrusel-producto2.avif"
                                className="d-block w-100 h-100 object-fit-cover"
                                alt="Pizza de NombreDelLocal"
                            />
                        </article>

                        <article className="carousel-item h-100">
                            <img
                                src="/media/carrusel-producto3.jpg"
                                className="d-block w-100 h-100 object-fit-cover"
                                alt="Sándwich de milanesa de NombreDelLocal"
                            />
                        </article>

                        <article className="carousel-item h-100">
                            <img
                                src="/media/carrusel-producto4.jpg"
                                className="d-block w-100 h-100 object-fit-cover"
                                alt="Empanadas de NombreDelLocal"
                            />
                        </article>

                        <article className="carousel-item h-100">
                            <img
                                src="/media/carrusel-producto5.avif"
                                className="d-block w-100 h-100 object-fit-cover"
                                alt="Postres de NombreDelLocal"
                            />
                        </article>
                    </section>
                </section>

                <section className="hero-overlay"></section>

                <Navbar />

                <section className="hero-content position-relative text-center text-white">
                    <img
                        src="/media/logo_local.png"
                        alt="Logo de NombreDelLocal"
                        className="hero-logo"
                    />

                    <h1 className="display-4 fw-bold">
                        ¡Bienvenidos a NombreDelLocal!
                    </h1>
                </section>
            </header>

            <main>
                {/* ==================================================
                    MENÚ
                ================================================== */}

                <section
                    id="menu"
                    className="menu-section"
                >
                    <section className="container">
                        <header className="menu-header text-center">
                            <span className="menu-kicker">
                                NUESTRO MENÚ
                            </span>

                            <h2>¿Qué deseas comer hoy?</h2>

                            <p>
                                Elegí una categoría para comenzar tu
                                pedido
                            </p>
                        </header>

                        <section className="menu-categories">
                            <section className="row g-4 justify-content-center">
                                {categorias.map((categoria) => (
                                    <article
                                        className="col-12 col-sm-6 col-lg-4"
                                        key={categoria.id}
                                    >
                                        <button
                                            type="button"
                                            className="category-card border-0 p-0 w-100"
                                            data-category={categoria.id}
                                            onClick={() =>
                                                mostrarSubmenu(
                                                    categoria.id
                                                )
                                            }
                                        >
                                            <img
                                                src={categoria.imagen}
                                                alt={categoria.nombre}
                                                className="category-image"
                                            />

                                            <section className="category-overlay">
                                                <section className="category-content">
                                                    <span className="category-number">
                                                        {categoria.numero}
                                                    </span>

                                                    <h3>
                                                        {categoria.nombre}
                                                    </h3>

                                                    <span className="category-action">
                                                        Ver opciones{" "}
                                                        <i className="bi bi-arrow-up-right"></i>
                                                    </span>
                                                </section>
                                            </section>
                                        </button>
                                    </article>
                                ))}
                            </section>
                        </section>

                        {/* ==================================================
                            SUBMENÚ
                        ================================================== */}

                        {categoriaSeleccionada && (
                            <section
                                id="submenu-productos"
                                className="mt-5"
                            >
                                <header className="submenu-header text-center mb-4">
                                    <button
                                        type="button"
                                        className="btn btn-outline-secondary mb-4"
                                        onClick={volverAlMenu}
                                    >
                                        <i className="bi bi-arrow-left"></i>{" "}
                                        Volver al menú
                                    </button>

                                    <h3 className="submenu-titulo">
                                        {
                                            nombresCategorias[
                                                categoriaSeleccionada
                                            ]
                                        }
                                    </h3>
                                </header>

                                <section className="row g-4 justify-content-center">
                                    {productosPorCategoria[
                                        categoriaSeleccionada
                                    ].map((producto) => (
                                        <article
                                            className="col-12 col-md-6 col-lg-4"
                                            key={producto.id}
                                        >
                                            <section className="submenu-producto-card h-100">
                                                <img
                                                    src={producto.imagen}
                                                    alt={producto.nombre}
                                                    className="submenu-producto-imagen"
                                                />

                                                <section className="submenu-producto-body">
                                                    <h4 className="submenu-producto-nombre">
                                                        {producto.nombre}
                                                    </h4>

                                                    <p className="submenu-producto-precio">
                                                        {formatearPrecio(
                                                            producto.precio
                                                        )}
                                                    </p>

                                                    <section className="submenu-producto-botones">
                                                        <button
                                                            type="button"
                                                            className="btn brand-btn-primary btn-agregar-submenu"
                                                            onClick={() =>
                                                                agregarAlCarrito(
                                                                    producto.id,
                                                                    producto.nombre,
                                                                    producto.precio
                                                                )
                                                            }
                                                        >
                                                            <i className="bi bi-cart-plus"></i>{" "}
                                                            Agregar al pedido
                                                        </button>

                                                        <button
                                                            type="button"
                                                            className="btn btn-mas-info-submenu btn-mas-info"
                                                            onClick={() =>
                                                                abrirInformacionProducto(
                                                                    producto
                                                                )
                                                            }
                                                        >
                                                            <i className="bi bi-info-circle"></i>{" "}
                                                            Más información
                                                        </button>
                                                    </section>
                                                </section>
                                            </section>
                                        </article>
                                    ))}
                                </section>
                            </section>
                        )}
                    </section>
                </section>

                {/* ==================================================
                    CARRITO
                ================================================== */}

                <aside
                    id="carrito"
                    className="py-5 bg-white"
                >
                    <section className="container">
                        <article
                            className="card shadow-sm brand-card mx-auto"
                            style={{ maxWidth: "900px" }}
                        >
                            <section className="card-body p-4">
                                <h2 className="h4 fw-bold mb-4 brand-title">
                                    Tu Carrito
                                </h2>

                                <ul className="list-group list-group-flush">
                                    {carrito.length === 0 ? (
                                        <li className="list-group-item text-center text-muted py-4">
                                            Todavía no agregaste
                                            productos al carrito.
                                        </li>
                                    ) : (
                                        carrito.map((item) => (
                                            <li
                                                className="list-group-item d-flex flex-column flex-md-row align-items-md-center justify-content-between gap-3 py-3"
                                                key={item.id}
                                            >
                                                <span className="fw-bold">
                                                    {item.nombre}
                                                </span>

                                                <section className="d-flex align-items-center gap-2">
                                                    <button
                                                        className="btn btn-sm brand-btn-primary"
                                                        type="button"
                                                        onClick={() =>
                                                            cambiarCantidad(
                                                                item.id,
                                                                -1
                                                            )
                                                        }
                                                    >
                                                        -
                                                    </button>

                                                    <span className="fw-bold px-2">
                                                        {item.cantidad}
                                                    </span>

                                                    <button
                                                        className="btn btn-sm brand-btn-primary"
                                                        type="button"
                                                        onClick={() =>
                                                            cambiarCantidad(
                                                                item.id,
                                                                1
                                                            )
                                                        }
                                                    >
                                                        +
                                                    </button>
                                                </section>

                                                <span className="fw-bold text-end">
                                                    {formatearPrecio(
                                                        item.precio *
                                                            item.cantidad
                                                    )}
                                                </span>

                                                <button
                                                    className="btn btn-sm btn-danger"
                                                    type="button"
                                                    onClick={() =>
                                                        eliminarDelCarrito(
                                                            item.id
                                                        )
                                                    }
                                                >
                                                    <i className="bi bi-trash"></i>{" "}
                                                    Eliminar
                                                </button>
                                            </li>
                                        ))
                                    )}
                                </ul>

                                <section className="d-flex justify-content-end mt-4">
                                    <p className="fs-5 fw-bold brand-title mb-0">
                                        Total:{" "}
                                        <span id="total-precio">
                                            {formatearPrecio(
                                                calcularTotal()
                                            )}
                                        </span>
                                    </p>
                                </section>

                                {porcentajeDescuento > 0 && (
                                    <p className="text-success fw-bold text-end mt-2 mb-0">
                                        Descuento aplicado:{" "}
                                        {porcentajeDescuento}%
                                    </p>
                                )}
                            </section>
                        </article>
                    </section>
                </aside>

                {/* ==================================================
                    FORMULARIO DE PEDIDO
                ================================================== */}

                <section
                    id="pedido"
                    className="py-5"
                >
                    <section className="container">
                        <article
                            className="card shadow-sm brand-card mx-auto"
                            style={{ maxWidth: "700px" }}
                        >
                            <section className="card-body p-4 p-md-5">
                                <h2 className="text-center fw-bold mb-4 brand-title">
                                    Confirmar Pedido
                                </h2>

                                <form
                                    className="row g-3"
                                    onSubmit={manejarEnvioFormulario}
                                >
                                    <section className="col-12 mb-2">
                                        <label className="form-label fw-semibold d-block">
                                            Modo de entrega
                                        </label>

                                        <section
                                            className="btn-group w-100"
                                            role="group"
                                            aria-label="Modo de entrega"
                                        >
                                            <input
                                                type="radio"
                                                className="btn-check"
                                                name="tipo-entrega"
                                                id="entrega-delivery"
                                                value="delivery"
                                                checked={
                                                    tipoEntrega ===
                                                    "delivery"
                                                }
                                                onChange={(evento) =>
                                                    setTipoEntrega(
                                                        evento.target.value
                                                    )
                                                }
                                            />

                                            <label
                                                className="btn btn-outline-primary fw-bold"
                                                htmlFor="entrega-delivery"
                                            >
                                                <i className="bi bi-truck me-1"></i>{" "}
                                                Delivery
                                            </label>

                                            <input
                                                type="radio"
                                                className="btn-check"
                                                name="tipo-entrega"
                                                id="entrega-retiro"
                                                value="retiro"
                                                checked={
                                                    tipoEntrega ===
                                                    "retiro"
                                                }
                                                onChange={(evento) =>
                                                    setTipoEntrega(
                                                        evento.target.value
                                                    )
                                                }
                                            />

                                            <label
                                                className="btn btn-outline-primary fw-bold"
                                                htmlFor="entrega-retiro"
                                            >
                                                <i className="bi bi-shop me-1"></i>{" "}
                                                Retirar en local
                                            </label>
                                        </section>
                                    </section>

                                    <section className="col-12">
                                        <label
                                            htmlFor="nombre"
                                            className="form-label fw-semibold"
                                        >
                                            Nombre completo
                                        </label>

                                        <input
                                            type="text"
                                            className="form-control"
                                            id="nombre"
                                            value={nombre}
                                            onChange={(evento) =>
                                                setNombre(
                                                    evento.target.value
                                                )
                                            }
                                            required
                                            placeholder="Ej: Juan Pérez"
                                        />
                                    </section>

                                    {tipoEntrega === "delivery" && (
                                        <section className="col-12">
                                            <label
                                                htmlFor="direccion"
                                                className="form-label fw-semibold"
                                            >
                                                Dirección de entrega
                                            </label>

                                            <input
                                                type="text"
                                                className="form-control"
                                                id="direccion"
                                                value={direccion}
                                                onChange={(evento) =>
                                                    setDireccion(
                                                        evento.target.value
                                                    )
                                                }
                                                required
                                                placeholder="Ej: Av. Alem 123"
                                            />
                                        </section>
                                    )}

                                    <section className="col-12 col-md-6">
                                        <label
                                            htmlFor="telefono"
                                            className="form-label fw-semibold"
                                        >
                                            Teléfono / WhatsApp
                                        </label>

                                        <input
                                            type="tel"
                                            className={`form-control ${
                                                telefono.length > 0
                                                    ? telefonoValido
                                                        ? "is-valid"
                                                        : "is-invalid"
                                                    : ""
                                            }`}
                                            id="telefono"
                                            value={telefono}
                                            onChange={manejarTelefono}
                                            required
                                            placeholder="Ej: 3811234567"
                                        />

                                        <section className="invalid-feedback">
                                            Ingresá un número válido
                                            de mínimo 10 dígitos.
                                        </section>
                                    </section>

                                    <section className="col-12 col-md-6">
                                        <label
                                            htmlFor="metodo-pago"
                                            className="form-label fw-semibold"
                                        >
                                            Método de pago
                                        </label>

                                        <select
                                            className="form-select"
                                            id="metodo-pago"
                                            value={metodoPago}
                                            onChange={(evento) =>
                                                setMetodoPago(
                                                    evento.target.value
                                                )
                                            }
                                        >
                                            <option value="efectivo">
                                                Efectivo
                                            </option>

                                            <option value="transferencia">
                                                Transferencia
                                            </option>

                                            <option value="tarjeta">
                                                Tarjeta (POSNET al
                                                entregar)
                                            </option>
                                        </select>
                                    </section>

                                    {metodoPago === "efectivo" && (
                                        <section className="col-12">
                                            <label
                                                htmlFor="monto-efectivo"
                                                className="form-label fw-semibold"
                                            >
                                                ¿Con cuánto vas a
                                                pagar?{" "}
                                                <small className="text-muted">
                                                    (para llevar
                                                    cambio)
                                                </small>
                                            </label>

                                            <input
                                                type="number"
                                                className={`form-control ${
                                                    montoEfectivo !== "" &&
                                                    Number(
                                                        montoEfectivo
                                                    ) <
                                                        calcularTotalConDescuento()
                                                        ? "is-invalid"
                                                        : ""
                                                }`}
                                                id="monto-efectivo"
                                                value={montoEfectivo}
                                                onChange={(evento) =>
                                                    setMontoEfectivo(
                                                        evento.target.value
                                                    )
                                                }
                                                min="0"
                                                placeholder="Ej: 10000"
                                            />

                                            <section className="invalid-feedback">
                                                El monto ingresado
                                                debe ser mayor o igual
                                                al total a pagar.
                                            </section>
                                        </section>
                                    )}

                                    {metodoPago === "transferencia" && (
                                        <section className="col-12">
                                            <article className="alert alert-info border-0 shadow-sm mb-0">
                                                <p className="fw-bold mb-1">
                                                    <i className="bi bi-bank me-1"></i>{" "}
                                                    Datos para
                                                    transferir:
                                                </p>

                                                <p className="small mb-1">
                                                    <strong>
                                                        Alias:
                                                    </strong>{" "}
                                                    nombredellocal.mp
                                                </p>

                                                <p className="small mb-0">
                                                    <strong>
                                                        CBU:
                                                    </strong>{" "}
                                                    0000003100012345678901
                                                </p>
                                            </article>
                                        </section>
                                    )}

                                    <section className="col-12 mt-3">
                                        <label
                                            htmlFor="codigo-descuento"
                                            className="form-label fw-semibold"
                                        >
                                            Código de descuento
                                        </label>

                                        <section className="input-group">
                                            <input
                                                type="text"
                                                className="form-control text-uppercase"
                                                id="codigo-descuento"
                                                value={codigoCupon}
                                                onChange={(evento) =>
                                                    setCodigoCupon(
                                                        evento.target.value
                                                    )
                                                }
                                                placeholder="Ej: PRIMERPEDIDO"
                                                disabled={
                                                    porcentajeDescuento > 0
                                                }
                                            />

                                            <button
                                                className="btn btn-outline-secondary fw-bold"
                                                type="button"
                                                onClick={aplicarCupon}
                                                disabled={
                                                    porcentajeDescuento > 0
                                                }
                                            >
                                                Aplicar
                                            </button>
                                        </section>

                                        {mensajeCupon && (
                                            <p
                                                className={`form-text mt-1 fw-bold ${
                                                    porcentajeDescuento > 0
                                                        ? "text-success"
                                                        : "text-danger"
                                                }`}
                                            >
                                                {mensajeCupon}
                                            </p>
                                        )}
                                    </section>

                                    <section className="col-12 mt-4">
                                        <button
                                            type="submit"
                                            className="btn brand-btn-primary w-100 py-2 fw-bold"
                                        >
                                            <i className="bi bi-check-circle me-1"></i>{" "}
                                            Confirmar Pedido
                                        </button>
                                    </section>
                                </form>
                            </section>
                        </article>
                    </section>
                </section>

                {/* ==================================================
                    CONFIRMACIÓN
                ================================================== */}

                <Confirmation
                    formularioEnviado={formularioEnviado}
                />

                {/* ==================================================
                    SOBRE NOSOTROS
                ================================================== */}

                <About />
            </main>

            {/* ==================================================
                FOOTER
            ================================================== */}

            <Footer />

            {/* ==================================================
                MODAL DE INFORMACIÓN
            ================================================== */}

            <ProductModal
                productoInfo={productoInfo}
                onClose={cerrarInformacionProducto}
            />
        </>
    );
}

export default App;