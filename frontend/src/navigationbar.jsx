import {useEffect, useState} from 'react';
import styles from './navigationbar.module.css' 
import style_dbpage from './databasepage.module.css'
import Clock  from './clock'


export default function NavigationBar({setSelectedTable, textOfSearch, setTextOfSerach}){
    //搜尋欄位

    return (
        <nav className= {`${styles.nav} ${style_dbpage.nav}`}>
            <span id = 'clock'>
                <div><Clock /></div>         
            </span>
            <span>
                <p id = "nav_title"><b>永暘電腦資訊公司</b></p>  
            </span>
            <span id = "search_input_box">
                <input type="text" placeholder='搜尋內容...' value = {textOfSearch} onChange={(e) => setTextOfSerach(e.target.value)}></input>
            </span>
            <span id = 'search_button'>
                <input type = 'button' value = "搜尋" onClick={() => setSelectedTable('searchTable')}></input>
            </span>
        </nav>
    )
};