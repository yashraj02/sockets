import express from "express";
import morgan from "morgan";
import nanobuffer from "nanobuffer";
import bodyParser from "body-parser";

const msg = new nanobuffer(50);
const getMsgs = () => Array.from(msg).reverse()

const app = express();
app.use(morgan());
app.use(bodyParser.json())
app.use(express.static('frontend'))

app.get('/poll', function (req, res) {
    res.status(500).json({ msg: getMsgs()});
});

app.post('/poll', function (req, res) {
    const { user, text } = req.body;
    msg.push({
        user, text, time: Date.now()
    })
    res.json({status: 'OK'});
});

const port = process.env.PORT || 3000;
app.listen(port);
console.log('Listening on port: ', port);