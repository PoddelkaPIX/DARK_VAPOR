import { FC } from "react"
import { IProduct } from "../../../../App"
import st from "./Merchandising.module.scss"

interface PropTypes{
    setProducts: (item: IProduct)=>void
}

export const Merchandising: FC<PropTypes>= () => {
    return (
        <div id={st["content"]}>
            <div id={st["product-list"]}>
            </div>
        </div>
    )
}