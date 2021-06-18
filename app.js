const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const borderRoutes = require('./api/routes/boards');
const cardListRoutes = require('./api/routes/b');
const userRoutes = require('./api/routes/user');

mongoose.connect(process.env.MONGODB_URI || 'mongodb+srv://maklaut:MZ7145824_@trello-aktlt.mongodb.net/test?retryWrites=true&w=majority', 
  {
    useNewUrlParser: true
  }
)

app.use(morgan('dev'));
app.use(express.json());


app.use((req, res, next) => {
    
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers", 
      "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    if(req.method==='OPTIONS'){
      req.header('Access-Control-Allow-Methods', 'GET, DELETE, POST, OPTIONS, PUT');
      return res.status(200).json({});
    }
    next();
})



app.use('/b', cardListRoutes);
app.use('/boards', borderRoutes);
app.use('/user', userRoutes);

app.use((req, res, next) => {
    console.log(req, res, next)
    const error = new Error('Not found');
    error.status = 404;
    next(error);
})

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
});

module.exports = app;