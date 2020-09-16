const express=require('express');
const app=express();
const mongoose=require("mongoose");
const { MONGOURI } = require('./config/keys');
const PORT=process.env.PORT || 5000;



mongoose.connect(MONGOURI,{ useNewUrlParser: true,useUnifiedTopology:true })
mongoose.connection.on("connected",()=>{
    console.log("successfully connected")
})
mongoose.connection.on("error",()=>{
    console.log("disconnected")
})





require("./models/user");
require("./models/post");

app.use(express.json());

app.use(require("./routes/auth"));
app.use(require("./routes/post"));
app.use(require("./routes/user"));



//TW5JYSuxfNwz2XTc

if(process.env.NODE_ENV=="production"){
    app.use(express.static("client/build"))
    const path=require("path")
    app.get("*",(req,res)=>{
        res.sendFile(path.resolve(__dirname,"client","build","index.html"))
    })
}


app.listen(PORT,()=>{
    console.log("server is running on",PORT);
});




// app.get('/',(req,res)=>{
//     console.log("home");
//     res.send("hello world ");
// });

// app.get('/about',(req,res)=>{
//     console.log("about");
//     res.send("about page ");
// });


