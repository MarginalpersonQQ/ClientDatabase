import styles from './computerdatatable.module.css';
import { Container, Table, TableBody, TableCell, TableHead, TableRow , Button} from '@mui/material';
import React, {useState} from 'react';
import NewComputer from './new_computer_insert_box'

export default function ComputerDataTable(){

    const [refreshKey, setRefreshKey] = useState(1); // 刷新觸發器

    //資料庫查詢 -----------------------------------------------------------------------------
    const path = 'http://127.0.0.1:5000';
    const [data, setData] = React.useState([]);
    const getData = async () => {
        try {
            const response = await fetch(`${path}/api/getdata/computer`);
            if (!response.ok){
                throw new Error('Network response was not ok');
            }
            else{
                console.log("get database data")
            }
            const result = await response.json();
            setData(result); // 更新狀態
            console.log(result)
        } catch (error) {
            console.error('There was a problem with the fetch operation:', error);
        }
    };
    const keys =  data.length > 0 ? Object.keys(data[0]) : ['這裡空空如也0', '這裡空空如也1', '這裡空空如也2', '這裡空空如也3']  
    React.useEffect(() => {
        getData();
    }, [refreshKey]); // 空依賴陣列表示組件只會在第一次載入時執行
    
    //新增資料談窗 -----------------------------------------------------------------------------
    const [isModalOpen, setModalOpen] = useState(false); // 控制彈窗狀態
    // 客戶電腦資料表數據
    const [computerformData, setComputerFormData]= useState({ 
        computerID:"", custormerID: "", computerIP:"", addingtime:"",
        buyItYourself:"N", laptop : "N"
    }); 
    // 客戶電腦配置表數據
    const [detailformDate, setDetailFormDate] = useState({
        laptop_type : "", motherboard:"", cpu:"", fan:"",
        ram:"", power:"", case:"", gpu:"", internetcard:"",
        other:"",  warranty:null
    }); 

    const handleOpenModal = () => setModalOpen(true);
    const handleCloseModal = () => { // 視窗關閉後初始化輸入格資訊
        setModalOpen(false)
        setComputerFormData({ 
            computerID:"", custormerID: "", computerIP:"", addingtime:"",
            buyItYourself:"N", laptop : "N"
        });
        setDetailFormDate(
            {
                laptop_type:"", motherboard:"", cpu:"", fan:"",
                ram:"", power:"", case:"", gpu:"", internetcard:"",
                other:"",  warranty:null
            }
        );
    };                                        
    const handlecomputerFormChange = (e) => {
        const { name, value } = e.target;
        setComputerFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handledetailFromChange = (e) => {
        const { name, value } = e.target;
        setDetailFormDate((prev) => ({ ...prev, [name]: value }));
    }

    const handleInputCheckboxChange = (e) => {
        const { name, checked } = e.target;
        setComputerFormData((prevState) => ({
            ...prevState,
            [name]: checked ? "Y" : "N", // 更新目標字段
        }));
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();
        console.log("新增資料:", computerformData, detailformDate);
        setModalOpen(false); // 提交後關閉彈窗
        // 在此處調用 API 或執行其他操作
        upload_new_computer();
        //提交後初始化輸入格
        setComputerFormData({ 
            computerID:"", custormerID: "", computerIP:"", addingtime:"",
            buyItYourself:"N", laptop : "N"
        });
        setDetailFormDate(
            {
                laptop_type : "", motherboard:"", cpu:"", fan:"",
                ram:"", power:"", case:"", gpu:"", internetcard:"",
                other:"",  warranty:null
            }
        );
    };
        //提交新資料 尚未修改
    const upload_new_computer = async() =>{
        try{
            const response = await fetch( `${path}/api/insertdata/computer`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    computerData: computerformData, // 將電腦基本資料放入 computerData
                    detailData: detailformDate,    // 將詳細配置資料放入 detailData
                }), // 將表單數據轉為 JSON
            });
            if (!response.ok) {
                throw new Error("Failed to submit data");
            }
            const result = await response.json();
            console.log("新增成功:", result);
            alert("新增成功!");
            setRefreshKey(refreshKey * -1);
        }
        catch (error){
            console.error("Error submitting data:", error);
            alert("新增失敗...");
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
            const response = await fetch(`${path}/api/delete/computer`, {
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
                <NewComputer 
                    isOpen = {isModalOpen} 
                    onClose={handleCloseModal}
                    computerformData={computerformData} 
                    detailFormData={detailformDate} 
                    oncomputerFormChange={handlecomputerFormChange}
                    ondetailFromChange={handledetailFromChange}
                    oncheckboxChange={handleInputCheckboxChange}
                    onFormSubmit={handleFormSubmit}
                />
            )}
            <div>
                <Button className = {styles.fun_button} variant='contained' onClick={handleOpenModal}>新增資料</Button>
                {showDelButton && <Button color = "error" className = {styles.fun_button} variant='contained' onClick = {handleDelete}>刪除資料</Button>}
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
                    <TableRow key={company['電腦ID']}>
                        <TableCell><input className={styles.table_data_checkbox} type='checkbox' checked={checkedIDs.includes(company['電腦ID'])} onChange={() => handleCheckboxChange(company['電腦ID'])} /></TableCell>
                        <TableCell className={styles.table_data}>{company['電腦ID']}</TableCell>
                        <TableCell className={styles.table_data}>{company['客戶名稱']}</TableCell>
                        <TableCell className={styles.table_data}>{company['電腦IP']}</TableCell>
                        <TableCell className={styles.table_data}>
                            {company['新增日期'] ? new Date(company['新增日期']).toLocaleDateString() : '無新增日期'}
                        </TableCell>
                        <TableCell className={styles.table_data}>{company['自購']}</TableCell>
                        <TableCell className={styles.table_data}>{company['筆電']}</TableCell>
                        <TableCell className={styles.table_data}>{company['筆電型號']}</TableCell>
                        <TableCell className={styles.table_data}>{company['主機板型號']}</TableCell>
                        <TableCell className={styles.table_data}>{company['CPU型號']}</TableCell>
                        <TableCell className={styles.table_data}>{company['風扇']}</TableCell>
                        <TableCell className={styles.table_data}>{company['記憶體']}</TableCell>
                        <TableCell className={styles.table_data}>{company['電源供應器']}</TableCell>
                        <TableCell className={styles.table_data}>{company['機殼']}</TableCell>
                        <TableCell className={styles.table_data}>{company['顯示卡']}</TableCell>
                        <TableCell className={styles.table_data}>{company['網路卡']}</TableCell>
                        <TableCell className={styles.table_data}>{company['其他配件']}</TableCell>
                        <TableCell className={styles.table_data}>
                            {company['保固到期日'] ? new Date(company['保固到期日']).toLocaleDateString() : '無保固日期'}
                        </TableCell>
                    </TableRow>
                ))}
                </TableBody>
            </Table>
        </Container>
    );
}