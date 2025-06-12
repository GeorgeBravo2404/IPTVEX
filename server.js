const express = require('express');
const fetch = require('node-fetch');

const app = express();
const PORT = process.env.PORT || 10000;

// Tu enlace RAW al archivo link.txt en GitHub (asegúrate que sea público)
const LINK_TXT_URL = 'https://raw.githubusercontent.com/GeorgeBravo2404/TV/main/link.txt';

app.get('/', async (req, res) => {
  try {
    const response = await fetch(LINK_TXT_URL);
    if (!response.ok) throw new Error('No se pudo obtener el link');

    const m3u8Link = (await response.text()).trim();
    console.log('✅ Enlace obtenido:', m3u8Link);

    // Devuelve el enlace directamente en texto plano
    res.set('Content-Type', 'text/plain');
    res.send(m3u8Link);
  } catch (err) {
    console.error('❌ Error:', err.message);
    res.status(500).send('Error obteniendo enlace');
  }
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
