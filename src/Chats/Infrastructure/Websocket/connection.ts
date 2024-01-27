import { Server } from 'socket.io';

export function connectToSocket(server){
    const io = new Server(server, {
        pingTimeout: 60000,
        cors: {
            origin: process.env.FRONTEND_URL
        }});

    io.on('connection', (socket) => {
        console.log('a user connected');

        socket.on("Connected User", (userId) => {
            if(userId != null){
                socket.join(userId)
            }
        })
    
        socket.on("Send Message", (message) => {
            const sender = message.sender;
            const receiver = message.receiver;
            socket.to(receiver).to(sender).emit("Message sent", message)
        })
    
        // Cuando llegue este mensaje se publicará un mensaje para el receiver y el sender
        // y se enviará un mensaje con el chat actualizado con su último mensaje
        socket.on("Update Messages Status", (message) => {
            const sender = message.sender;
            const receiver = message.receiver;
            message.readed = true;
            socket.to(receiver).to(sender).emit("Message Chat Status Updated", message)
        })
    });

    return io;
}