
function Cart({
    carrito,
    cambiarCantidad,
    eliminarDelCarrito,
    formatearPrecio,
    calcularTotal,
    porcentajeDescuento
}) {
    return (
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
    );
}

export default Cart;