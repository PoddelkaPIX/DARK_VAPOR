import { FC } from "react";
import { Modal } from "../Modal/Modal";
import st from "./ConfirmDialog.module.scss"
interface props{
    onClose: ()=>void
    title?: string
    question: string
    confirmed: ()=>void
    confirmButton?: string
    cancelButton?: string
}

export const ConfirmDialog: FC<props> = ({onClose, question, confirmButton, cancelButton, title, confirmed})=>{
    document.body.style.overflowY = "hidden"
    return (
        <Modal onClose={()=>{document.body.style.overflowY = "unset"; onClose()}}>
            <div id={st["confirm-dialog"]}>
                {title && <strong>{title}</strong>}
                <div>{question}</div>
                <div id={st["buttons"]}>
                    <button onClick={()=>{confirmed(); onClose()}} id={st["confirm-button"]}>{confirmButton?confirmButton:"Подтвердить"}</button>
                    <button onClick={onClose} id={st["cancel"]}>{cancelButton?cancelButton:"Отмена"}</button>
                </div>
            </div>
        </Modal>
    )
}