import axios from "axios";
import { FC, useEffect, useState } from "react";
import { Modal } from "../../components/common/Modal/Modal";
import { IInformation, IOrder } from "../../interfaces";
import config from "../../config.json"


interface PropTypes{
    onClose: ()=>void
    order: IOrder
}

export const CreatingReceiptModal: FC<PropTypes>=({onClose, order}) => {
    useEffect(()=>{
    }, [])
    return (
        <Modal onClose={onClose} closingBackground={true}>
            <div>
                <button>Готово</button>
            </div>
        </Modal>
    )
}