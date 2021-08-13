const app = require('./app.js')
const colors = require('colors')

const server = app.listen(app.get('port'), ()=>{
    console.log('server on port: ',app.get('port'))
})


const io = require('socket.io')(server)

function getRooms(io,sala) {
    const rooms = Array.from(io.sockets.adapter.rooms);
    let list_users = [];
            
    rooms.forEach(room => {
        if(room[0] == sala){
            room[1].forEach(e => list_users.push(e))
        }
        
    });
    return list_users.length
}

io.on('connection',(client) =>{
    client.on('new User', (data)=>{
        console.log(colors.green("Un nuevo usuario se conecto: ", data.user))

        /*--------GUARDAR DATOS EN EL SOCKET-------*/
        client.data.username = data.user
        client.data.nameSala = data.nameSala
        /*------------------------------------------*/
        client.join(data.nameSala)

        let rooms = getRooms(io,data.nameSala)

        client.emit('new user connected',{
            userConnected: data.user,
            users: rooms
        })

        client.to(data.nameSala).emit('new user connected',{
            userConnected: data.user,
            users: rooms
        })
    })

    client.on('message', (data)=>{
        client.to(data.idSala).emit('new message',{
            userName: data.userName,
            idSala: data.idSala,
            mensaje: data.mensaje,
            hour: data.hour,
            state: data.state
        })
    })

    client.on('disconnect', ()=>{
        //console.log(colors.red("EL usuario: ", client.data.username, " se desconecto"))
        let rooms = getRooms(io,client.data.nameSala)
        client.to(client.data.nameSala).emit('user disconect',{
            userDisconnect: client.data.username,
            users: rooms
        })
        client.leave(client.data.nameSala)
    })
})
