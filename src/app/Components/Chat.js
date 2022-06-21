import React,{useEffect,useState,useRef} from 'react'
import io from 'socket.io-client'
import '../styles/global.css'
import SMS from './sms'


const Default = {
    id: "0",
    User: "ADMIN",
    message: "Bienvenido a Cloudsend",
    hour: "",
    person: "other"
}

const obtenerHora = () =>{
    let hour = ""
    let hora = (new Date()).getHours()
    let minuto = (new Date()).getMinutes()
    if(hora >12) hour = `${hora - 12}:${minuto} PM`
    else hour =  `${hora}:${minuto} AM`
    return hour
}
const Chat = (props)=>{
    const [active, setActive] = useState(true)
    const [message, setMessage] = useState('')
    const [mensajes, setMensajes] = useState([Default])
    const [users, setUsers] = useState()
    const messagesEndRef = useRef(null)
    let client = io("https://tunkay-chat.herokuapp.com/") 

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }

    useEffect(()=>{
        if(active){
            client.emit('new User',{
                nameSala: props.form.Namesala.toUpperCase(),
                user: props.form.Username
            })      
        }
        setActive(false)
        client.on('new user connected',(data)=>{
            let hour = obtenerHora()
            let sms = {
                id: Date.now(),
                User: data.userConnected,
                message: "ENTRO A LA SALA",
                hour: hour,
                person: "join"
            }
            setMensajes((msj)=> [...msj,sms])
            setUsers(data.users)
            scrollToBottom()
        })
        client.on('new message',(data)=>{
            let sms = {
                id: Date.now(),
                User: data.userName,
                message: data.mensaje,
                hour: data.hour,
                person: "other"
            }
            if(sms.User == props.form.Username) sms.person = "me"
            setMensajes((msj)=> [...msj,sms])
            scrollToBottom()
        })
        client.on('user disconect',(data)=>{
            setUsers(data.users)
            let hour = obtenerHora()
            let sms = {
                id: Date.now(),
                User: data.userDisconnect,
                message: "SALIO DE LA SALA",
                hour: hour,
                person: "exit"
            }
            setMensajes((msj)=> [...msj,sms])
            scrollToBottom()
        })
    },[])

    
    const sendMessage = ()=>{
        let hour = obtenerHora()
        client.emit('message',{
            userName: props.form.Username,
            idSala: props.form.Namesala,
            mensaje: message,
            hour: hour,
            state: "me"
        })
        setMessage('')
    }

    const handleChange = (e)=>{
        setMessage(e.target.value)
    }

    return(
        <div className="main CENTER column chat">
            <div className="Header-Chat CENTER">
                <span className="Exit" onClick={()=>props.setModo("MAIN")}>
                    <i className="fas fa-times-circle fa-2x"></i>
                </span>
                <h2>SALA: {props.form.Namesala}</h2>
                <span>
                    <i className="fas fa-users"></i>
                    {users}
                </span>
            </div>
            <div className="Messages-Chat">
                {mensajes.map((item) => <SMS key={item.id} data={item}/>)}
                <div ref={messagesEndRef} />
            </div>
            <div className="Send-Chat CENTER">
                <input 
                className="input sin-upper" 
                placeholder="Escribe un mensaje: " 
                onChange={handleChange} 
                value={message}
                ></input>
                <button className="btn" onClick={sendMessage}>SEND</button>
            </div>
        </div>
    )
}

export default Chat