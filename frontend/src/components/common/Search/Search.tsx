/* eslint-disable @typescript-eslint/no-unused-expressions */
import React from "react";
import st from './Search.module.scss';

interface PropsType  {
    placehold: any
    event?: () => void
    height?: string
    width?: string
}

export const Search: React.FC<PropsType> = ({placehold, event = () => {return}, height="auto", width="auto" }) => {
    const styles = {
        width: {width},
        height: {height}
    }
    return(
    <div className={st["search"]} style={styles.width}>
            <input type="seach" placeholder={placehold} onInput={event}/>
            <i className='fa fa-magnifying-glass'></i>
    </div>
    )
}

