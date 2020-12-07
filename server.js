const { rewritePdf } = require("./pdf");
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res) => res.send('Server Work'));

app.post('/fillform', async (req, res) => {
    console.log(req.body);
    const pdf = await rewritePdf();
    res.setHeader("Content-Length", pdf.length);
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", "filename=test.pdf");
    res.send(new Buffer.from(pdf));
})

const port = process.env.PORT || 4000;

app.listen(port, () => console.log(`Server running on port ${port}`));