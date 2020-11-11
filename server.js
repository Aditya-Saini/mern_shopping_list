const express=require('express'),
      mongoose=require('mongoose'),
      bodyParser=require('body-parser');

const app=express();

// Bodyparser MiddleWare
app.use(bodyParser.json());

//DB Config
const db=require('./config/keys').mongoURI;

//connect mongo
mongoose
    .connect(db, {useNewUrlParser: true,useUnifiedTopology: true, useCreateIndex:true})
    .then(() => console.log('MongoDB Connected..'))
    .catch(err => console.log(err));

const port = process.env.PORT || 5000

app.listen(port, () => console.log(`Server Started on Port ${port}`));