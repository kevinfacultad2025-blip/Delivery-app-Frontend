import { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";

import HomePage from "../pages/HomePage";
import MenuPage from "../pages/MenuPage";
import OrderPage from "../pages/OrderPage";
import AboutPage from "../pages/AboutPage";
import ContactPage from "../pages/ContactPage";
import Error404Page from "../pages/Error404Page";

// Lleva la pantalla arriba cada vez que se cambia de página
function ScrollToTop() {
    const { pathname } = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    return null;
}

function Rutas({
    carrito,
    agregarAlCarrito,
    cambiarCantidad,
    eliminarDelCarrito,
    vaciarCarrito,
    calcularTotal,
    formatearPrecio
}) {
    return (
        <>
            <ScrollToTop />

            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route
                    path="/menu"
                    element={
                        <MenuPage
                            agregarAlCarrito={agregarAlCarrito}
                            formatearPrecio={formatearPrecio}
                        />
                    }
                />

                <Route
                    path="/my-order"
                    element={
                        <OrderPage
                            carrito={carrito}
                            cambiarCantidad={cambiarCantidad}
                            eliminarDelCarrito={eliminarDelCarrito}
                            vaciarCarrito={vaciarCarrito}
                            calcularTotal={calcularTotal}
                            formatearPrecio={formatearPrecio}
                        />
                    }
                />

                <Route path="/about" element={<AboutPage />} />
                <Route path="/contact" element={<ContactPage />} />

                {/* Cualquier otra dirección muestra el error 404 */}
                <Route path="*" element={<Error404Page />} />
            </Routes>
        </>
    );
}

export default Rutas;
