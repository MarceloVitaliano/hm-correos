const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

app.post("/send", async (req, res) => {
  const { to, subject, html } = req.body;

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  try {
    await transporter.sendMail({
      from: `"HM Encuadernaciones" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      html,
    });
    res.status(200).send({ message: "Correo enviado exitosamente" });
  } catch (error) {
    console.error("Error al enviar correo:", error);
    res.status(500).send({ error: "Error al enviar correo" });
  }
});

app.get("/", (req, res) => {
  res.send("Backend HM Encuadernaciones funcionando.");
});

app.listen(port, () => {
  console.log(`Servidor corriendo en puerto ${port}`);
});