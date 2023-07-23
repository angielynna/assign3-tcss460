var express = require("express");
const cors = require('cors');
var app = express();

app.use(cors());

app.get('/', function (req, res) { 
    res.status(200); 
    console.log("a request has been processed in / (root) "); 
});

app.get("/bmi/:weight/:height", function(req, res) {
    const weight = parseInt(req.params.weight);
    const height = parseInt(req.params.height);
    if(isNaN(weight) || isNaN(height)){
        res.status(400);
        res.json({error: "bad request"});
        return;
    }
    res.status(200);
    const bmi = weight/(Math.pow(height,2));
    console.log("/bmi/weight/height   request is made...");
    res.json({bmi: bmi});
});

app.get("/bodyfat/:age/:bmi", function(req, res) {
    const bmi = parseInt(req.params.bmi);
    const age = parseInt(req.params.age);
    if(isNaN(age) || isNaN(bmi)){
        res.status(400);
        res.json({error: "bad request"});
        return;
    }
    res.status(200);
    const bodyfat = (1.20 * bmi) + (0.23 * age) - 16.2;
    console.log("/bodyfat/age/bmi   request is made...");
    res.json({bodyfat: bodyfat});
});

app.get("/bmr/:age/:weight/:height", function(req, res) {
    const age = parseInt(req.params.age);
    const weight = parseInt(req.params.weight);
    const height = parseInt(req.params.height)/100;
    if(isNaN(age) || isNaN(weight) || isNaN(height)){
        res.status(400);
        res.json({error: "bad request"});
        return;
    }
    res.status(200);
    const bmr = 10 * weight + 6.25 * height - 5 * age + 5;
    console.log("/bmr/age/weight/height   request is made...");
    res.json({bmr: bmr});
});

app.get("/calories/:age/:weight/:height", function(req, res) {
    const age = parseInt(req.params.age);
    const weight = parseInt(req.params.weight);
    const height = parseInt(req.params.height)/100;
    if(isNaN(age) || isNaN(weight) || isNaN(height)){
        res.status(400);
        res.json({error: "bad request"});
        return;
    }
    res.status(200);
    const dailycal = 66.47 + (13.75 * weight) + (5.003 * height) - (6.755 * age);
    console.log("/calories/age/weight/height   request is made...");
    res.json({dailyCal: dailycal});
});

app.listen(3000, function () { 
    console.log("API version 1.0.0 is running on port 3000"); 
});
