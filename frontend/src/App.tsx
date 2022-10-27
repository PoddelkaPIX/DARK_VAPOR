import { Navigate, Route, Routes } from 'react-router-dom';
import { Main } from './pages/Main/Main';
import { Admin } from './pages/Admin/Admin';
import { Header } from './components/common/Header/Header';
import { useEffect, useState } from 'react';
import { Login } from './pages/Login/Login';
import { Orders } from './pages/Orders/Orders';
import config from "./config.json"
import axios from 'axios';
import { IBasket, IProduct } from './structs';

function App() {
  const [authorized, setAuthorized] = useState(false)
  const [basket, setBasket] = useState<IBasket>({products: [], total_amount: 0})

  function calculateTotalAmount(products: IProduct[]): number{
    let c = 0
        for (let i of products){
            if (i.count !== undefined){
                c += i.price * i.count
            }
        }
        return c
  }
  function addProductInBasket(item: IProduct){
    basket.products.push(item)
    setBasket({products: [...basket.products], total_amount: calculateTotalAmount(basket.products)})
  
  }

  function deleteProductInBasket(index: number){
    basket.products.splice(index, 1);
    setBasket({products: [...basket.products], total_amount: calculateTotalAmount(basket.products)})
  }
  function changeBasketProductCount(index: number, newCount: number){
    basket.products[index].count = newCount
    setBasket({products: [...basket.products], total_amount: calculateTotalAmount(basket.products)})

  }

  function getCookie(){
    let results = document.cookie.match(/vapor=(.+?)(;|$)/);
    if (results !== null){
      return results[1]
    }
    return ""
  }
  useEffect(()=>{
    let url = config.backend.host + config.backend.port+ "/authorized"
    var results = getCookie()
    
    if (results?.length !== 0){
      let body = {"password": results}
      axios({
          method: 'post',
          url: url,
          data: body,
          headers: { "Content-Type": "application/json" },
      })
      .then(function (response: any) {
        setAuthorized(response.data.authorized)
      })
      .catch(function (error) {
          console.log(error);
      });
    }
  }, [])
  
  return (
   <>
      <Header authorized={authorized} basket={basket} 
        setProducts={(item: IProduct)=>addProductInBasket(item)} 
        changeBasketProductCount={(index:number, newCount:number)=>changeBasketProductCount(index, newCount)}
        deleteProductInBasket={deleteProductInBasket}/>
        <Routes> 
          <Route path="/" element={<Main authorized={authorized} setProducts={(item: IProduct)=>addProductInBasket(item)}/>} />
          <Route path="/login" element={<Login authorized={authorized} />} />
          <Route path="*" element={<Navigate to="/" />} />
          {authorized && <>
            <Route path="/admin" element={<Admin authorized={authorized}/>} />
            <Route path="/orders" element={<Orders authorized={authorized}/>} />
          </>}
        </Routes>
    </>  
  );
}
export default App;


export function Send(method: string, url: string, data: object) {
  let xhr = new XMLHttpRequest();
  xhr.open(method, url, false);
  let res

  xhr.onload = function (event) {
      res = JSON.parse(this.response)
  }

  if (data) {
      xhr.setRequestHeader("Content-Type", "application/json; charset=utf-8");
      xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");
      xhr.send(JSON.stringify(data));
  } else {
      xhr.send();
  }
  return res
}