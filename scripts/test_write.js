const { writeSheet } = require("../services/sheets");

async function testWrite() {
    console.log("✍ Escribiendo datos en Google Sheets...");

    // Datos de prueba (Nombre de canción, Tono, Fecha)
    const datosPrueba = ["Cancion 1", "Si mayor", "2023-02-16"];

    try {
        await writeSheet("A2", datosPrueba);
        console.log("✅ Prueba de escritura exitosa.");
    } catch (error) {
        console.error("❌ Error al escribir en Google Sheets:", error);
    }
}

testWrite();
