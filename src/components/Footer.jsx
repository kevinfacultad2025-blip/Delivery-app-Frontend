import Contact from "./Contact";

function Footer() {
    return (
        /* ==================================================
         *                 FOOTER
         * ================================================== */
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
                                    href="#inicio"
                                    className="brand-footer-link"
                                >
                                    Inicio
                                </a>
                            </li>

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
                                    href="#pedido"
                                    className="brand-footer-link"
                                >
                                    Mi pedido
                                </a>
                            </li>

                            <li>
                                <a
                                    href="#sobre-nosotros"
                                    className="brand-footer-link"
                                >
                                    Sobre Nosotros
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

                    <Contact />

                </section>

                <hr className="mt-4" />

                <p className="text-center small mb-0">
                    &copy; 2026 Delivery-app. Todos los
                    derechos reservados.
                </p>
            </section>
        </footer>
    );
}

export default Footer;