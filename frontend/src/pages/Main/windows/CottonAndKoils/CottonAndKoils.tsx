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
    const [cottonList, setCottonList ] = useState<IProduct[]>([
        {
            "id": 1,
            "title": "Вата мягкая",
            "price": 500,
            "count": -1, 
            "type": "Вата",
            "description": "Клубничный джем с классическим кофе и ирисом",
        },
        {
            "id": 2,
            "title": "Вата плотная",
            "price": 200,
            "count": -1, 
            "type": "Вата",
            "description": "Яблочный джем",
        }
    ])
    const [koilList, setKoilList ] = useState<IProduct[]>([
        {
            "id": 3,
            "title": "Коил металлический",
            "price": 2000,
            "count": -1, 
            "type": "Коилы",
            "description": "Лёгкая тяга",
        },
    ])

    // useEffect(()=>{
    //     fetch("http://localhost:8000/cottons").then(res=>res.json()).then((result)=>setCottonList(result))
    //     fetch("http://localhost:8000/koils").then(res=>res.json()).then((result)=>setKoilList(result))
    // })

    return (
        <ProductList data={[cottonList, koilList]} setProducts={(item: IProduct)=>setProducts(item)}/>
    )
}