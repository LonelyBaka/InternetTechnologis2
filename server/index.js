// выдача страниц
let express = require("express");
let app = express();
let bodyParser = require("body-parser");

let urlencodedParser = bodyParser.urlencoded({extended: true});
let clc1 = 0;
let clientCount = 0;

app.get('/index.html', function (req, res) {
    res.sendFile(__dirname + '/client/index.html');
    console.log("in index.html");
    console.log(clc1);
    clc1++;
});

app.post('/index.html', urlencodedParser, function(req, res) {
    return res.send(String(clc1));
});

app.post('/game1.html', urlencodedParser, function(req, res) {
    clientCount++;
    return res.send(String(clientCount));
});

app.get('/game.html', function (req, res) {
    res.sendFile(__dirname + '/client/game.html');
    console.log("in game.html");
});

app.use(express.static("client"));
app.use(express.urlencoded({extended: true}));
app.use(bodyParser.json());

app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});

// прием, обработка и отправка данных


let request = {
    i1: -1,
    j1: -1,
    val1: "X",
    i2: -1,
    j2: -1,
    val2: "X",
    i3: -1,
    j3: -1,
    val3: "X",
    move: -1
};

let move = 1;
let data;
app.post('/game.html', urlencodedParser, function(req, res) {
    data = req.body;
    console.log(data.move);
    if (move === data.move){
        request = data;
        if (move === 1)
            move = 2;
        else if (move === 2)
            move = 1;
    }
    return res.json(request);
});


app.post("/check", urlencodedParser, function(req, res){
    clientCount--;
    console.log(clientCount);
});

app.get("/gameover", urlencodedParser, function(req, res){
    res.sendFile(__dirname + '/client/index.html');
    clientCount--;
});

app.post("/gameover", urlencodedParser, function(req, res){
    if (clientCount == 1)
        res.send("no");
});