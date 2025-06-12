const fs = require('fs');
const { chromium } = require('playwright');

async function extraerEnlace() {
  const navegador = await chromium.launch({ headless: true });
  const pagina = await navegador.newPage();

  try {
    await pagina.goto('https://stream196tp.com/global1.php?stream=espn', { timeout: 60000 });

    const enlaces = await pagina.$$eval('script', scripts => {
      const urls = [];
      scripts.forEach(script => {
        const texto = script.textContent;
        const match = texto?.match(/https?:\/\/[^\s"]+\.m3u8[^"']*/g);
        if (match) urls.push(...match);
      });
      return urls;
    });

    const linkValido = enlaces.find(link => link.includes('m3u8') && !link.includes('master.m3u8'));
    if (!linkValido) throw new Error('No se encontró un enlace válido');

    fs.writeFileSync('link.txt', linkValido.trim());
    console.log('✅ Enlace guardado:', linkValido);
  } catch (err) {
    console.error('❌ Error al extraer enlace:', err.message);
  } finally {
    await navegador.close();
  }
}

// Ejecutar ahora
extraerEnlace();

// Repetir cada 1 hora
setInterval(extraerEnlace, 1000 * 60 * 60); // cada 3600000 ms
