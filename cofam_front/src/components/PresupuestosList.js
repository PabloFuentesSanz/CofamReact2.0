import { useState, useEffect } from "react";
import { Table, Container, Button, Form } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./PresupuestosList.css";

const PresupuestosList = () => {
  const [presupuestos, setPresupuestos] = useState([]);
  const navigate = useNavigate();
  const [searchText, setSearchText] = useState("");
  const [filteredPresupuestos, setFilteredPresupuestos] = useState([]);

  useEffect(() => {
    setFilteredPresupuestos(
      presupuestos.filter((presupuesto) =>
        `${presupuesto.ID} ${presupuesto.Cliente} ${presupuesto.Direccion}`
          .toLowerCase()
          .includes(searchText.toLowerCase())
      )
    );
  }, [presupuestos, searchText]);

  useEffect(() => {
    const fetchPresupuestos = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/presupuestos"
        );
        setPresupuestos(response.data);
      } catch (error) {
        console.error("Error al obtener los presupuestos:", error);
      }
    };

    fetchPresupuestos();
  }, []);

  return (
    <Container>
      <h1>Lista de presupuestos</h1>
      <Form.Control
        type="text"
        placeholder="Buscar por ID, cliente o dirección..."
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
      />
      <div className="table-container">
        <Table className="table-responsive" striped bordered hover responsive >
          <thead>
            <tr>
              <th>ID</th>
              <th>Cliente</th>
              <th>Dirección</th>
              <th>Nota</th>
              <th>Estado</th>
            </tr>
          </thead>
          <tbody>
            {filteredPresupuestos.map((presupuesto) => (
              <tr
                key={presupuesto.ID}
                onClick={() => navigate(`/presupuesto/${presupuesto.ID}`)}
              >
                <td>{presupuesto.ID}</td>
                <td>{presupuesto.Cliente}</td>
                <td>{presupuesto.Direccion}</td>
                <td>{presupuesto.Datos_Presupuesto}</td>
                <td>{presupuesto.estado}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </Container>
  );
};

export default PresupuestosList;
