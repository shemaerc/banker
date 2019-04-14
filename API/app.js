import express from 'express';
import morgan from'morgan';
import usersRouter from'./routes/users';
import accountRouter from'./routes/account';
import transaction from'./routes/transaction';
import bodyParser from 'body-parser';
const app = express();
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(morgan('dev'));


app.use('/API/v1', usersRouter);
app.use('/API/v2',accountRouter);
app.use('/API/v3',transaction);
//ERRROR HANDLING 
app.use((req, res, next) =>{
    const error = new Error('Not found');
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) =>{
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    })
});

// export default app;
module.exports = app;