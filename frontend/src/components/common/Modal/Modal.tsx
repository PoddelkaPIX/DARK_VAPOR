import React from 'react';
import st from './Modal.module.scss'
import { FC } from "react";

interface PropTypes {
    onClose: () => void
    cross?: boolean
    closingBackground?: boolean
    children: React.ReactNode
}

export const Modal: FC<PropTypes> = ({onClose, children, cross=false, closingBackground=false}) =>{
    document.body.style.overflowY = "hidden"
    return (
        <>
        {closingBackground ? <div className={st["modal"]} onClick={()=>{document.body.style.overflowY = "unset"; onClose()}} /> :  <div className={st["modal"]}/>}
        <div className={st["modal-content"]}>
            {cross && <button className={st['cross']} onClick={()=>{document.body.style.overflowY = "unset"; onClose()}}><i className="fa fa-xmark"></i></button>}
            {children }
        </div>
        </>     
    )
}