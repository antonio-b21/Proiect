var express = require('express');
var path = require('path');
var formidable = require('formidable');
var session = require('express-session');
var fs = require('fs');
var crypto = require('crypto');
var url = require('url');
var bodyParser = require('body-parser');
var app = express();

app.set('view engine', 'ejs');

app.locals.shuffle = (array) => {
    var tmp, current, top = array.length;
    if(top) while(--top) {
        current = Math.floor(Math.random() * (top + 1));
        tmp = array[current];
        array[current] = array[top];
        array[top] = tmp;
    }
    return array;
}

function log(info) {
    var logfile;
    if (fs.existsSync("app.log")) {
        logfile = fs.readFileSync("app.log").toString();
    }
    else {
        logfile = "";
    }
    logfile += new Date().toUTCString() + ": " + info + '\n';
    fs.writeFileSync("app.log", logfile);
}

//----------------use
app.use(express.static(path.join(__dirname, 'resources')));
app.use(session({
    secret: "parola_sesiune",
    resave: true,
    saveUninitialized: false
}));
app.use(bodyParser.json());

//----------------post
app.post('/inregistrare', (req, res) => {
    var dateFormular = new formidable.IncomingForm();
    dateFormular.parse(req, (err, fields, files) => {
        var useriJSON = JSON.parse(fs.readFileSync("resources/json/useri.json"));
        var algCriptare = crypto.createCipher("aes-128-cbc", "cheie_de_criptare");
        var parolaCriptata = algCriptare.update(fields.parola, "utf8", "base64");
        parolaCriptata += algCriptare.final("base64");
        var user = {
            id: useriJSON.lastId,
            username: fields.username,
            nume: fields.nume,
            email: fields.email,
            parola: parolaCriptata,
            dataInreg: new Date(),
            rol: "user",
            sex: fields.sex,
            hobby: (fields.hobby ? fields.hobby : null),
            comanda: []
        };
        useriJSON.useri.push(user);
        useriJSON.lastId += 1;
        fs.writeFileSync("resources/json/useri.json", JSON.stringify(useriJSON, null, '\t'));
        var logData = "userul " + user.username + "(ID: " + user.id + ") s-a inregistrat";
        log(logData);
        req.session.utilizator = user.id;
        res.redirect("/");
    });
});
app.post('/login', (req, res) => {
    var dateFormular = new formidable.IncomingForm();
    dateFormular.parse(req, (err, fields, files) => {
        var useriJSON = JSON.parse(fs.readFileSync("resources/json/useri.json"));
        var algCriptare = crypto.createCipher("aes-128-cbc", "cheie_de_criptare");
        var parolaCriptata = algCriptare.update(fields.parola, "utf8", "base64");
        parolaCriptata += algCriptare.final("base64");
        var user = useriJSON.useri.find((el) => { return el.username == fields.username && el.parola == parolaCriptata; });
        if (user) {
            req.session.utilizator = user.id;
            if (req.session.url == "/inregistrare") {
                req.session.url = "/";
            }
            var logData = "userul " + user.username + "(ID: " + user.id + ") s-a conectat";
            log(logData);
        }
        res.redirect(req.session.url);
    });
});

//----------------get
app.get('/', (req, res) => {
    var userID = (req.session ? (req.session.utilizator !== null ? req.session.utilizator : null) : null);
    var useriJSON = JSON.parse(fs.readFileSync("resources/json/useri.json"));
    var user = useriJSON.useri.find((el) => { return el.id === userID; });
    req.session.url = '/';
    res.render("pages/index", { user: user });
});
app.get('/logout', (req, res) => {
    delete req.session.utilizator;
    res.redirect(req.session.url);
})
app.get('/*', (req, res) => {
    var userID = (req.session ? (req.session.utilizator !== null ? req.session.utilizator : null) : null);
    var useriJSON = JSON.parse(fs.readFileSync("resources/json/useri.json"));
    var user = useriJSON.useri.find((el) => { return el.id === userID; });
    var produse = JSON.parse(fs.readFileSync('resources/json/rucsacuri.json'));
    var currURL = new URL(req.url, "https://example.com");
    if (req.url != "/blank") {
        req.session.url = req.url;
    }
    if (req.url == "/comenzi" && !user) {
        res.status(404).render("pages/404", { user: user });
    } 
    else if (currURL.pathname == "/produse" && currURL.search) {
        var query = currURL.searchParams;
        if (Array.from(query).length == 1 && query.get("id") && query.get("id") >= 0 && query.get("id") < produse.lastId) {
            let userlocal;
            if (user) {
                userlocal = user.username + "(ID: " + user.id + ")";
            }
            else {
                userlocal = "guest";
            }
            var logData = "userul " + userlocal + " a vizualizat un produs(ID: " + query.get("id") + ")";
            log(logData);
            res.render('pages/produs', { user: user, produse: produse, produs: produse.rucsacuri[query.get("id")] });
        }
        else {
            res.status(404).render("pages/404", { user: user });
        }
    }
    else {
        res.render('pages' + req.url, { user: user, produse: produse }, (err, rezRandare) => {
            if (err) {
                if (err.message.indexOf("Failed to lookup view") != -1) {
                    res.status(404).render("pages/404", { user: user });
                }
                else {
                    throw err;
                }
            }
            else if (req.url == "/404") {
                res.status(404).render("pages/404", { user: user });
            }
            else {
                res.send(rezRandare);
            }
        });
    }
});

//----------------put
app.put('/adauga', (req, res) => {
    var useriJSON = JSON.parse(fs.readFileSync("resources/json/useri.json"));
    var user = useriJSON.useri.find((el) => { return el.username == req.body.username; });
    useriJSON.useri[user.id].comanda.push(req.body.produs);
    fs.writeFileSync("resources/json/useri.json", JSON.stringify(useriJSON, null, '\t'));
    var logData = "userul " + user.username + "(ID: " + user.id + ") a adaugat un produs(ID: " + req.body.produs + ") in cosul de cumparaturi";
    log(logData);
});
app.put('/sterge', (req, res) => {
    var useriJSON = JSON.parse(fs.readFileSync("resources/json/useri.json"));
    var user = useriJSON.useri.find((el) => { return el.username == req.body.username; });
    var pozitie = useriJSON.useri[user.id].comanda.indexOf(req.body.produs);
    useriJSON.useri[user.id].comanda.splice(pozitie, 1);
    fs.writeFileSync("resources/json/useri.json", JSON.stringify(useriJSON, null, '\t'));
    var logData = "userul " + user.username + "(ID: " + user.id + ") a sters un produs(ID: " + req.body.produs + ") din cosul de cumparaturi";
    log(logData);
});

//----------------listen
app.listen(8080, () => {
    console.log('Aplicatia se va deschide pe portul 8080.');
    var logData = "serverul a pornit";
    log(logData);
});
