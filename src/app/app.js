import React,{useState} from 'react'
import Main from './Components/main'
import './styles/global.css'
import Chat from './Components/Chat'

const InitialForm ={
    Username:"",
    Namesala:""
}

const App = ()=>{
    const [modo, setModo] = useState('MAIN') //main, create,join,chat
    const [form, setForm] = useState(InitialForm);
    return(
        <>
            <div className="BG CENTER">
                {modo== "CHAT" 
                ? <Chat form={form} modo={modo} setModo= {setModo}/> 
                :<Main modo={modo} setModo= {setModo} form={form} setForm={setForm} />
                }
            </div>
        </>
    )
}

export default App;