import { FC, useEffect, useState } from "react"
import st from "./Main.module.scss"
import { ProductList } from "../../components/common/ProductList/ProductList"
import config from "../../config.json"
import { IProduct } from "../../structs"
import 'react-dadata/dist/react-dadata.css';

interface PropTypes {
    authorized: boolean
    setProducts: (item: IProduct)=>void
}

export const Main: FC<PropTypes>= ({authorized, setProducts }) => {
    const [window, setWindow] = useState(1)
    const [data, setData] = useState<IProduct[][]>([])
    useEffect(()=>{
        document.body.style.overflowY = "unset"
        fetch(config.backend.host + config.backend.port + "/productsByCategory/"+window).then(res=>res.json()).then((result)=>setData(result))
       
    }, [window])
    return (
        <main>
            <div id={st["wrapper"]}>
                <strong id={st["wrapper-title"]}>DARK VAPOR</strong>
                <div id={st["wrapper-slogan"]}>
                    <strong>Аутентичные табачные жидкости</strong>
                    <div>TAX FREE TOBACCO & LE ELIXIR</div>
                </div>

                <div id={st["wrapper-actions"]}>
                    <input type="radio" name="switch-radio" id="radio1" defaultChecked={window === 1}/>
                    <label htmlFor="radio1" className={st["switch-product"]} id={st["switch-product-Liquds"]} onClick={() => setWindow(1)}> Жидкости</label>
                    <input type="radio" name="switch-radio" id="radio2" defaultChecked={window === 2}/>
                    <label htmlFor="radio2" className={st["switch-product"]} id={st["switch-product-CottonAndKoils"]} onClick={() => setWindow(2)}> Вата и коилы</label>
                    <input type="radio" name="switch-radio" id="radio3" defaultChecked={window === 3}/>
                    <label htmlFor="radio3" className={st["switch-product"]} id={st["switch-product-Merchandising"]} onClick={() => setWindow(3)}> Мерч</label>
                </div>
            </div>
            <ProductList data={data} setProducts={(item: IProduct)=>setProducts(item)}/>
        </main>
    )
}