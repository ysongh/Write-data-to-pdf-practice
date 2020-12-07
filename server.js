const { rewritePdf } = require("./pdf");
const express = require('express');

const app = express();

app.get('/', (req, res) => res.send('Server Work'));

app.get('/fillform', async (req, res) => {
    const pdf = await rewritePdf();
    res.setHeader("Content-Length", pdf.length);
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", "filename=test.pdf");
    res.send(new Buffer.from(pdf));
})

const port = process.env.PORT || 4000;

app.listen(port, () => console.log(`Server running on port ${port}`));