const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const userRoutes = require("../server/routes/userRoutes.js")
const messageRoute = require("../server/routes/messagesRoute.js");

const app = express();
const socket = require("socket.io");
require("dotenv").config();

app.use(cors());
app.use(express.json());
app.use("/api/auth" , userRoutes) // static url
app.use("/api/messages" , messageRoute) 

mongoose.connect(process.env.MONGO_URL,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(()=>{
    console.log("DB Connected Sucessfull");
}).catch((error)=>{
    console.log(error.message);
});

const server = app.listen(process.env.PORT , ()=>{
    console.log(`Server started on port ${process.env.PORT}`);
});

const io = socket(server,{
    cors:{
        origin: "https://localhost3000",
        Credential: true,
    }
})

global.onlineUsers = new Map();  

io.on("connection" , (socket) => {
    global.charSocket = socket;
    socket.on("add-user" , (userId) => {
        onlineUsers.set(userId, socket.id);
    });

    socket.on("send-msg" , (data) => {
        const sendUserSocket = onlineUsers.get(data.to);
        if(sendUserSocket) //if the user is online
        {
            socket.to(sendUserSocket).emit("msg-recieve" , data.msg);
        }
    });
});