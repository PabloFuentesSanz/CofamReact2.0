// Importar módulos
const express = require("express");
const mysql = require("mysql");
const cors = require("cors");

// Crear la aplicación Express
const app = express();

// Habilitar CORS para permitir peticiones desde el front-end
app.use(cors());

// Habilitar el uso de JSON en Express
app.use(express.json());

// Crear conexión a la base de datos
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "cofamdatabase",
});

// Conectar a la base de datos
db.connect((err) => {
  if (err) throw err;
  console.log("Conexión a la base de datos exitosa");
});

// Rutas y controladores
app.get("/api/presupuestos", (req, res) => {
  const sql = "SELECT * FROM presupuestos ORDER BY ID DESC";
  db.query(sql, (err, result) => {
    if (err) throw err;
    res.json(result);
  });
});

app.post("/api/presupuestos", (req, res) => {
  const newPresupuesto = req.body;
  const sql = "INSERT INTO presupuestos SET ?";
  db.query(sql, newPresupuesto, (err, result) => {
    if (err) throw err;
    const {
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
    } = { id: result.insertId, ...newPresupuesto };

    // Devuelve el objeto con los nuevos nombres de campos
    res.json({
      id: result.insertId,
      cliente,
      direccion,
      fecha,
      localidad,
      telefono,
      email,
      datosPresupuesto,
      trabajosRealizar,
      tiempoEjecucion,
      importe,
      tipoIVA,
      total,
      estado,
      garantia,
      firmar,
      empezar,
      finalizar,
      nota2,
    });
  });
});

app.get("/api/presupuestos/:id", (req, res) => {
  const sql = "SELECT * FROM presupuestos WHERE ID = ?";
  db.query(sql, req.params.id, (err, result) => {
    if (err) throw err;
    res.json(result[0]);
  });
});

app.put("/api/presupuestos/:id", (req, res) => {
  const updatedPresupuesto = req.body;
  const sql = "UPDATE presupuestos SET ? WHERE ID = ?";
  db.query(sql, [updatedPresupuesto, req.params.id], (err, result) => {
    if (err) throw err;
    const {
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
    } = { id: req.params.id, ...updatedPresupuesto };

    // Devuelve el objeto con los nuevos nombres de campos
    res.json({
      id: req.params.id,
      cliente,
      direccion,
      localidad,
      fecha,
      telefono,
      email,
      datosPresupuesto,
      trabajosRealizar,
      tiempoEjecucion,
      importe,
      tipoIVA,
      total,
      estado,
      garantia,
      firmar,
      empezar,
      finalizar,
      nota2,
    });
  });
});

app.delete("/api/presupuestos/:id", (req, res) => {
  const sql = "DELETE FROM presupuestos WHERE ID = ?";
  db.query(sql, req.params.id, (err, result) => {
    if (err) throw err;
    res.json({ id: req.params.id });
  });
});

app.get("/api/trabajos", (req, res) => {
  const sql = "SELECT * FROM trabajos";
  db.query(sql, (err, result) => {
    if (err) throw err;
    res.json(result);
  });
});

// Iniciar el servidor
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
});
