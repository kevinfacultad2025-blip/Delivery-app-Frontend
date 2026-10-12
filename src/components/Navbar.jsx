import { Container, Nav, Navbar as BsNavbar } from "react-bootstrap";
import { NavLink } from "react-router-dom";

const ENLACES = [
    { texto: "Inicio", ruta: "/" },
    { texto: "Menú", ruta: "/menu" },
    { texto: "Mi pedido", ruta: "/my-order" },
    { texto: "Sobre Nosotros", ruta: "/about" },
    { texto: "Contacto", ruta: "/contact" }
];

function Navbar() {
    return (
        <BsNavbar expand="lg" collapseOnSelect className="brand-navbar">
            <Container fluid>
                <BsNavbar.Brand
                    as={NavLink}
                    to="/"
                    className="d-lg-none"
                    aria-label="Ir al inicio"
                >
                    <i className="bi bi-shop"></i>
                </BsNavbar.Brand>

                <BsNavbar.Toggle
                    aria-controls="navbarNav"
                    aria-label="Abrir menú"
                >
                    <i className="bi bi-list"></i>
                </BsNavbar.Toggle>

                <BsNavbar.Collapse id="navbarNav">
                    <Nav className="w-100 justify-content-around align-items-center">
                        {ENLACES.map((enlace) => (
                            <Nav.Link
                                key={enlace.ruta}
                                as={NavLink}
                                to={enlace.ruta}
                                end={enlace.ruta === "/"}
                                eventKey={enlace.ruta}
                            >
                                {enlace.texto}
                            </Nav.Link>
                        ))}
                    </Nav>
                </BsNavbar.Collapse>
            </Container>
        </BsNavbar>
    );
}

export default Navbar;
