const express=require('express');
const app=express();
const mongoose=require("mongoose");
require("dotenv").config();


const PORT=process.env.PORT || 5000;



mongoose.connect(process.env.MONGOURI,{
    useNewUrlParser:true,
    useCreateIndex:true,
    useUnifiedTopology:true
}).then(()=>{
    console.log("db connected")
}).catch(err=>{
    console.log("db disconnected")
})




require("./models/user");
require("./models/post");

app.use(express.json());

app.use(require("./routes/auth"));
app.use(require("./routes/post"));
app.use(require("./routes/user"));



//TW5JYSuxfNwz2XTc


    app.use(express.static("client/build"))
    const path=require("path")
    app.get("*",(req,res)=>{
        res.sendFile(path.resolve(__dirname,"client","build","index.html"))
    })



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


