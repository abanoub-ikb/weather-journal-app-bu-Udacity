// take instance of express
const express = require('express');
const app = express();

// dependencies
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

const cors = require('cors');
app.use(cors());
app.use(express.static('website'));

const port = 7500;
let projectData = {}; // the data that received from client side 

const server = app.listen(port,listening);
function listening () {
    console.log('server is running');
    console.log(`running on local host ${port}`);
    
};

// post function
app.post('/add',add);

// store the data that sent from client side in the 'projectData' object
function add(req,res){
    projectData=req.body;
};

// get function
app.get('/all', function (req, res) {
    res.send(projectData)
  });