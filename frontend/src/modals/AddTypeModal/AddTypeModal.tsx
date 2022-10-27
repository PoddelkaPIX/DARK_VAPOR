import axios from "axios";
import { FC, useEffect, useState } from "react";
import { Modal } from "../../components/common/Modal/Modal";
import {IParameter} from "../../pages/Admin/Admin"
import st from "./AddTypeModal.module.scss"
import config from "../../config.json"
import { ConfirmDialog } from "../../components/common/ConfirmDialog/ConfirmDialog";

interface PropTypes{
    onClose: ()=>void
    flagUpdate: ()=>void
}

interface ICategory{
    category_id: number
    title_category: string
}
export const AddTypeModal: FC<PropTypes>=({onClose, flagUpdate}) => {
    const [parameters, setParameters] = useState<IParameter[]>([])
    const [categorys, setCategorys] = useState<ICategory[]>([])
    const [confirmDialogAddType, setConfirmDialogAddType] = useState(false)

    const [titleType, setTitleType] = useState<string>('')
    const [selectedCategoryId, setSelectedCategoryId] = useState<number>(1)
    const [selectedParameters, setSelectedParameters] = useState<number[]>([])

    document.body.style.overflowY = "hidden"

    useEffect(()=>{
        fetch(config.backend.host + config.backend.port + "/parameters").then(res=>res.json()).then((result)=>setParameters(result))
        fetch(config.backend.host + config.backend.port + "/getCaregorys").then(res=>res.json()).then((result)=>setCategorys(result))
    }, [])

    const handleTitleType = (e: any) => {
        setTitleType(e.target.value);
    };
    const handleSelectCategory = (e: any) => {
        setSelectedCategoryId(e.target.value);
    };

    const handleSelectedParameters = (e: any) => {
        if (e.target.checked === true){
            setSelectedParameters([...selectedParameters, e.target.value]);
        }else{
            var index = selectedParameters.indexOf(e.target.value);
            let p = selectedParameters
            p.splice(index, 1)
            setSelectedParameters(p)
        }        
    };

    function complite(){
        let url = config.backend.host + config.backend.port + "/addType"
        let data = {"title_type": titleType, "category_id": selectedCategoryId, "parameters": selectedParameters}
        axios({
            method: 'post',
            url: url,
            data: data,
            headers: { "Content-Type": "application/json" },
        })
        .then(function (response) {
            flagUpdate()
            console.log(response);
        })
        .catch(function (error) {
            console.log(error);
        });
        onClose()
    }
    return (
        <Modal onClose={onClose} closingBackground={true}>
        <div id={st["add-type-modal"]}>
            <input type="text" placeholder="Название типа" onChange={handleTitleType}/>
            <select onChange={handleSelectCategory} value={selectedCategoryId}>
                {categorys?.map((category, index)=>
                    <option  className="select-category" key={index} value={category.category_id.toString()}>{category.title_category}</option>
                )}
            </select>
            {parameters?.map((parameter, index)=>   <label key={index} className={st["parameter"]}> {parameter.title_parameter} 
                                                        <input onChange={handleSelectedParameters} type="checkbox" value={parameter.parameter_id}></input>
                                                    </label>)}
            <button onClick={()=>{setConfirmDialogAddType(true)}}>Готово</button>
            {confirmDialogAddType && <ConfirmDialog onClose={()=>{setConfirmDialogAddType(false); onClose()}} question="Добавить новый тип товаров?" confirme={complite}/>}
        </div>
    </Modal>
    );
}