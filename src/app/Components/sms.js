import React from 'react'
import '../styles/global.css'

const SMS = (props) =>{
    
    return(
        <>
            {props.data.person == "other" ?
                <div className="CONTEINER">
                    <div className="sms">
                        <div className="CENTER Info-Chat">
                            <span>{props.data.User}</span>
                            <span>{props.data.hour}</span>   
                        </div>
                        <p className="Bg-Parrafo">{props.data.message}</p>
                    </div>
                </div>
            :
            <>
                {props.data.person == "exit" || props.data.person == "join" ?
                    <div className="CONTEINER CENT">
                        <div className={`sms ${props.data.person}`}>
                            <div className="CENTER Info-Chat">
                                <span>{props.data.User}</span>
                                <span>{props.data.hour}</span>   
                            </div>
                            <p className="Bg-Parrafo">{props.data.message}</p>
                        </div>
                    </div>
                :
                <div className={`CONTEINER REVERSE`}>
                    <div className={`sms me`}>
                        <div className="CENTER Info-Chat">
                            <span>{props.data.User}</span>
                            <span>{props.data.hour}</span>   
                        </div>
                        <p className="Bg-Parrafo">{props.data.message}</p>
                    </div>
                </div>
                }
            </>
            }
        </>
    )
}

export default SMS