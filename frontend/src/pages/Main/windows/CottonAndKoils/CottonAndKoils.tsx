import { FC, useEffect, useState } from "react"
import { IProduct } from "../../../../App"
import { ProductCard } from "../../../../components/cards/ProductCard/ProductCard"
import { ProductList } from "../../../../components/common/ProductList/ProductList"
import { Search } from "../../../../components/common/Search/Search"
import st from "./CottonAndKoils.module.scss"

interface PropTypes{
    setProducts: (item: IProduct)=>void
}

export const CottonAndKoils: FC<PropTypes>= ({setProducts}) => {
    const [cottonList, setCottonList ] = useState<IProduct[]>([])
    const [koilList, setKoilList ] = useState<IProduct[]>([])

    useEffect(()=>{
        fetch("http://localhost:8000/cottons").then(res=>res.json()).then((result)=>setCottonList(result))
        fetch("http://localhost:8000/koils").then(res=>res.json()).then((result)=>setKoilList(result))
    })
    
    return (
        <ProductList data={[cottonList, koilList]} setProducts={(item: IProduct)=>setProducts(item)}/>
    )
}