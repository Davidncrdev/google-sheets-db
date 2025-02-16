// api/write.js
const { writeSheet } = require("../services/sheets"); // Asegúrate de que la ruta sea correcta

module.exports = async (req, res) => {
  try {
    // Aquí podrías obtener datos del body, etc.
    const datosPrueba = ["Canción de prueba", "Sol Mayor", "2025-02-16"];
    await writeSheet("A2", datosPrueba);
    res.status(200).json({ message: "Datos escritos correctamente" });
  } catch (error) {
    res.status(500).json({ error: "Error al escribir en Google Sheets", details: error });
  }
};
