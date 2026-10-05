function ProductModal({ productoInfo, onClose }) {
    if (!productoInfo) {
        return null;
    }

    return (
        <>
{/* ==================================================
                MODAL DE INFORMACIÓN
            ================================================== */}

            {productoInfo && (
                <section
                    className="modal-info-overlay activo"
                    id="modal-info"
                    onClick={(evento) => {
                        if (evento.target === evento.currentTarget) {
                            onClose();
                        }
                    }}
                >
                    <article className="modal-info-content">
                        <button
                            type="button"
                            id="modal-info-cerrar"
                            className="modal-info-cerrar border-0 bg-transparent"
                            onClick={onClose}
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

export default ProductModal;
