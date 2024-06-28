const puppeteer = require("puppeteer");

const captureScreenshot = async (req, res) => {
  const { url } = req.query;

  if (!url) {
    return res.status(400).send("URL não fornecida");
  }

  try {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url);
    const screenshot = await page.screenshot();
    await browser.close();
    res.set("Content-Type", "image/png");
    res.send(screenshot);
  } catch (error) {
    console.error("Erro ao capturar a captura de tela:", error);
    res.status(500).send("Erro interno do servidor");
  }
};

module.exports = { captureScreenshot };
