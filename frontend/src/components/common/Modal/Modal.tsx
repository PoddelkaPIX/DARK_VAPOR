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
    return (
        <>
        {closingBackground ? <div className={st["modal"]} onClick={onClose} /> :  <div className={st["modal"]}/>}
        <div className={st["modal-content"]}>
            {cross && <button className={st['cross']} onClick={onClose}><i className="fa fa-xmark"></i></button>}
            {children }
        </div>
        </>     
    )
}