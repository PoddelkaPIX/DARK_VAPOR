import { FC } from "react";
import { IProduct } from "../../../App";
import { ProductCard } from "../../cards/ProductCard/ProductCard";
import { Search } from "../Search/Search";
import st from "./ProductList.module.scss"

interface PropTypes{
   data: IProduct[][]
   setProducts: (item:IProduct)=>void
}

export const ProductList: FC<PropTypes>=({data, setProducts}) => {
    return (
        <div id={st["content"]}>
            <Search placehold="Поиск" width="200px"></Search>

            <div id={st["product-list"]}>
                {data.map((list, index) => <div className={st["list"]} key={index}>
                    {list[0] !== undefined && <div className={st["category"]}>{list[0].type}</div>}
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