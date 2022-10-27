import { FC } from "react";
import { IProduct } from "../../../structs";
import { ProductCard } from "../../cards/ProductCard/ProductCard";
import st from "./ProductList.module.scss"

interface PropTypes{
   data: IProduct[][]
   setProducts: (item:IProduct)=>void
}

export const ProductList: FC<PropTypes>=({data, setProducts}) => {
    return (
        <div id={st["content"]}>
            <div id={st["product-list"]}>
                {data.map((list, index) => <div className={st["list"]} key={index}>
                    {list[0] !== undefined && <div className={st["type"]}>{list[0].title_type}</div>}
                    {list.map((product, index)=>
                        <ProductCard    key={index}
                                        product ={product}
                                        setProducts={(item:IProduct)=>setProducts(item)}></ProductCard>
                    )}
                </div>)}
            </div>
        </div>
    )
}