function About() {
    return (
        <>
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
        </>
    );
}

export default About;
