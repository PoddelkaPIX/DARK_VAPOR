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
    setData(
        [{
            "id": 1,
            "title": "TESTY",
            "price": 5,
            "description": "Клубничный джем с классическим кофе и ирисом",
            "count": -1, 
            "type": "Жидкости",
            "strengths": {
                "title": "Крепость",
                "values": [
                    {"title": "0", "value": 0},
                    {"title": "1.5", "value": 1.5},
                    {"title": "3", "value": 3},
                    {"title": "4.5", "value": 4.5},
                    {"title": "6", "value": 6},
                    {"title": "9", "value": 9},
                    {"title": "12", "value": 12},
                ]
            },
            "salts": [
                {"title": "10", "value": 10},
                {"title": "20", "value": 20},
            ]
        },
        {
            "id": 2,
            "title": "TOXIC",
            "price": 2,
            "description": "Яблочный джем",
            "count": -1, 
            "type": "Жидкости",
            "strengths": {
                "title": "Крепость",
                "values": [
                    {"title": "0", "value": 0},
                    {"title": "1.5", "value": 1.5},
                    {"title": "3", "value": 3},
                    {"title": "4.5", "value": 4.5},
                ]
            },
            "salts": [
                {"title": "10", "value": 10},
                {"title": "20", "value": 20},
            ]
        }]
    )
    return (
        <ProductList data={[data]} setProducts={(item: IProduct)=>setProducts(item)}/>
    )
}


