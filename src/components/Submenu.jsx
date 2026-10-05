
function Submenu({
    categoriaSeleccionada,
    volverAlMenu,
    agregarAlCarrito,
    abrirInformacionProducto,
    formatearPrecio,
    productosPorCategoria,
    nombresCategorias
}) {
    if (!categoriaSeleccionada) {
        return null;
    }

    return (
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
                    {nombresCategorias[categoriaSeleccionada]}
                </h3>
            </header>

            <section className="row g-4 justify-content-center">
                {productosPorCategoria[categoriaSeleccionada].map(
                    (producto) => (
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
                    )
                )}
            </section>
        </section>
    );
}

export default Submenu;