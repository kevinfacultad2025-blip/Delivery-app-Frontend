
function Hero() {
    return (
        <>
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
        </>
    );
}

export default Hero;