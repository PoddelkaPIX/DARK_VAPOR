import { FC, useEffect, useState } from "react"
import st from "./Main.module.scss"
import { ProductList } from "../../components/common/ProductList/ProductList"
import config from "../../config.json"
import { IProduct } from "../../interfaces"
import 'react-dadata/dist/react-dadata.css';
import { ConfirmDialog } from "../../components/common/ConfirmDialog/ConfirmDialog"

interface PropTypes {
    authorized: boolean
    setProducts: (item: IProduct)=>void
}

export const Main: FC<PropTypes>= ({authorized, setProducts }) => {
    const [categorywindow, setCategoryWindow] = useState(1)
    const [confirmAge_18_Dialog, setConfirmAge_18_Dialog] = useState(false)
    const [confirmAge_18, setConfirmAge_18] = useState(false)

    const [data, setData] = useState<IProduct[][]>([])
    function confirmed(){
        var cookie_date = new Date();
        cookie_date.setMonth(cookie_date.getFullYear() + 1);
        document.cookie = "vapor-age=yes;expires=" + cookie_date.toUTCString();
        window.location.reload();
    }
    function checkAge18(){
        let results = document.cookie.match(/vapor-age=(.+?)(;|$)/);
        if (results === null){
            return false
        }else{
            return true
        }
    }
    useEffect(()=>{
        fetch(config.backend + "/productsByCategory/"+categorywindow).then(res=>res.json()).then((result)=>setData(result))
        if (checkAge18()){
            setConfirmAge_18(true)
        }else{
            setConfirmAge_18_Dialog(true)
        }
    }, [categorywindow])
    return (
        <main>
            {confirmAge_18 &&
            <>
                <div id={st["wrapper"]}>
                <strong id={st["wrapper-title"]}>DARK VAPOR</strong>
                <div id={st["wrapper-slogan"]}>
                    <strong>Аутентичные табачные жидкости</strong>
                    <div>TAX FREE TOBACCO & LE ELIXIR</div>
                </div>
                <div id={st["wrapper-actions"]}>
                    <input type="radio" name="switch-radio" id="radio1" defaultChecked={categorywindow === 1}/>
                    <label htmlFor="radio1" className={st["switch-product"]} id={st["switch-product-Liquds"]} onClick={() => setCategoryWindow(1)}> Жидкости</label>
                    <input type="radio" name="switch-radio" id="radio2" defaultChecked={categorywindow === 2}/>
                    <label htmlFor="radio2" className={st["switch-product"]} id={st["switch-product-CottonAndKoils"]} onClick={() => setCategoryWindow(2)}> Вата и коилы</label>
                    <input type="radio" name="switch-radio" id="radio3" defaultChecked={categorywindow === 3}/>
                    <label htmlFor="radio3" className={st["switch-product"]} id={st["switch-product-Merchandising"]} onClick={() => setCategoryWindow(3)}> Мерч</label>
                </div>
            </div>
            <ProductList data={data} setProducts={(item: IProduct)=>setProducts(item)}/>
        </>
        } 
            {confirmAge_18_Dialog && <ConfirmDialog onClose={()=>{window.history.back(); setConfirmAge_18_Dialog(false)}} confirmButton="Есть" cancelButton="Нет" confirmed={()=>confirmed()} question="Вам есть 18 лет?"></ConfirmDialog>}
        </main>
    )
}