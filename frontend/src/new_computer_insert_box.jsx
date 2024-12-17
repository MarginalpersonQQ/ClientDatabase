import React, {useState, useEffect} from 'react'
import styles from './new_computer_insert_box.module.css'
import {Select, MenuItem, FormControl, InputLabel, FormControlLabel, Checkbox} from '@mui/material';

export default function New_data ({isOpen, onClose, computerformData, detailFormData, oncomputerFormChange, ondetailFromChange, oncheckboxChange, onFormSubmit}) {
    

    // 客戶選擇器
    const path = 'http://127.0.0.1:5000';
    const [customerPick, setCustomerPick] = useState('');
    const [customerList, setCustomerList] = useState([]);

    const handlecustomerpick = (e) => {
        setCustomerPick(e.target.value)
        oncomputerFormChange({target: {name:"custormerID", value:e.target.value},})
    };

    
    useEffect(() => {
        fetch(`${path}/api/getdata/customername`)
            .then(response => response.json())
            .then(data => {
                setCustomerList(data); // 將回傳的資料設置到狀態中
            })
            .catch(error => {
                console.error('發生錯誤:', error);
        });
    }, []);
    useEffect(() => {
        // 如果有預設的 customerID，設定給 customerPick
        if (computerformData.custormerID) {
            setCustomerPick(computerformData.custormerID);
        }
    }, [computerformData.custormerID]); // 依賴項監聽 computerformData.custormerID\

    // 取得當前時間按鈕
    const right_now_time = () => {
        let now = new Date();
        return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`;
    }
    const handleButtonClick = (e) => {
        e.preventDefault();
        oncomputerFormChange({
            target: {
                name: "addingtime",
                value: right_now_time(),
            },
        });
    };

    if (!isOpen) return null;
    return (
        <div className={styles.gray_background} onClick={onClose}>
            <div className = {styles.insert_box} onClick={(e) => e.stopPropagation()}>
                <button className= {styles.close_button} onClick={onClose}>
                    &times;
                </button>
                <span><h2 className={styles.boxtitle}>新增電腦資料</h2></span>
                <form onSubmit={onFormSubmit}>
                    <div className = {styles.form_group}>
                        <label className = {styles.label_group} htmlFor = 'client_name'>
                            客戶名稱:
                        </label>
                        <FormControl sx={{ m: 1, minWidth: 140 }} size="small">
                            <InputLabel id="Custormer_label">客戶</InputLabel>
                            <Select
                                labelId="Custormer_label"
                                id="Custormer_label_select"
                                value={customerPick}
                                label="客戶"
                                onChange={handlecustomerpick}
                                required
                            >
                                <MenuItem value="">
                                    <em>None</em>
                                </MenuItem>
                                {customerList.map((customer) => (
                                    <MenuItem key={customer.客戶ID} value={customer.客戶ID}>
                                        {customer.客戶名稱}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </div>
                    <div className = {styles.form_group}>
                        <label className = {styles.label_group} htmlFor = 'addingTime'>
                            新增/購買日期:
                        </label>
                        <input
                            type = "text"
                            id = 'addingTime'
                            name="addingtime"
                            value={computerformData.addingtime}
                            onChange={oncomputerFormChange}
                            placeholder='yyyy-mm-dd'
                        />
                        <span>
                            <button onClick={handleButtonClick} style={{marginLeft: '10px' }}>
                                今天日期
                            </button>
                        </span>
                    </div>
                    <div className = {styles.form_group}>
                        <label className = {styles.label_group} htmlFor = 'computerIP'>
                            電腦IP位址:
                        </label>
                        <input
                            type = "text"
                            id = 'computerIP'
                            name="computerIP"
                            value={computerformData.computerIP}
                            onChange={oncomputerFormChange}
                        />
                    </div>
                    {/* 自購 */}
                    <FormControlLabel
                        control={
                            <Checkbox
                                name="buyItYourself"
                                checked={computerformData.buyItYourself === "Y"}
                                onChange={oncheckboxChange}
                            />
                        }
                        label="是否自購"
                    />
                    {/* 筆電 */}
                    <FormControlLabel
                        control={
                            <Checkbox
                                name="laptop"
                                checked={computerformData.laptop === "Y"}
                                onChange={oncheckboxChange}
                            />
                        }
                        label="是否是筆電"
                    />
                    
                    {computerformData.laptop === "N" && 
                        <div>
                            <div>
                                <h3>電腦組件</h3>
                            </div>
                            <div className = {styles.form_group}>
                                <label className = {styles.label_group} htmlFor = 'motherboard'>
                                    主機板型號:
                                </label>
                                <input
                                    type = "text"
                                    id = 'motherboard'
                                    name="motherboard"
                                    value={detailFormData.motherboard} 
                                    onChange={ondetailFromChange}
                                />
                            </div>
                            <div className = {styles.form_group}>
                                <label className = {styles.label_group} htmlFor = 'CPU'>
                                    CPU型號:
                                </label>
                                <input
                                    type = "text"
                                    id = 'CPU'
                                    name="cpu"
                                    value={detailFormData.cpu} 
                                    onChange={ondetailFromChange}
                                />
                            </div>
                            <div className = {styles.form_group}>
                                <label className = {styles.label_group} htmlFor = 'FAN'>
                                    風扇型號:
                                </label>
                                <input
                                    type = "text"
                                    id = 'FAN'
                                    name="fan"
                                    value={detailFormData.fan} 
                                    onChange={ondetailFromChange}
                                />
                            </div>
                            <div className = {styles.form_group}>
                                <label className = {styles.label_group} htmlFor = 'RAM'>
                                    記憶體型號:
                                </label>
                                <input
                                    type = "text"
                                    id = 'RAM'
                                    name="ram"
                                    value={detailFormData.ram} 
                                    onChange={ondetailFromChange}
                                />
                            </div>
                            <div className = {styles.form_group}>
                                <label className = {styles.label_group} htmlFor = 'Power'>
                                    電源供應器型號:
                                </label>
                                <input
                                    type = "text"
                                    id = 'Power'
                                    name="power"
                                    value={detailFormData.power} 
                                    onChange={ondetailFromChange}
                                />
                            </div>
                            <div className = {styles.form_group}>
                                <label className = {styles.label_group} htmlFor = 'Case'>
                                    機殼型號:
                                </label>
                                <input
                                    type = "text"
                                    id = 'Case'
                                    name="case"
                                    value={detailFormData.case} 
                                    onChange={ondetailFromChange}
                                />
                            </div>
                            <div className = {styles.form_group}>
                                <label className = {styles.label_group} htmlFor = 'GraphicCard'>
                                    顯示卡型號:
                                </label>
                                <input
                                    type = "text"
                                    id = 'GraphicCard'
                                    name="gpu"
                                    value={detailFormData.gpu} 
                                    onChange={ondetailFromChange}
                                />
                            </div>
                            <div className = {styles.form_group}>
                                <label className = {styles.label_group} htmlFor = 'InternetCard'>
                                    網路卡型號:
                                </label>
                                <input
                                    type = "text"
                                    id = 'InternetCard'
                                    name="internetcard"
                                    value={detailFormData.internetcard} 
                                    onChange={ondetailFromChange}
                                />
                            </div>
                            <div className = {styles.form_group}>
                                <label className = {styles.label_group} htmlFor = 'Othercomponents'>
                                    其他配件型號:
                                </label>
                                <input
                                    type = "text"
                                    id = 'Othercomponents'
                                    name="other"
                                    value={detailFormData.other} 
                                    onChange={ondetailFromChange}
                                />
                            </div>
                        </div>
                    }
                    {computerformData.laptop === "Y" &&
                        <div className = {styles.form_group}>
                            <label className = {styles.label_group} htmlFor = 'Laptop_type'>
                                筆電型號:
                            </label>
                            <input
                                type = "text"
                                id = 'Laptop_type'
                                name="laptop_type"
                                value={detailFormData.laptop_type} 
                                onChange={ondetailFromChange}
                            />
                        </div>
                    }
                    <div className = {styles.form_group}>
                                <label className = {styles.label_group} htmlFor = 'Warranty'>
                                    保固到期日:
                                </label>
                                <input
                                    type = "text"
                                    id = 'Warranty'
                                    name="warranty"
                                    value={detailFormData.warranty} 
                                    onChange={ondetailFromChange}
                                    placeholder ="yyyy-mm-dd"
                                />
                    </div>
                    <button type="submit" className={styles.submit_button}>
                        確定
                    </button>
                </form>
            </div>
        </div>
    );
}