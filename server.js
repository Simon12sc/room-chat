

import express from "express"

const app=express()
import {createServer} from "http";
import { Server } from "socket.io";
import * as url from 'url';
    const __filename = url.fileURLToPath(import.meta.url);
    const __dirname = url.fileURLToPath(new URL('.', import.meta.url));

app.use(express.static(__dirname+"public"))
const server= createServer(app);
const io=new Server(server);


app.get("/",(req,res,next)=>{
    res.sendFile(__dirname+"/index.html");
})

 app.get("/groupChat",(req,res,next)=>{
     res.sendFile(__dirname+'/public/main1.html');
 })




io.on("connection",(socket)=>{

    socket.on("join room",(roomName)=>{
        socket.join(roomName);
        socket.emit("roomName",roomName);
    })

    socket.on("clientMessage",({roomName,message,user})=>{
        socket.to(roomName).emit("response",{message,user});
    })
    


    console.log("a user is connected...");


    socket.on("disconnect",()=>{
        console.log("user disconnected...");
    })
})
server.listen(8000,()=>{console.log("server started...")});