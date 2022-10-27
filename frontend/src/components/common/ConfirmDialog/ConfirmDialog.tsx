import { FC } from "react";
import { Modal } from "../Modal/Modal";
import st from "./ConfirmDialog.module.scss"
interface props{
    onClose: ()=>void
    question: string
    confirme: ()=>void
}

export const ConfirmDialog: FC<props> = ({onClose, question, confirme})=>{
    return (
        <Modal onClose={onClose}>
            <div id={st["confirm-dialog"]}>
                <div>{question}</div>
                <div id={st["buttons"]}>
                    <button onClick={()=>{confirme(); onClose()}} id={st["confirm-button"]}>Подтвердить</button>
                    <button onClick={onClose} id={st["cancel"]}>Отмена</button>
                </div>
            </div>
        </Modal>
    )
}