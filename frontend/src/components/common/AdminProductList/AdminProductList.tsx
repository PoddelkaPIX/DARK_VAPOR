import { FC, useState } from "react";
import st from "./AdminProductList.module.scss"
import { IProductAndType } from "../../../pages/Admin/Admin";
import { AddProductInDataBaseModal } from "../../../modals/AddProductInDataBaseModal/AddProductInDataBaseModal";
import axios from "axios";
import { AdminProductCard } from "../../cards/AdminProductCard/AdminProductCard";
import config from "../../../config.json"
import { ConfirmDialog } from "../ConfirmDialog/ConfirmDialog";

interface PropTypes{
    list: IProductAndType
    flagUpdate: ()=>void
}

export const AdminProductList: FC<PropTypes>=({list, flagUpdate}) => {
    const [addProductModal, setAddProductModal] = useState(false)
    const [confirmDialogDelete, setConfirmDialogDelete] = useState(false)
    if (addProductModal){
        document.body.style.overflowY = "hidden"
    }else{
        document.body.style.overflowY = "unset"
    }
   
    function deleteType(){
        const typeId = list.type_id.toString()
        let url = config.backend + "/deleteType"
        let body = {"type_id": typeId}
        axios({
            method: 'post',
            url: url,
            data: body,
            headers: { "Content-Type": "application/json" },
        })
        .then(function (response) {
            flagUpdate()
            console.log(response);
        })
        .catch(function (error) {
            console.log(error);
        });
    }
    return (
        <div className={st["list"]}>
            {list.title_type !== undefined && <div className={st["type"]}>
                {list.title_type} - {list.title_category}
                <button onClick={()=>setAddProductModal(true)} className={st["add-button"]}> <i className="fa fa-plus"></i></button>
                <button className={st["button-trash"]} onClick={()=>{setConfirmDialogDelete(true)}}><i className="fa-solid fa-trash"></i></button>
            </div>}
            {list.products.map((product, index)=>
                <AdminProductCard  key={index} product={product} flagUpdate={()=>flagUpdate()}/>
            )}
            {confirmDialogDelete && <ConfirmDialog onClose={()=>setConfirmDialogDelete(false)} question="Удалить товар?" confirme={deleteType}/>}
            {addProductModal && <AddProductInDataBaseModal flagUpdate={()=>flagUpdate()} typeId={list.type_id.toString()} onClose={()=>setAddProductModal(false)}/>}
        </div>
    )
}