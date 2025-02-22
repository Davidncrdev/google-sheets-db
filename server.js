const express = require("express");
const cors = require("cors");
const { sheets } = require("./config/googleAuth");

const app = express();
const PORT = 3001;
const SPREADSHEET_ID = "1lB4avRp81v1DB0XqfNpAjOuhAqALSzS7gyeiiMrjEZA";

app.use(cors());
app.use(express.json());

// Leer datos desde Google Sheets
app.get("/api/datos", async (req, res) => {
    try {
        const response = await sheets.spreadsheets.values.get({
            spreadsheetId: SPREADSHEET_ID,
            range: "A1:C2", // Ajusta el rango según tus datos
        });

        res.json(response.data.values || []);
    } catch (error) {
        res.status(500).json({ error: "Error al leer los datos" });
        console.log(error);
    }
});

// Escribir datos en Google Sheets
app.post("/api/datos", async (req, res) => {
    const { nombre, tono, fecha } = req.body;
    if (!nombre || !tono || !fecha) {
        return res.status(400).json({ error: "Faltan datos" });
    }

    try {
        await sheets.spreadsheets.values.append({
            spreadsheetId: SPREADSHEET_ID,
            range: "A2",
            valueInputOption: "RAW",
            requestBody: { values: [[nombre, tono, fecha]] },
        });

        res.json({ message: "Datos guardados correctamente" });
    } catch (error) {
        res.status(500).json({ error: "Error al escribir en la hoja" });
    }
});

app.listen(PORT, () => {
    console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});
