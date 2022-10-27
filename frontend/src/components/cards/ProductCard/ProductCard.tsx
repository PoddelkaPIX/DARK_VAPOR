import { FC } from "react";
import st from "./ProductCard.module.scss"
import { useState } from "react";
import { Modal } from "../../../components/common/Modal/Modal";
import { AddProductModal } from "../../../modals/AddProductModal/AddProductModal";
import { IProduct } from "../../../structs";

interface PropTypes{
    product: IProduct
    setProducts: (item: IProduct)=>void
}

export const ProductCard: FC<PropTypes>=({product, setProducts}) => {
    const [showAddItemModal, setShowAddItemModal] = useState(false);
    function addItemToBasket(){
        setShowAddItemModal(true)
    }
    if (showAddItemModal){
        document.body.style.overflowY = "hidden"
    }else{
        document.body.style.overflowY = "unset"
    }
    return (
        <div className={st["product-card"]}>
                    <div className={st["product-card-title"]}>{product.title_product}</div>
                    <div className={st["product-card-price"]}>{product.price} ₽</div>
                    <div className={st["product-card-description"]}>{product.description}</div>
                    <button className={st["button-in-basket"]} onClick={addItemToBasket}>В КОРЗИНУ</button>
                    {showAddItemModal && 
                        <Modal closingBackground={true} onClose={() => setShowAddItemModal(false)}>
                            <AddProductModal onClose={()=>setShowAddItemModal(false)} product={product} setProducts={(item:IProduct)=>setProducts(item)}></AddProductModal>
                        </Modal>}
                </div>)
}