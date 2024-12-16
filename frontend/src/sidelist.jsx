import * as React from 'react';
import styles from './sidelist.module.css'

export default function Sidelist({ onSelectTable }){

    const [selected, setSelected] = React.useState("");

    const handleSelect = (tableName) => {
        setSelected(tableName); // 更新選中狀態
        onSelectTable(tableName); // 通知父組件
    };

    return (
        <aside className = {styles.side}>
            <img className = {styles.img} src = {require("./yyci.gif")} alt= "not found" onClick={() => handleSelect('main_page')}/>
            <table className = {styles.tabel_all}>
                <tbody>
                    <tr><td className = {`${selected === "customer" ? styles.selected : styles.tdata}`} onClick={() => handleSelect('customer')}>客戶資料</td></tr>
                    <tr><td className = {`${selected === "computer" ? styles.selected : styles.tdata}`} onClick={() => handleSelect('computer')}>電腦資料</td></tr>
                </tbody>
            </table>
        </aside>
    );
}