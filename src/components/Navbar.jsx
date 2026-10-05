
function Navbar() {
    return (
        <nav className="navbar navbar-expand-lg brand-navbar">
            <section className="container-fluid">
                <a
                    className="navbar-brand d-lg-none"
                    href="#inicio"
                    aria-label="Ir al inicio"
                >
                    <i className="bi bi-shop"></i>
                </a>

                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNav"
                    aria-controls="navbarNav"
                    aria-expanded="false"
                    aria-label="Abrir menú"
                >
                    <i className="bi bi-list"></i>
                </button>

                <section
                    className="collapse navbar-collapse"
                    id="navbarNav"
                >
                    <ul className="navbar-nav w-100 justify-content-around align-items-center">
                        <li className="nav-item">
                            <a className="nav-link" href="#inicio">
                                Inicio
                            </a>
                        </li>

                        <li className="nav-item">
                            <a className="nav-link" href="#menu">
                                Menú
                            </a>
                        </li>

                        <li className="nav-item">
                            <a className="nav-link" href="#pedido">
                                Mi pedido
                            </a>
                        </li>

                        <li className="nav-item">
                            <a className="nav-link" href="#sobre-nosotros">
                                Sobre Nosotros
                            </a>
                        </li>

                        <li className="nav-item">
                            <a className="nav-link" href="#contacto">
                                Contacto
                            </a>
                        </li>
                    </ul>
                </section>
            </section>
        </nav>
    );
}

export default Navbar;