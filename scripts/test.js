const { readSheet, writeSheet } = require("../services/sheets");

async function main() {
    console.log("📄 Leyendo datos...");
    const data = await readSheet("A1:C10");
    console.log("Datos actuales:", data);

    console.log("✍ Escribiendo datos...");
    await writeSheet("A2", ["Nueva Canción", "Do Mayor", "2025-02-16"]);
}

main();
