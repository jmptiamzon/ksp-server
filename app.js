const express = require('express');
const bodyParser = require('body-parser');
const app = express();
require('dotenv').config();
const cors = require('cors');

// ****** allow cross-origin requests code START ****** //
//app.use(cors()); // uncomment this to enable all CORS and delete cors(corsOptions) in below code
const allowedOrigins = process.env.allowedOrigins.split(',');

app.use(cors({
    origin: function (origin, callback) {
        // allow requests with no origin 
        // (like mobile apps or curl requests)
        if (!origin) return callback(null, true);
        if (allowedOrigins.indexOf(origin) === -1) {
            var msg = 'The CORS policy for this site does not ' + 'allow access from the specified Origin.';
            return callback(new Error(msg), false);
        }
        return callback(null, true);
    }
}));

//const valFunctions = require('./validations/validate');
const jsonParser = bodyParser.json();
// create application/x-www-form-urlencoded parser
const urlencodedParser = bodyParser.urlencoded({ extended: false });

app.get('/getlocation', jsonParser, function (req, res) {
    //if(valFunctions.checkInputDataNULL(req,res)) return false;
    //if(valFunctions.checkInputDataQuality(req,res)) return false;
    //if(valFunctions.checkUserAuthRole(req,res)) return false;
    var dbFunctions = require('./models/connector');
//    var userEmail = valFunctions.checkJWTToken(req,res);
    //if(!userEmail) return false;
    dbFunctions.getLocation(req, res);
});

app.post('/setFibonacci', jsonParser, function (req, res) {
    //if(valFunctions.checkInputDataNULL(req,res)) return false;
    //if(valFunctions.checkInputDataQuality(req,res)) return false;
    //if(valFunctions.checkJWTToken(req,res)) return false;
    //if(valFunctions.checkUserAuthRole(req,res)) return false;

    var dbFunctions = require('./models/connector');
    dbFunctions.setFibonacci(req,res);
});

app.use('/', (req, res) => res.send("Welcome Sample!"));
app.listen(process.env.PORT, () => console.log('Port: ' + process.env.PORT));