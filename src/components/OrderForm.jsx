
function OrderForm({
    manejarEnvioFormulario,
    tipoEntrega,
    setTipoEntrega,
    nombre,
    setNombre,
    direccion,
    setDireccion,
    telefono,
    telefonoValido,
    manejarTelefono,
    metodoPago,
    setMetodoPago,
    montoEfectivo,
    setMontoEfectivo,
    calcularTotalConDescuento,
    codigoCupon,
    setCodigoCupon,
    aplicarCupon,
    porcentajeDescuento,
    mensajeCupon
}) {
    return (
        <section
            id="pedido"
            className="py-5"
        >
            <section className="container">
                <article
                    className="card shadow-sm brand-card mx-auto"
                    style={{ maxWidth: "700px" }}
                >
                    <section className="card-body p-4 p-md-5">
                        <h2 className="text-center fw-bold mb-4 brand-title">
                            Confirmar Pedido
                        </h2>

                        <form
                            className="row g-3"
                            onSubmit={manejarEnvioFormulario}
                        >
                            <section className="col-12 mb-2">
                                <label className="form-label fw-semibold d-block">
                                    Modo de entrega
                                </label>

                                <section
                                    className="btn-group w-100"
                                    role="group"
                                    aria-label="Modo de entrega"
                                >
                                    <input
                                        type="radio"
                                        className="btn-check"
                                        name="tipo-entrega"
                                        id="entrega-delivery"
                                        value="delivery"
                                        checked={
                                            tipoEntrega === "delivery"
                                        }
                                        onChange={(evento) =>
                                            setTipoEntrega(
                                                evento.target.value
                                            )
                                        }
                                    />

                                    <label
                                        className="btn btn-outline-primary fw-bold"
                                        htmlFor="entrega-delivery"
                                    >
                                        <i className="bi bi-truck me-1"></i>{" "}
                                        Delivery
                                    </label>

                                    <input
                                        type="radio"
                                        className="btn-check"
                                        name="tipo-entrega"
                                        id="entrega-retiro"
                                        value="retiro"
                                        checked={
                                            tipoEntrega === "retiro"
                                        }
                                        onChange={(evento) =>
                                            setTipoEntrega(
                                                evento.target.value
                                            )
                                        }
                                    />

                                    <label
                                        className="btn btn-outline-primary fw-bold"
                                        htmlFor="entrega-retiro"
                                    >
                                        <i className="bi bi-shop me-1"></i>{" "}
                                        Retirar en local
                                    </label>
                                </section>
                            </section>

                            <section className="col-12">
                                <label
                                    htmlFor="nombre"
                                    className="form-label fw-semibold"
                                >
                                    Nombre completo
                                </label>

                                <input
                                    type="text"
                                    className="form-control"
                                    id="nombre"
                                    value={nombre}
                                    onChange={(evento) =>
                                        setNombre(
                                            evento.target.value
                                        )
                                    }
                                    required
                                    placeholder="Ej: Juan Pérez"
                                />
                            </section>

                            {tipoEntrega === "delivery" && (
                                <section className="col-12">
                                    <label
                                        htmlFor="direccion"
                                        className="form-label fw-semibold"
                                    >
                                        Dirección de entrega
                                    </label>

                                    <input
                                        type="text"
                                        className="form-control"
                                        id="direccion"
                                        value={direccion}
                                        onChange={(evento) =>
                                            setDireccion(
                                                evento.target.value
                                            )
                                        }
                                        required
                                        placeholder="Ej: Av. Alem 123"
                                    />
                                </section>
                            )}

                            <section className="col-12 col-md-6">
                                <label
                                    htmlFor="telefono"
                                    className="form-label fw-semibold"
                                >
                                    Teléfono / WhatsApp
                                </label>

                                <input
                                    type="tel"
                                    className={`form-control ${
                                        telefono.length > 0
                                            ? telefonoValido
                                                ? "is-valid"
                                                : "is-invalid"
                                            : ""
                                    }`}
                                    id="telefono"
                                    value={telefono}
                                    onChange={manejarTelefono}
                                    required
                                    placeholder="Ej: 3811234567"
                                />

                                <section className="invalid-feedback">
                                    Ingresá un número válido
                                    de mínimo 10 dígitos.
                                </section>
                            </section>

                            <section className="col-12 col-md-6">
                                <label
                                    htmlFor="metodo-pago"
                                    className="form-label fw-semibold"
                                >
                                    Método de pago
                                </label>

                                <select
                                    className="form-select"
                                    id="metodo-pago"
                                    value={metodoPago}
                                    onChange={(evento) =>
                                        setMetodoPago(
                                            evento.target.value
                                        )
                                    }
                                >
                                    <option value="efectivo">
                                        Efectivo
                                    </option>

                                    <option value="transferencia">
                                        Transferencia
                                    </option>

                                    <option value="tarjeta">
                                        Tarjeta (POSNET al
                                        entregar)
                                    </option>
                                </select>
                            </section>

                            {metodoPago === "efectivo" && (
                                <section className="col-12">
                                    <label
                                        htmlFor="monto-efectivo"
                                        className="form-label fw-semibold"
                                    >
                                        ¿Con cuánto vas a
                                        pagar?{" "}
                                        <small className="text-muted">
                                            (para llevar
                                            cambio)
                                        </small>
                                    </label>

                                    <input
                                        type="number"
                                        className={`form-control ${
                                            montoEfectivo !== "" &&
                                            Number(
                                                montoEfectivo
                                            ) <
                                                calcularTotalConDescuento()
                                                ? "is-invalid"
                                                : ""
                                        }`}
                                        id="monto-efectivo"
                                        value={montoEfectivo}
                                        onChange={(evento) =>
                                            setMontoEfectivo(
                                                evento.target.value
                                            )
                                        }
                                        min="0"
                                        placeholder="Ej: 10000"
                                    />

                                    <section className="invalid-feedback">
                                        El monto ingresado
                                        debe ser mayor o igual
                                        al total a pagar.
                                    </section>
                                </section>
                            )}

                            {metodoPago === "transferencia" && (
                                <section className="col-12">
                                    <article className="alert alert-info border-0 shadow-sm mb-0">
                                        <p className="fw-bold mb-1">
                                            <i className="bi bi-bank me-1"></i>{" "}
                                            Datos para
                                            transferir:
                                        </p>

                                        <p className="small mb-1">
                                            <strong>
                                                Alias:
                                            </strong>{" "}
                                            nombredellocal.mp
                                        </p>

                                        <p className="small mb-0">
                                            <strong>
                                                CBU:
                                            </strong>{" "}
                                            0000003100012345678901
                                        </p>
                                    </article>
                                </section>
                            )}

                            <section className="col-12 mt-3">
                                <label
                                    htmlFor="codigo-descuento"
                                    className="form-label fw-semibold"
                                >
                                    Código de descuento
                                </label>

                                <section className="input-group">
                                    <input
                                        type="text"
                                        className="form-control text-uppercase"
                                        id="codigo-descuento"
                                        value={codigoCupon}
                                        onChange={(evento) =>
                                            setCodigoCupon(
                                                evento.target.value
                                            )
                                        }
                                        placeholder="Ej: PRIMERPEDIDO"
                                        disabled={
                                            porcentajeDescuento >
                                            0
                                        }
                                    />

                                    <button
                                        className="btn btn-outline-secondary fw-bold"
                                        type="button"
                                        onClick={aplicarCupon}
                                        disabled={
                                            porcentajeDescuento >
                                            0
                                        }
                                    >
                                        Aplicar
                                    </button>
                                </section>

                                {mensajeCupon && (
                                    <p
                                        className={`form-text mt-1 fw-bold ${
                                            porcentajeDescuento >
                                            0
                                                ? "text-success"
                                                : "text-danger"
                                        }`}
                                    >
                                        {mensajeCupon}
                                    </p>
                                )}
                            </section>

                            <section className="col-12 mt-4">
                                <button
                                    type="submit"
                                    className="btn brand-btn-primary w-100 py-2 fw-bold"
                                >
                                    <i className="bi bi-check-circle me-1"></i>{" "}
                                    Confirmar Pedido
                                </button>
                            </section>
                        </form>
                    </section>
                </article>
            </section>
        </section>
    );
}

export default OrderForm;