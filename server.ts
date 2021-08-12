import express from 'express';
import path from 'path';
import getPageReport from './src/util/puppeteer-page-analyser';

const DIST_DIR = path.join(__dirname, '../client/');
const HTML_FILE = path.join(DIST_DIR, 'index.html');

const app = express();
app.use(express.static(DIST_DIR))
const bodyParser = require('body-parser');

const jsonParser = bodyParser.json();

app.post('/website-report', jsonParser, async (req, res) => {
    try {
        const websiteResult :any = await getPageReport(req.body.domainURL, true);
        res.send({
            response: websiteResult
        });
    }
    catch(e) {
        res.send({
            response: []
        });
    }
});

app.get('/', (req, res) => {
    res.sendFile(HTML_FILE)
});

const PORT = process.env.PORT || 1000;
app.listen(PORT, () => {
    console.log(`App listening to ${PORT}....`);
    console.log('Press Ctrl+C to quit.');
});