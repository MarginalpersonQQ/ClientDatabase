import {useEffect, useState} from 'react';
import styles from './navigationbar.module.css' 
import style_dbpage from './databasepage.module.css'
import {Select, MenuItem} from '@mui/material';
import Clock  from './clock'


export default function NavigationBar({cusORcom, setcusORcom, setSelectedTable, textOfSearch, setTextOfSerach}){
    //搜尋欄位

    return (
        <nav className= {`${styles.nav} ${style_dbpage.nav}`}>
            <span id = 'clock'>
                <div><Clock /></div>         
            </span>
            <span>
                <p id = "nav_title"><b>永暘電腦資訊公司</b></p>  
            </span>
            <span id="Search_target_box">
                <Select
                    labelId="Search_target_box_label"
                    value={cusORcom}
                    onChange={(e) => setcusORcom(e.target.value)}
                    required
                    sx={{
                        width: '100px',          // 設定固定寬度
                        height: '40px',          // 與外框高度一致
                        alignItems: 'center',    // 垂直對齊
                        justifyContent: 'center' // 水平對齊
                    }}
                >
                    <MenuItem value="客戶">
                        <em>客戶</em>
                    </MenuItem>
                    <MenuItem value="電腦">
                        <em>電腦</em>
                    </MenuItem>
                </Select>
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