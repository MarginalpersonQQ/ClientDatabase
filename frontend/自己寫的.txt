import React, { useState } from 'react';
import { Container, Table, TableBody, TableCell, TableHead, TableRow , Button} from '@mui/material';
import styles from './datatable.module.css'

import Newclient from './new_clinet_insert_box'


export default function DataTable (){

        const [refreshKey, setRefreshKey] = useState(1); // 刷新觸發器

        //資料庫的詢問-----------------------------------------------------------------------
        const path = 'http://127.0.0.1:5000';
        const [data, setData] = React.useState([]);
        const getData = async () => {
            try {
                const response = await fetch(`${path}/api/getdata/customer`);
                if (!response.ok){
                    throw new Error('Network response was not ok');
                }
                else{
                    console.log("get database data")
                }
                const result = await response.json();
                setData(result); // 更新狀態
            } catch (error) {
                console.error('There was a problem with the fetch operation:', error);
            }
        };
        const keys =  data.length > 0 ? Object.keys(data[0]) : ['這裡空空如也0', '這裡空空如也1', '這裡空空如也2', '這裡空空如也3']  
        React.useEffect(() => {
            getData();
        }, [refreshKey]); // 空依賴陣列表示組件只會在第一次載入時執行
        
        //新增資料彈窗-----------------------------------------------------------------------
        const [isModalOpen, setModalOpen] = useState(false); // 控制彈窗狀態
        const [formData, setFormData] = useState({ 
                                                    name: "", phone1: "", phone2:"", 
                                                    phone3:"", contentperson:"", taxid:"",
                                                    address:"", addingtime:"",remark:""
                                                }); // 表單數據
        const handleOpenModal = () => setModalOpen(true);
        const handleCloseModal = () => {
            setModalOpen(false)
            setFormData({ 
                name: "", phone1: "", phone2:"", 
                phone3:"", contentperson:"", taxid:"",
                address:"", addingtime:"",remark:""
            });
        };                                        
        const handleFormChange = (e) => {
            const { name, value } = e.target;
            setFormData((prev) => ({ ...prev, [name]: value }));
        };
        const handleFormSubmit = (e) => {
            e.preventDefault();
            console.log("新增資料:", formData);
            setModalOpen(false); // 提交後關閉彈窗
            // 在此處調用 API 或執行其他操作
            upload_new_client();
            setFormData({ 
                name: "", phone1: "", phone2:"", 
                phone3:"", contentperson:"", taxid:"",
                address:"", addingtime:"",remark:""
            });
        };
        const upload_new_client = async() =>{
            try{
                const response = await fetch( `${path}/api/insertdata/customer`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(formData), // 將表單數據轉為 JSON
                });
                if (!response.ok) {
                    throw new Error("Failed to submit data");
                }
                const result = await response.json();
                console.log("新增成功:", result);
                setRefreshKey(refreshKey * -1);
            }
            catch (error){
                console.error("Error submitting data:", error);
            }
        };

        //刪除資料------------------------------------------------------------------
        const [checkedIDs, setCheckbox] = useState([]);
        const [showDelButton, setShowDelButton] = useState(false);

        const handleCheckboxChange = (id) => {
            let updatedCheckedIDs;
            if (checkedIDs.includes(id)) {
                // 如果已選中，取消選中
                updatedCheckedIDs = checkedIDs.filter((selectedID) => selectedID !== id);
            } else {
                // 否則，新增到選中列表
                updatedCheckedIDs = [...checkedIDs, id];
            }
            setCheckbox(updatedCheckedIDs);
            if (updatedCheckedIDs.length >= 1){
                setShowDelButton(true);
            } else{
                setShowDelButton(false);
            }
        };
        const handleDelete = async () => {
            try {
                // 發送刪除請求到伺服器
                const response = await fetch(`${path}/api/delete/customer`, {
                    method: 'POST',
                    headers: {
                    'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ ids: checkedIDs }),
                });
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const result = await response.json();
                alert("刪除成功！");
                setCheckbox([]); // 清空選中列表
                setShowDelButton(false);
                setRefreshKey(refreshKey * -1);
                } catch (error) {
                console.error("刪除失敗：", error);
                alert("刪除失敗！");
            }
        };
        
        //return structure------------------------------------------------------------------
        return (
            <Container className = {styles.main_container}>
                {isModalOpen && (
                    <Newclient 
                        isOpen = {isModalOpen} 
                        onClose={handleCloseModal}
                        formData={formData}  
                        onFormChange={handleFormChange}
                        onFormSubmit={handleFormSubmit}
                    />
                )}
                <div>
                    <Button className = {styles.fun_button} variant='contained' onClick={handleOpenModal}>新增資料</Button>
                    {showDelButton && <Button  color = "error" className = {styles.fun_button} variant='contained' onClick = {handleDelete}>刪除資料</Button>}
                </div>
                <Table className={styles.table_data}>
                    <TableHead>
                        <TableRow key = {'title'}>
                        <TableCell className={styles.table_title}/>
                        {
                            keys.map((key) => (
                                    <TableCell>{key}</TableCell>
                                )
                            )
                        }
                        </TableRow>
                    </TableHead>    
                    <TableBody>
                        {data.map((company) => (
                        <TableRow key = {company['客戶ID']}>
                            <TableCell ><input className={styles.table_data_checkbox} type = 'checkbox' checked={checkedIDs.includes(company['客戶ID'])} onChange={() => handleCheckboxChange(company['客戶ID'])}></input></TableCell>
                            <TableCell className={styles.table_data}>{company['客戶ID']}</TableCell>
                            <TableCell className={styles.table_data}>{company['客戶名稱']}</TableCell>
                            <TableCell className={styles.table_data}>{company['客戶電話1']}</TableCell>
                            <TableCell className={styles.table_data}>{company['客戶電話2']}</TableCell>
                            <TableCell className={styles.table_data}>{company['客戶電話3']}</TableCell>
                            <TableCell className={styles.table_data}>{company['聯絡人']}</TableCell>
                            <TableCell className={styles.table_data}>{company['統一編號']}</TableCell>
                            <TableCell className={styles.table_data}>{company['地址']}</TableCell>
                            <TableCell className={styles.table_data}>{new Date(company['新增日期']).toLocaleDateString()}</TableCell>
                            <TableCell className={styles.table_data}>{company['備註']}</TableCell>
                        </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Container>
        );
};

