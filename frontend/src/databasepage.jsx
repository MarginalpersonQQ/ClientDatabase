import { useState, useEffect } from 'react';
import NavigationBar from './navigationbar';
import Sidelist from './sidelist';
import DataTable from './datatable';
import ComputerDataTable from './computerdatatable'
import styles from './databasepage.module.css'  
import Search_table_computer from './search_table_computer'
import Search_table_customer from './search_table_customer'

export default function DataBasePage() {
  const [selectedTable, setSelectedTable] = useState('');
  const [textOfSearch, setTextOfSerach] = useState('');
  const [cusORcom, setcusORcom] = useState("客戶");

  // 根據選擇的 Table 顯示不同的資料表
  const renderDataTable = () => {
    switch (selectedTable) {
      case 'computer':
        return <ComputerDataTable className={styles.data} />;
      case 'customer':
        return <DataTable className={styles.data} />; 
      case 'add':
        return <div>not thing in here.</div>;
      case 'searchTable':
        return cusORcom === "客戶" ? <Search_table_customer textOfSearch = {textOfSearch} /> : <Search_table_computer textOfSearch = {textOfSearch}/>;
      case 'main_page':
      default:
        return <div className={styles.data}>歡迎來到資料庫</div>;
    }
  };

  return (
    <div className={styles.page_container}>
      <NavigationBar className = {styles.nav}
        cusORcom = {cusORcom}
        setcusORcom = {setcusORcom}
        textOfSearch = {textOfSearch}
        setTextOfSerach = {setTextOfSerach}
        setSelectedTable = {setSelectedTable}
      />
      <div className={styles.main_content}>
        <Sidelist className = {styles.sidelist} onSelectTable={setSelectedTable} />
        <div className={styles.data}>{renderDataTable()}</div>
      </div>
    </div>
  );
}