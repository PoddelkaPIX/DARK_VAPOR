import { Navigate, Route, Routes } from 'react-router-dom';
import { Main } from './pages/Main/Main';
import { Admin } from './pages/Admin/Admin';
import { Header } from './components/common/Header/Header';
import { useState } from 'react';

export interface IStrengthValues{
  title: string
  value: number
}

export interface IStrength{
  title: string
  values: IStrengthValues[]
}

export interface ISalt{
  title: string
  value: number
}

export  interface IProduct{
  id: number
  title: string
  price: number
  count: number
  type: string
  resistance?: string
  material?: string
  description?: string
  strengths?: IStrength
  strength?: number
  salts?: ISalt[]
  salt?: number
}

function App() {
  let authorized = false
  let productList: IProduct[] = []
  const [products, setProducts] = useState(productList)

  function addProductInBasket(item: IProduct){
    setProducts([...products, item])
  }

  function deleteProductInBasket(index: number){
    products.splice(index, 1);
    setProducts([...products])
  }
  function changeBasketProductCount(index: number, newCount: number){
    products[index].count = newCount
    setProducts([...products])
  }
  
  return (
   <>
      <Header authorized={authorized} basketProducts={products} 
        setProducts={(item: IProduct)=>addProductInBasket(item)} 
        changeBasketProductCount={(index:number, newCount:number)=>changeBasketProductCount(index, newCount)}
        deleteProductInBasket={deleteProductInBasket}/>
      <Routes>
            <Route path="/" element={<Main authorized={authorized} setProducts={(item: IProduct)=>addProductInBasket(item)}/>} />
            <Route path="/admin" element={<Admin/>} />
            <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </>
  );
}
export default App;
