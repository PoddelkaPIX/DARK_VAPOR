import { FC, useEffect, useState } from "react"
import st from "./Admin.module.scss"
import { AddTypeModal } from "../../modals/AddTypeModal/AddTypeModal"
import { AdminProductList } from "../../components/common/AdminProductList/AdminProductList"
import config from "../../config.json"
import { IProduct } from "../../structs"
import { ConfirmDialog } from "../../components/common/ConfirmDialog/ConfirmDialog"

export interface IParameter{
    parameter_id: number
    title_parameter: string
    group: string
    
}
export interface ITokken{
    access_token: string
    token_type: string
    expires_in: number
    scope: string
    jti: string
}
export interface IProductAndType{
    title_category: string
    title_type: string
    category_id: number
    type_id: number
    products: IProduct[]
}

interface PropTypes{
    authorized: boolean
}

export const Admin: FC<PropTypes> = ({authorized}) => {   
    const [addTypeModal, setAddTypeModal] = useState(false)
    const [confirmDialogAddType, setConfirmDialogAddType] = useState(false)

    const [productList, setProductList ] = useState<IProductAndType[]>([])
    const [flagUpdate, setFlagUpdate ] = useState(1)
    
    useEffect(()=>{
        fetch(config.backend.host + config.backend.port + "/products").then(res=>res.json()).then((result)=>setProductList(result))   
    }, [flagUpdate])
   
    return (
        <main>
            <div id={st["content"]}>
                <div id={st["type-title"]}>Типы <button className={st["add-button"]} onClick={()=>setAddTypeModal(true)}>+</button></div>
                <div id={st["product-list"]}>
                    {productList.map((list, index) => <AdminProductList key={index} list={list} flagUpdate={()=>setFlagUpdate(flagUpdate*-1)} />)}
                </div>
            </div>
            {addTypeModal && <AddTypeModal onClose={()=>setAddTypeModal(false)} flagUpdate={()=>setFlagUpdate(flagUpdate*-1)}/>}
        </main>
    )
}