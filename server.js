const express=require('express'),
      mongoose=require('mongoose'),
      path=require('path'),
      config = require('config');

const items= require('./routes/api/item')

const app=express();

// Bodyparser MiddleWare
app.use(express.json());

//DB Config
const db=config.get('mongoURI');

//connect mongo
mongoose
    .connect(db, {useNewUrlParser: true,useUnifiedTopology: true, useCreateIndex:true})
    .then(() => console.log('MongoDB Connected..'))
    .catch(err => console.log(err));

//use ROutes
app.use('/api/items', items);
app.use('/api/users', require('./routes/api/users'));

// Serve static assets if in production
if(process.env.NODE_ENV === 'production'){
    //set static folder
    app.use(express.static('client/build'));

    app.get('*', (req, res) =>{
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    })
}

const port = process.env.PORT || 5000

app.listen(port, () => console.log(`Server Started on Port ${port}`));