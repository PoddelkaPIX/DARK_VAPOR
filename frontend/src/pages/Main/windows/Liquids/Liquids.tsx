import st from "./Liquids.module.scss"

import { FC, useEffect, useState } from "react";
import { IProduct } from "../../../../App";
import { ProductList } from "../../../../components/common/ProductList/ProductList";

interface PropTypes{
    setProducts: (item: IProduct)=>void
}

export const Liquids: FC<PropTypes> = ({setProducts}) => {
    const [data, setData] = useState<IProduct[]>([])
    useEffect(()=>{
        fetch("http://localhost:8000/liquids").then(res=>res.json()).then((result)=>setData(result))
    })
    return (
        <ProductList data={[data]} setProducts={(item: IProduct)=>setProducts(item)}/>
    )
}


