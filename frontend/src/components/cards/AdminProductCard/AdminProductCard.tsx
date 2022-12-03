import { FC } from "react";
import st from "./AdminProductCard.module.scss"
import { useState } from "react";
import axios from "axios";
import { EditProductModal } from "../../../modals/EditProductModal/EditProductModal";
import config from "../../../config.json"
import { IProduct } from "../../../interfaces";
import { ConfirmDialog } from "../../common/ConfirmDialog/ConfirmDialog";
import { Modal } from "../../common/Modal/Modal";
interface PropTypes{
    product: IProduct
    flagUpdate: ()=>void
}

export const AdminProductCard: FC<PropTypes>=({product, flagUpdate}) => {
    const [editProductModal, setEditProductModal] = useState(false)
    const [confirmDialogDelete, setConfirmDialogDelete] = useState(false)

    function deleteProduct(){
        const productId = product.product_id.toString()
        let url = config.backend + "/deleteProduct"
        let body = {"product_id": productId}
        axios({
            method: 'post',
            url: url,
            data: body,
            headers: { "Content-Type": "application/json" },
        })
        .then(function (response) {
            flagUpdate()
        
            if (response.data.error){
                alert(String(response.data.error))
            }
        })
        .catch(function (error) {
            console.log(error);
            alert(String(error))

        });
    }
    
    return (
        <div className={st["product-card"]}>
            <div className={st["product-card-title"]}>{product.title_product}</div>
            <div className={st["product-card-price"]}>{product.price} ₽</div>
            <div className={st["product-card-description"]}>{product.description}</div>
            <div>
                <button className={st["button-edit"]} onClick={()=>setEditProductModal(true)}><i className="fa-solid fa-pen"></i></button>
                <button className={st["button-trash"]} onClick={()=>setConfirmDialogDelete(true)}><i className="fa-solid fa-trash"></i></button>
            </div>
            {editProductModal && 
                <Modal onClose={()=>setEditProductModal(false)} closingBackground={true} cross={true}>
                    <EditProductModal flagUpdate={()=>flagUpdate()} product={product} onClose={()=>setEditProductModal(false)}/>
                </Modal>
                }
            {confirmDialogDelete && <ConfirmDialog onClose={()=>setConfirmDialogDelete(false)} question="Удалить товар?" confirmed={deleteProduct}/>}

        </div>
    )
}