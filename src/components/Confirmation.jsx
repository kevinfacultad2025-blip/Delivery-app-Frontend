function Confirmation({ formularioEnviado }) {
    return (
        <>
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
        </>
    );
}

export default Confirmation;
