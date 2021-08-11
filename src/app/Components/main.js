import React,{useEffect,useState} from 'react'
import '../styles/global.css'


const Main = (props)=>{
    const {form, setForm} = props
    const [err, setErr]= useState('')

    const handleChange = (e)=>{
        setErr('')
        setForm({...form,[e.target.name]:e.target.value})
    }
    const handleClick = (e)=>{
        if(form.Namesala.length >=3 && form.Username.length >=3){
            props.setModo('CHAT')
            form.Namesala = form.Namesala.toUpperCase()
        }else{
            if(form.Username.length <3){
                props.setModo('MAIN')
                setErr('Ingresa un nombre de usuario mayor a 3 digitos')
            }else{
                setErr('Ingresa el nombre de la sala ')
            }
        }
    }

    return(
        <div className="main CENTER column">
            <h1>TUNKAY.SMS</h1>
            {props.modo == "MAIN" && 
                <>
                    <input
                    className="input sin-upper" 
                    type="text" 
                    placeholder="Username: " 
                    name="Username" 
                    value={form.Username} 
                    onChange={handleChange}>
                    </input>
                    <div>
                        <button className="btn" type="submit" onClick={()=> props.setModo("JOIN")}>Join Chat</button>
                        <button className="btn" type="submit" onClick={()=> props.setModo("CREATE")}>Create Chat</button>
                        <br></br>
                        <span className="ERROR">{err}</span>
                    </div>
                </>
            }
            {props.modo == "JOIN" &&
            <>
                <span className="Exit" onClick={()=>props.setModo("MAIN")}>
                    <i className="fas fa-times-circle fa-2x"></i>
                </span>
                <input 
                className="input"
                type="text" 
                placeholder="Nombre de la Sala: " 
                name="Namesala" 
                value={form.Namesala} 
                onChange={handleChange}>
                </input>
                <button className="btn" type="submit" onClick={handleClick}>JOIN</button>
                <span className="ERROR">{err}</span>
            </>              
            }
            {props.modo == "CREATE" &&
            <>
                <span className="Exit" onClick={()=>props.setModo("MAIN")}>
                <i className="fas fa-times-circle fa-2x"></i>
                </span>
                <input 
                className="input"
                type="text" 
                placeholder="Nombre de la Sala: " 
                name="Namesala" 
                value={form.Namesala} 
                onChange={handleChange}>
                </input>
                <button className="btn" type="submit" onClick={handleClick}>CREATE</button>
                <span className="ERROR">{err}</span>
            </>              
            }
        </div>
    )
}

export default Main