const { PDFDocument, StandardFonts, rgb } = require('pdf-lib');
const fs = require("fs");
const path = require("path");

async function rewritePdf(userData){
    const existingPdfBytes = fs.readFileSync(path.join(__dirname, "./pdf/TestTemplate.pdf"));

    const pdfDoc = await PDFDocument.load(existingPdfBytes);

    const helveticaFont = await pdfDoc.embedFont(StandardFonts.Helvetica);

    const pages = pdfDoc.getPages();
    const firstPage = pages[0];

    const { width, height } = firstPage.getSize();

    firstPage.drawText(userData.name, {
        x: 250,
        y: height / 2 + 200,
        size: 50,
        font: helveticaFont,
        color: rgb(0.95, 0.1, 0.1),
    })

    firstPage.drawText(userData.age, {
        x: 250,
        y: height / 2 + 100,
        size: 50,
        font: helveticaFont,
        color: rgb(0.95, 0.1, 0.1),
    })

    const pdfBytes = await pdfDoc.save();

    return pdfBytes;
}

module.exports = { rewritePdf };