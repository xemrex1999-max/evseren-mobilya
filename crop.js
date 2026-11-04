const sharp = require('sharp');
const fs = require('fs');

async function processLogo() {
  try {
    await sharp('images/logo.png')
      .trim() // Crops transparent and solid background edges automatically
      .sharpen() // Crisp it up
      .png({ quality: 100 }) // Ensure best quality
      .toFile('images/logo-refined.png');

    // Replace the old logo
    fs.renameSync('images/logo-refined.png', 'images/logo.png');
    console.log("Logo successfully cropped and sharpened with Sharp!");
  } catch (err) {
    console.error("Error with sharp:", err.message);
  }
}

processLogo();
