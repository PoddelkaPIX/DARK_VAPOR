import { FC, useState } from "react"
import st from "./Main.module.scss"
import { Liquids } from "./windows/Liquids/Liquids"
import { CottonAndKoils } from "./windows/CottonAndKoils/CottonAndKoils"
import { Merchandising } from "./windows/Merchandising/Merchandising"
import { IProduct } from "../../App"

interface PropTypes {
    authorized: boolean
    setProducts: (item: IProduct)=>void
}

export const Main: FC<PropTypes>= ({authorized, setProducts }) => {
    const [window, setWindow] = useState("Liquds")
    return (
        <main>
            <div id={st["wrapper"]}>
                <strong id={st["wrapper-title"]}>DARK VAPOR</strong>
                <div id={st["wrapper-slogan"]}>
                    <strong>Аутентичные табачные жидкости</strong>
                    <div>TAX FREE TOBACCO & LE ELIXIR</div>
                </div>
                <div id={st["wrapper-actions"]}>
                    <input type="radio" name="switch-radio" id="radio1" defaultChecked={window === "Liquds"}/>
                    <label htmlFor="radio1" className={st["switch-product"]} id={st["switch-product-Liquds"]} onClick={() => setWindow("Liquds")}> Жидкости</label>
                    <input type="radio" name="switch-radio" id="radio2" defaultChecked={window === "CottonAndKoils"}/>
                    <label htmlFor="radio2" className={st["switch-product"]} id={st["switch-product-CottonAndKoils"]} onClick={() => setWindow("CottonAndKoils")}> Вата и коилы</label>
                    <input type="radio" name="switch-radio" id="radio3" defaultChecked={window === "Merchandising"}/>
                    <label htmlFor="radio3" className={st["switch-product"]} id={st["switch-product-Merchandising"]} onClick={() => setWindow("Merchandising")}> Мерч</label>
                </div>
            </div>
            {window === "Liquds" &&  <Liquids setProducts={setProducts}/>}
            {window === "CottonAndKoils" &&  <CottonAndKoils setProducts={setProducts}/>}
            {window === "Merchandising" &&  <Merchandising setProducts={setProducts}/>}
        </main>
    )
}