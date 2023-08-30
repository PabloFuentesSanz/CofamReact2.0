export const toolbarOptions = [
    ["bold", "italic", "underline", "strike"], // Estilos de texto básicos
    ["blockquote", "code-block"], // Bloques de cita y código

    [{ header: 1 }, { header: 2 }], // Títulos
    [{ list: "ordered" }, { list: "bullet" }], // Listas
    [{ script: "sub" }, { script: "super" }], // Subíndice y superíndice
    [{ indent: "-1" }, { indent: "+1" }], // Sangría
    [{ direction: "rtl" }], // Dirección del texto

    [{ size: ["small", false, "large", "huge"] }], // Tamaños de fuente
    [{ header: [1, 2, 3, 4, 5, 6, false] }], // Encabezados

    [{ color: [] }, { background: [] }], // Colores de texto y fondo
    [{ font: [] }], // Tipografías
    [{ align: [] }], // Alineación

    ["clean"], // Botón para eliminar formato
    ["link", "image"], // Enlaces e imágenes
  ];