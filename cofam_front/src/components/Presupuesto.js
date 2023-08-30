import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Form, Button, Container } from "react-bootstrap";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { PresupuestoPDF } from "./PresupuestoPDF";
import { pdf } from "@react-pdf/renderer";
import { toast } from 'react-hot-toast';

import { toolbarOptions } from "./toolbarOptions"; // Asegúrate de importar la configuración de la barra de herramientas desde un archivo común

const Presupuesto = () => {
  const navigate = useNavigate();

  const [trabajos, setTrabajos] = useState([]);
  const [trabajoSeleccionado, setTrabajoSeleccionado] = useState("");

  const { id } = useParams();
  const [cliente, setCliente] = useState("");
  const [direccion, setDireccion] = useState("");
  const [localidad, setLocalidad] = useState("");
  const [telefono, setTelefono] = useState("");
  const [email, setEmail] = useState("");
  const [fecha, setFecha] = useState("");
  const [datosPresupuesto, setDatosPresupuesto] = useState("");
  const [trabajosRealizar, setTrabajosRealizar] = useState("");
  const [tiempoEjecucion, setTiempoEjecucion] = useState("");
  const [importe, setImporte] = useState("");
  const [tipoIVA, setTipoIVA] = useState("");
  const [total, setTotal] = useState("");
  const [estado, setEstado] = useState("");
  const [garantia, setGarantia] = useState("");
  const [firmar, setFirmar] = useState("");
  const [empezar, setEmpezar] = useState("");
  const [finalizar, setFinalizar] = useState("");
  const [nota2, setNota2] = useState("");

  const [isLoading, setIsLoading] = useState(true);
  // Cargar trabajos desde la API
  useEffect(() => {
    const fetchTrabajos = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/trabajos");
        setTrabajos(response.data);
      } catch (error) {
        console.error("Error al cargar los trabajos:", error);
      }
    };

    fetchTrabajos();
  }, []);

  useEffect(() => {
    totalPrice();
  }, [tipoIVA, importe]);

  useEffect(() => {
    const fetchPresupuesto = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/presupuestos/${id}`
        );
        setFecha(response.data.Fecha);
        setCliente(response.data.Cliente);
        setDireccion(response.data.Direccion);
        setLocalidad(response.data.Localidad);
        setTelefono(response.data.Telefono);
        setEmail(response.data.email);
        setDatosPresupuesto(response.data.Datos_Presupuesto);
        setTrabajosRealizar(response.data.Trabajos_Realizar);
        setTiempoEjecucion(response.data.Tiempo_Ejecucion);
        setImporte(response.data.Importe);
        setTipoIVA(response.data.Tipo_IVA);
        setTotal(response.data.Total);
        setEstado(response.data.estado);
        setGarantia(response.data.Garantia);
        setFirmar(response.data.Firmar);
        setEmpezar(response.data.Empezar);
        setFinalizar(response.data.Finalizar);
        setNota2(response.data.Nota2);
        setIsLoading(false);
      } catch (error) {
        console.error("Error al obtener el presupuesto:", error);
        setIsLoading(false);
      }
    };
    fetchPresupuesto();
  }, [id]);

  const savePDF = async (presupuesto) => {
    try {
      console.log(presupuesto);
      const blob = await pdf(
        <PresupuestoPDF presupuesto={presupuesto} />
      ).toBlob();
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.target = "_blank";
      link.click();
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error al guardar el presupuesto:", error);
    }
  };

  const handleTrabajoSelect = (event) => {
    const selectedTrabajo = trabajos.find(
      (trabajo) => trabajo.Nombre === event.target.value
    );
    if (selectedTrabajo) {
      setTrabajosRealizar(
        (prevTrabajosRealizar) =>
          prevTrabajosRealizar + "\n" + selectedTrabajo.Descripcion
      );
    }
    setTrabajoSeleccionado(event.target.value);
  };

  const handleDelete = async () => {
    if (
      window.confirm("¿Estás seguro de que deseas eliminar este presupuesto?")
    ) {
      try {
        await axios.delete(`http://localhost:5000/api/presupuestos/${id}`);
        toast.success("Presupuesto eliminado correctamente")
        navigate("/");
      } catch (error) {
        toast.error("Error al eliminar el presupuesto");
      }
    }
  };

  const handldeNew = async (event) => {
    event.preventDefault();
    if (
      window.confirm("¿Estás creando un nuevo presupuesto, desea continuar?")
    ) {
      try {
        const response = await axios.post(
          "http://locaLhost:5000/api/presupuestos",
          {
            Fecha: fecha,
            Cliente: cliente,
            Direccion: direccion,
            Localidad: localidad,
            Telefono: telefono,
            email: email,
            Datos_Presupuesto: datosPresupuesto,
            Trabajos_Realizar: trabajosRealizar,
            Tiempo_Ejecucion: tiempoEjecucion,
            Importe: importe,
            Tipo_IVA: tipoIVA,
            Total: total,
            estado: estado,
            Garantia: garantia,
            Firmar: firmar,
            Empezar: empezar,
            Finalizar: finalizar,
            Nota2: nota2,
          }
        );
        await savePDF(response.data);  
        toast.success("Presupuesto creado correctamente");
        navigate("/");
      } catch (error) {
        toast.error("Error al crear nuevo presupuesto");
      }
    }
  }

  const totalPrice = () => {
    const iva = tipoIVA == "General (21%)" ? 0.21 : 0.1;
    setTotal((Number(importe) + Number(importe) * iva).toFixed(2));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.put(
        `http://localhost:5000/api/presupuestos/${id}`,
        {
          Fecha: fecha,
          Cliente: cliente,
          Direccion: direccion,
          Localidad: localidad,
          Telefono: telefono,
          email: email,
          Datos_Presupuesto: datosPresupuesto,
          Trabajos_Realizar: trabajosRealizar,
          Tiempo_Ejecucion: tiempoEjecucion,
          Importe: importe,
          Tipo_IVA: tipoIVA,
          Total: total,
          estado: estado,
          Garantia: garantia,
          Firmar: firmar,
          Empezar: empezar,
          Finalizar: finalizar,
          Nota2: nota2,
        }
      );
      console.log(response.data);
      await savePDF(response.data);
      toast.success("Presupuesto actualizado correctamente");
    } catch (error) {
      toast.error("Error al actualizar el presupuesto");
    }
  };
  const formatDateToISO = (date) => {
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${year}-${month}-${day}`;
  };
  if (isLoading) {
    return <div>Cargando...</div>;
  }
  return (
    <Container>
      <div className="Presupuesto">
        <h1>Editar Presupuesto #{id}</h1>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="fecha">
            <Form.Label>Fecha</Form.Label>
            <Form.Control
              type="date"
              value={fecha ? formatDateToISO(new Date(fecha)) : ""}
              onChange={(event) => setFecha(event.target.value)}
              required
            />
          </Form.Group>
          <Form.Group controlId="cliente">
            <Form.Label>Cliente</Form.Label>
            <Form.Control
              type="text"
              value={cliente}
              onChange={(e) => setCliente(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group controlId="direccion">
            <Form.Label>Dirección</Form.Label>
            <Form.Control
              type="text"
              value={direccion}
              onChange={(e) => setDireccion(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="localidad">
            <Form.Label>Localidad</Form.Label>
            <Form.Control
              type="text"
              value={localidad}
              onChange={(e) => setLocalidad(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="telefono">
            <Form.Label>Teléfono</Form.Label>
            <Form.Control
              type="text"
              value={telefono}
              onChange={(e) => setTelefono(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="email">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="datosPresupuesto">
            <Form.Label>Datos del Presupuesto</Form.Label>
            <Form.Control
              as="textarea"
              value={datosPresupuesto}
              onChange={(e) => setDatosPresupuesto(e.target.value)}
            />
          </Form.Group>
          <Form.Label>Trabajos a Realizar</Form.Label>
          <Form.Select
            value={trabajoSeleccionado}
            onChange={handleTrabajoSelect}
          >
            <option value="">Selecciona un trabajo</option>
            {trabajos.map((trabajo) => (
              <option key={trabajo.Nombre} value={trabajo.Nombre}>
                {trabajo.Nombre}
              </option>
            ))}
          </Form.Select>
          <Form.Group controlId="trabajosRealizar">
            <ReactQuill
              value={trabajosRealizar}
              onChange={(content) => setTrabajosRealizar(content)}
              theme="snow"
              modules={{ toolbar: toolbarOptions }}
              className="custom-quill-editor"
            />
          </Form.Group>
          <br></br>
          <Form.Group controlId="tiempoEjecucion">
            <Form.Label>Tiempo de Ejecución</Form.Label>
            <Form.Control
              type="text"
              value={tiempoEjecucion}
              onChange={(e) => setTiempoEjecucion(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="importe">
            <Form.Label>Importe</Form.Label>
            <Form.Control
              type="number"
              value={importe}
              onChange={(e) => setImporte(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="tipoIVA">
            <Form.Label>Tipo de IVA</Form.Label>
            <Form.Control
              as="select"
              value={tipoIVA}
              onChange={(e) => setTipoIVA(e.target.value)}
            >
              <option value="General (21%)">General (21%)</option>
              <option value="Reducido (10%)">Reducido (10%)</option>
            </Form.Control>
          </Form.Group>
          <Form.Group controlId="total">
            <Form.Label>Total</Form.Label>
            <Form.Control
              type="text"
              value={total}
              onChange={(e) => setTotal(e.target.value)}
              disabled
            />
          </Form.Group>
          <Form.Group controlId="estado">
            <Form.Label>Estado</Form.Label>
            <Form.Control
              as="select"
              value={estado}
              onChange={(e) => setEstado(e.target.value)}
            >
              <option value="Pendiente">Pendiente</option>
              <option value="Aceptado">Aceptado</option>
              <option value="Rechazado">Rechazado</option>
            </Form.Control>
          </Form.Group>
          <Form.Group controlId="garantia">
            <Form.Label>Garantía</Form.Label>
            <Form.Control
              type="text"
              value={garantia}
              onChange={(e) => setGarantia(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="firmar">
            <Form.Label>% Firmar</Form.Label>
            <Form.Control
              type="text"
              value={firmar}
              onChange={(e) => setFirmar(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="empezar">
            <Form.Label>% Empezar</Form.Label>
            <Form.Control
              type="text"
              value={empezar}
              onChange={(e) => setEmpezar(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="finalizar">
            <Form.Label>% Finalizar</Form.Label>
            <Form.Control
              type="text"
              value={finalizar}
              onChange={(e) => setFinalizar(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="nota2">
            <Form.Label>Nota Adicional</Form.Label>
            <ReactQuill
              value={nota2}
              onChange={(content) => setNota2(content)}
              theme="snow"
              modules={{ toolbar: toolbarOptions }}
              className="custom-quill-editor"
            />
          </Form.Group>
          <br></br>
          <Button variant="primary" type="submit" className="buttonMargin">
            Guardar cambios
          </Button>
          <Button variant="success" onClick={handldeNew} className="buttonMargin">
            Crear nuevo presupuesto
          </Button>
          <Button variant="danger" onClick={handleDelete}>
            Eliminar presupuesto
          </Button>
        </Form>
        <br></br>
      </div>
    </Container>
  );
};

export default Presupuesto;
