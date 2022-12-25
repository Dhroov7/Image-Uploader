
const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const { cpUpload } = require('./src/utils/uploadFile');

app.use('/', express.static(path.join(__dirname, '../public')));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.header(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept'
    );
    next();
});

app.get('/health', (req, res) => {
    res.send("OK");
});

app.post('/upload', cpUpload, async (req, res) => {
    try {
        if (req.files == undefined) {
            return res.status(400).send({ message: "Please upload a file!" });
        }

        const file = req.files.file[0];

        await waitUntil(true);

        res.status(200).send({
            message: "Uploaded the file successfully: " + file.originalname,
        });
    } catch (err) {
        return res.status(500).send({
            message: `Could not upload the file: ${file.originalname}. ${err}`,
        });
    }
});

app.listen(9898, () => {
    console.log('server started at http://localhost:9898')
});

async function waitUntil(condition) {
    return await new Promise(resolve => {
        const interval = setInterval(() => {
            if (condition) {
                resolve('foo');
                clearInterval(interval);
            };
        }, 2000);
    });
}