const express = require("express");
const multer = require("multer");
const xml2js = require("xml2js");
const ExcelJS = require("exceljs");
const cors = require("cors");

const app = express();
const port = 5000;

// Omogućite CORS
app.use(cors());

// Konfiguracija za multer
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Ruta za konverziju XML u Excel
app.post("/convert", upload.single("file"), async (req, res) => {
  try {
    const xmlData = req.file.buffer.toString("utf-8");

    // Parsiranje XML-a u JSON
    const parser = new xml2js.Parser({ explicitArray: false });
    const parsedData = await parser.parseStringPromise(xmlData);

    // Ekstrahovanje podataka iz JSON-a
    const workZones = parsedData.workZones.items.item;

    // Kreiranje Excel fajla
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Work Zones");
    worksheet.columns = [
      { header: "Work Zone Name", key: "workZoneName", width: 30 },
      { header: "Work Zone Label", key: "workZoneLabel", width: 30 },
      { header: "Travel Area", key: "travelArea", width: 20 },
      { header: "Status", key: "status", width: 15 },
      { header: "Key Label", key: "keyLabel", width: 30 },
    ];

    workZones.forEach((zone) => {
      const keys = zone.keys?.key || [];
      const keyArray = Array.isArray(keys) ? keys : [keys];
      keyArray.forEach((key) => {
        worksheet.addRow({
          workZoneName: zone.$.workZoneName,
          workZoneLabel: zone.$.workZoneLabel,
          travelArea: zone.$.travelArea,
          status: zone.$.status,
          keyLabel: key.$.label,
        });
      });
    });

    // Sačuvaj Excel fajl u memoriji
    const buffer = await workbook.xlsx.writeBuffer();

    // Pošalji Excel fajl kao odgovor
    res.setHeader("Content-Disposition", "attachment; filename=output.xlsx");
    res.setHeader("Content-Type", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
    res.send(buffer);
  } catch (error) {
    console.error("Error converting file:", error);
    res.status(500).send("Error converting file");
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});