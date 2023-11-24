const express =require("express")
const bodyParser = require('body-parser');
const router = require('./src/route/generateQuestionRoute'); 

// initiate the express app
const app = express();

// set a port for the express app to listen on
const port = 3000;


// Middleware

app.use(bodyParser.json());
app.use(express.json());

// route
app.use('/api',router);


app.listen(port,()=>{
    console.log(`Question Paper Server listening on http://localhost:${port}`)
});

