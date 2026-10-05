
function Menu({
    categoriaSeleccionada,
    mostrarSubmenu,
    volverAlMenu,
    agregarAlCarrito,
    abrirInformacionProducto,
    formatearPrecio,
    productosPorCategoria,
    nombresCategorias,
    categorias
}) {
    return (
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
                        Elegí una categoría para comenzar tu pedido
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
                                        mostrarSubmenu(categoria.id)
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
                            {
                                productosPorCategoria[
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
                                ))
                            }
                        </section>
                    </section>
                )}
            </section>
        </section>
    );
}

export default Menu;