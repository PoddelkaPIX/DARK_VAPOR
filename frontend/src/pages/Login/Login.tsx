import { FC, useState } from "react"
import st from "./Login.module.scss"
import axios from "axios"
import config from "../../config.json"

interface PropTypes {
    authorized: boolean
}
export const Login: FC<PropTypes>= ({authorized}) => {
    const [login, setLogin] = useState("")
    const [password, setpassword] = useState("")
    function logOut(){
        document.cookie = "vapor=logout;expires=0";
        window.location.replace("/")
    }
    function complite(){
        let url = config.backend + "/login"
        let body = {"login": login, "password": password}
        axios({
            method: 'post',
            url: url,
            data: body,
            headers: { "Content-Type": "application/json" },
        })
        .then(function (response: any) {
            if (response.data.password !== null){
                var cookie_date = new Date();
                cookie_date.setMonth(cookie_date.getFullYear() + 1);
                document.cookie = "vapor="+ response.data.password+";expires=" + cookie_date.toUTCString();
                window.location.replace("/")
            }
        })
        .catch(function (error) {
            console.log(error);
        });
    }
    return (
        <main>
           <div id={st["content"]}>
                <div id={st["forma"]}>
                        {authorized ? 
                        <button onClick={logOut}>Выйти</button>
                        :
                        <><label>
                            Логин:
                            <input type="text" onChange={(e)=>setLogin(e.target.value)}/>
                        </label>
                        <label>
                            Пароль:
                            <input type="text" onChange={(e)=>setpassword(e.target.value)}/>
                        </label>
                        <button onClick={complite}>Войти</button></>
                        }
                </div>
           </div>
        </main>
    )
}