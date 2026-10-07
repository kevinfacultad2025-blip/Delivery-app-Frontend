import { useState } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Rutas from "./routes/Rutas";

function App() {
    // ==========================================================
    // CARRITO (vive acá para compartirse entre pages por props)
    // ==========================================================

    const [carrito, setCarrito] = useState([]);

    function agregarAlCarrito(id, nombreProducto, precio) {
        setCarrito((carritoActual) => {
            const productoExistente = carritoActual.find(
                (item) => item.id === id
            );

            if (productoExistente) {
                return carritoActual.map((item) =>
                    item.id === id
                        ? { ...item, cantidad: item.cantidad + 1 }
                        : item
                );
            }

            return [
                ...carritoActual,
                {
                    id,
                    nombre: nombreProducto,
                    precio: Number(precio),
                    cantidad: 1
                }
            ];
        });
    }

    function cambiarCantidad(id, cambio) {
        setCarrito((carritoActual) =>
            carritoActual
                .map((item) =>
                    item.id === id
                        ? { ...item, cantidad: item.cantidad + cambio }
                        : item
                )
                .filter((item) => item.cantidad > 0)
        );
    }

    function eliminarDelCarrito(id) {
        setCarrito((carritoActual) =>
            carritoActual.filter((item) => item.id !== id)
        );
    }

    function vaciarCarrito() {
        setCarrito([]);
    }

    function calcularTotal() {
        return carrito.reduce(
            (acumulado, item) => acumulado + item.precio * item.cantidad,
            0
        );
    }

    function formatearPrecio(numero) {
        return "$" + Number(numero).toLocaleString("es-AR");
    }

    return (
        <section className="d-flex flex-column min-vh-100">
            <Navbar />

            <section className="flex-grow-1">
                <Rutas
                    carrito={carrito}
                    agregarAlCarrito={agregarAlCarrito}
                    cambiarCantidad={cambiarCantidad}
                    eliminarDelCarrito={eliminarDelCarrito}
                    vaciarCarrito={vaciarCarrito}
                    calcularTotal={calcularTotal}
                    formatearPrecio={formatearPrecio}
                />
            </section>

            <Footer />
        </section>
    );
}

export default App;
