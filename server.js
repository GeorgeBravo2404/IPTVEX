const express = require('express');
const fs = require('fs');
const app = express();
const PORT = process.env.PORT || 8080;

app.get('/', (req, res) => {
  try {
    const m3u8Link = fs.readFileSync('link.txt', 'utf-8').trim();
    console.log('🔁 Redirigiendo a:', m3u8Link);
    res.redirect(m3u8Link);
  } catch (err) {
    console.error('❌ Error al leer el enlace:', err.message);
    res.status(500).send('Error obteniendo enlace');
  }
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
