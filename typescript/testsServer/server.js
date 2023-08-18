const express = require('express');
const path = require('path');
const app = express();

app.listen(3000, () => console.log('Example app listening on port 3000!'));
app.use(express.static(path.join(__dirname + '/../dist')));


app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, '/../dist/index.html'));
});

app.get('/with-amcharts', function (req, res) {
    res.sendFile(path.join(__dirname, '/../dist/index.html'));
});

app.get('/using-api-calls', function (req, res) {
    res.sendFile(path.join(__dirname, '/../dist/index.html'));
});

app.get('/customizing-grid', function (req, res) {
    res.sendFile(path.join(__dirname, '/../dist/index.html'));
});

app.get('/customizing-toolbar', function (req, res) {
    res.sendFile(path.join(__dirname, '/../dist/index.html'));
});


app.get('/pivot-table-demo', function (req, res) {
    res.sendFile(path.join(__dirname, '/../dist/index.html'));
});


app.get('/handling-events', function (req, res) {
    res.sendFile(path.join(__dirname, '/../dist/index.html'));
});

app.get('/with-highcharts', function (req, res) {
    res.sendFile(path.join(__dirname, '/../dist/index.html'));
});

app.get('/updating-data', function (req, res) {
    res.sendFile(path.join(__dirname, '/../dist/index.html'));
});