import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Image,
  Font,
} from "@react-pdf/renderer";
import Html from "react-pdf-html";
import header from "./header.png";
import footer from "./footer.png";
import RobotoRegularTtf from "../Roboto/Roboto-Regular.ttf";
import RobotoBoldTtf from "../Roboto/Roboto-Bold.ttf";
import RobotoItalicTtf from "../Roboto/Roboto-Italic.ttf";
import RobotoBoldItalicTtf from "../Roboto/Roboto-BoldItalic.ttf";
Font.register({ family: "Roboto", src: RobotoRegularTtf });
Font.register({ family: "Roboto", src: RobotoBoldItalicTtf });
Font.register({ family: "Roboto", src: RobotoItalicTtf });
Font.register({ family: "Roboto", src: RobotoBoldTtf });

const styles = StyleSheet.create({
  body: {
    marginTop: 0,
    marginBottom: 0,
    marginLeft: 0,
    marginRight: 0,
    paddingBottom: 50,
    fontFamily: "Roboto",
  },
  strong: {
    fontWeight: "bold",
    fontStyle: "normal",
  },
  footer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 50,
    marginTop: 50,
  },
});

export const PresupuestoPDF = (props) => {
  const garantia = props.presupuesto.garantia && props.presupuesto.garantia !==0 ? `<li>Garantía de ${props.presupuesto.garantia}</li>`: ""
  const fecha = new Date(props.presupuesto.fecha)
  const dia = fecha.getDate();
  const mes = fecha.getMonth() + 1; // Sumamos 1 porque los meses comienzan desde 0
  const anio = fecha.getFullYear();

  const fechaFormateada = `${dia.toString().padStart(2, "0")}/${mes.toString().padStart(2, "0")}/${anio}`;

  const getIVA = (tipoIva) => {
    switch (tipoIva) {
      case "General (21%)":
        return "21%";
      case "Reducido (10%)":
        return "10%";
      default:
        return "";
    }
  };
  return (
    <Document>
      <Page size="A4" style={styles.body} wrap>
        <View fixed>
          <Image src={header} />
        </View>
        <View fixed style={styles.footer}>
          <Image style={{ width: "100%" }} src={footer} />
        </View>
        <Html>
          {`
          <html>
          <head>
          <style>
              body{
                margin: 0px;
                padding: 0px;
                font-family: 'Roboto',
              }
              .main{
                margin: 10px 20px 0px 20px;
              }  
              .flota{
                background-color: #92D050;
                z-index:1000;
                width: 170px;
                height: 70px;
                position:absolute;
                top: 0 px;
                right:0px;
              }
              .flota-text{
                color: white; 
                font-size: 13px;
                margin: 5px;
              }
              .info-cliente{
                border: 2px solid #92D050;
                color:#243841;
                padding: 5px 0px 0px 3px;
                width:380px;
              }
              .title{
                margin: 5px;
                font-size: 10px;
              }
              .details{
                text-align: center;
                color:#243841;
                font-size: 10px;
              }
              .contenido {
                border: 2px solid #243841;
                width: 100%;
                min-height: 450px;
                font-size: 10px;
              }
              .contenido p{
                font-size: 10px;
                margin-left: 5px;
              }
              .contenido *{
                max-width: 510px;
              
              }
              .contenido img{
                display: block;
                margin-left: auto;
                margin-right: auto;
                max-width: 400px;
              }
              .azul{
                margin-top: 10px;
                margin-bottom: -2px;
                background-color: #243841;
                text-align: center;
                width: 555px;
                color: white;
                font-weight: bold;
                padding: 2px;
                border-bottom: 2px solid #243841;
                font-size: 10px;
              }
              .resumen{
                margin-top: 10px;
                padding: 10px;
                border: 2px solid #243841;
                width: 100%;
                font-size: 10px;
                margin-bottom: -2px;
              }
              .precio{
                padding: 10px;
                border: 2px solid #243841;
                width: 100%;
                font-size: 13px;
              }
              .resumen * {
                font-size: 10px;
              }
              .tiempo{
                margin-top: 20px;
                text-align: center;
                font-size: 13px;
              }
              .otros{
                margin-top: 30px;
              }
              .row{
                background-color: red;
                display: inline;
                width: 100px;
              }
              .table{
                width: 500px;
                text-align: right;
              }
              .firma{
                display: block;
                margin-top: 10px;
                margin-left: auto;
                margin-right: auto;
                border: 2px solid #243841;
                padding: 10px 10px 0px 10px;
              }
              .primera{
                width: 400px;
              }
              .letras{
                font-size: 10px;
                margin-top: 10px;
                margin-bottom: 10px;
              }
              .aceptacion{
                font-size: 15px;
                color: #5E8533;
                margin-bottom: 5px;
              }
              .firmado{
                display: block;
                margin-top: -10px;
                margin-left: auto;
                margin-right: 0px;
                border: 1px solid #243841;
                width: 240px;
                height: 75px;
              }
          </style>
          </head>
          <body>
            <div class="main">
              <div class="flota">
                <p class="flota-text">Presupuesto Nº: <strong>${props.presupuesto.id}</strong></p>
                <p class="flota-text">Fecha: <strong>${fechaFormateada}</strong></p>
              </div>
              <div class="info-cliente">
                <p class="title"><strong>Cliente: </strong>${props.presupuesto.cliente}</p>
                <p class="title"><strong>Dirección: </strong>${props.presupuesto.direccion}, ${props.presupuesto.localidad}</p>
                <p class="title"><strong>Tel.: </strong>${props.presupuesto.telefono}</p>
                <p class="title"><strong>e-mail: </strong>${props.presupuesto.email}</p>
              </div>
              <div class="details">
                <p class="title">De acuerdo a sus necesidades, les detallamos a continuación el siguiente presupuesto</p>
                <strong>${props.presupuesto.datosPresupuesto}</strong>                
              </div>
              <div class="azul">
                TRABAJOS A REALIZAR
              </div>
              <div class="contenido">
                <span>
                  ${props.presupuesto.trabajosRealizar}
                </span>
              </div>
            </div>
          </body>
          `}
        </Html>
      </Page>
      <Page size="A4" style={styles.body} wrap>
        <View fixed>
          <Image src={header} />
        </View>
        <View fixed style={styles.footer}>
          <Image style={{ width: "100%" }} src={footer} />
        </View>
        <Html>
          {`

<html>
<head>
<style>
    body{
      margin: 0px;
      padding: 0px;
      font-family: 'Roboto',
    }
    .main{
      margin: 10px 20px 20px 20px;
    }  
    .flota{
      background-color: #92D050;
      z-index:1000;
      width: 170px;
      height: 70px;
      position:absolute;
      top: 0 px;
      right:0px;
    }
    .flota-text{
      color: white; 
      font-size: 13px;
      margin: 5px;
    }
    .info-cliente{
      border: 2px solid #92D050;
      color:#243841;
      padding: 5px 0px 0px 3px;
      width:380px;
    }
    .title{
      margin: 5px;
      font-size: 10px;
    }
    .details{
      text-align: center;
      color:#243841;
      font-size: 10px;
    }
    .contenido {
      border: 2px solid #243841;
      width: 100%;
      min-height: 450px;
      font-size: 10px;
    }
    .contenido p{
      font-size: 10px;
      margin-left: 5px;

    }
    .contenido *{
      max-width: 510px;
    }
    .contenido img{
      display: block;
      margin-left: auto;
      margin-right: auto;
      max-width: 400px;
    }
    .azul{
      margin-top: 10px;
      margin-bottom: -2px;
      background-color: #243841;
      text-align: center;
      width: 555px;
      color: white;
      font-weight: bold;
      padding: 2px;
      border-bottom: 2px solid #243841;
      font-size: 10px;
    }
    .resumen{
      margin-top: 10px;
      padding: 10px;
      border: 2px solid #243841;
      width: 100%;
      font-size: 10px;
      margin-bottom: -2px;
    }
    .precio{
      padding: 10px;
      border: 2px solid #243841;
      width: 100%;
      font-size: 13px;
    }
    .resumen * {
      font-size: 10px;
    }
    .tiempo{
      margin-top: 20px;
      text-align: center;
      font-size: 13px;
    }
    .otros{
      margin-top: 5px;
    }
    .row{
      background-color: red;
      display: inline;
      width: 100px;
    }
    .table{
      width: 500px;
      text-align: right;
    }
    .firma{
      display: block;
      margin-top: 10px;
      margin-left: auto;
      margin-right: auto;
      border: 2px solid #243841;
      padding: 10px 10px 0px 10px;
    }
    .primera{
      width: 400px;
    }
    .letras{
      font-size: 10px;
      margin-top: 10px;
      margin-bottom: 10px;
    }
    .letras2{
      font-size: 8px;
      margin-top: 5px;
      margin-bottom: 0px;
      margin-left: 63px;
    }
    .aceptacion{
      font-size: 15px;
      color: #5E8533;
      margin-bottom: 5px;
    }
    .firmado{
      display: block;
      margin-top: -10px;
      margin-left: auto;
      margin-right: 0px;
      border: 1px solid #243841;
      width: 240px;
      height: 75px;
    }
</style>
</head>
<body>
                  <div class="main">
                  <div class="resumen">
                  ${props.presupuesto.nota2}
                <span class="otros">
                <table>
                <tr>
                <td>
                    <strong>CONDICIONES DE PAGO:</strong>
                    <ul>
                      <li>${props.presupuesto.firmar} al firmar el contrato.</li>
                      <li>${props.presupuesto.empezar} al inicio del proyecto.</li>
                      <li>${props.presupuesto.finalizar} al finalizar el proyecto.</li>
                    </ul>
                  </td>
                <td>
                <strong>EN EL PRESENTE PRESUPUESTO NO ESTA INCLUIDO:</strong>
                <ul>
                  <li>LICENCIAS Y PERMISOS DE TRABAJO</li>
                  <li>EL GASTO DE LA LUZ Y EL AGUA</li>
                  <li>IVA CORESPONDIENTE</li>
                </ul>
                </td>
                </tr>
                </table>
                  
                  <strong>Nuestra empresa dispone de:</strong>
                  <ul>
                    <li>Seguro de Responsabilidad Civil con Allianz con una cobertura de hasta 900.000€</li>
                    <li>Registro de empresas acreditadas.</li>
                    <li>Cursos PRL con diplomas acreditas de 8 y 20 horas.</li>
                    <li>Reconocimientos médicos</li>
                    <li>Alta en Seguridad Social</li>
                    ${garantia}
                  </ul>
                  
                </span>
              </div>

              <div class="precio">
                <table class="table">
                  <thead>
                    <tr>
                      <th>Tiempo de Ejecución</th>
                      <th>Subtotal sin IVA</th>
                      <th>IVA Aplicado</th>
                      <th>Total EUR</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>${props.presupuesto.tiempoEjecucion}</td>
                      <td>${props.presupuesto.importe}€</td>
                      <td>${getIVA(props.presupuesto.tipoIVA)}</td>
                      <td>${props.presupuesto.total}€</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div class="firma">
                <strong class="aceptacion">Aceptación de la oferta</strong>
                <p class="letras">Nombre:_______________________________ &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; Fecha:________________________________</p>
                <p class="letras">CIF/NIF:_______________________________ &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; En función de: _________________________</p>
                <span class="letras"><strong>Firma conforme se acepta la oferta: </strong><div class="firmado"></div></span>
              </div>
              <p class="letras2">Este presupuesto tiene una validez de 30 días desde su fecha de emisión.</p>
                  </div></body>
                  `}
        </Html>
      </Page>
    </Document>
  );
};
