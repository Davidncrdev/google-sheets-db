const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { writeSheet } = require("./services/sheets");

const app = express();
app.use(cors());
app.use(bodyParser.json());

// ✅ Ruta para comprobar si la API está funcionando
app.get("/", (req, res) => {
    res.send("🚀 API funcionando. Usa POST en /write para escribir en Google Sheets.");
});

// 📌 Ruta para escribir datos en Google Sheets
app.post("/write", async (req, res) => {
    try {
        const { values } = req.body; // Datos enviados desde el frontend

        if (!values || !Array.isArray(values)) {
            return res.status(400).json({ error: "Formato de datos incorrecto" });
        }

        await writeSheet("A2", values);
        res.json({ message: "✅ Datos escritos correctamente en Google Sheets" });
    } catch (error) {
        res.status(500).json({ error: "❌ Error al escribir en Google Sheets", details: error.message });
    }
});

// 🔥 Iniciar el servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});
