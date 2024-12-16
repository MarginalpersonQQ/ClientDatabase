import React from 'react'
import styles from './new_client_insert_box.module.css'

export default function New_data ({ isOpen, onClose, formData, onFormChange, onFormSubmit }) {

    const right_now_time = () => {
        let now = new Date();
        return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`;
    }

    const handleButtonClick = (e) => {
        e.preventDefault();
        onFormChange({
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
                <span><h2 className={styles.boxtitle}>新增客戶資料</h2></span>
                <form onSubmit={onFormSubmit}>
                    <div className = {styles.form_group}>
                        <label className = {styles.label_group} htmlFor = 'client_name'>
                            客戶名稱:
                        </label>
                        <input
                            type = "text"
                            id = 'client_name'
                            name="name"
                            value={formData.name}
                            onChange={onFormChange}
                            required
                        />
                    </div>
                    <div className = {styles.form_group}>
                        <label className = {styles.label_group} htmlFor = 'client_phone1'>
                            客戶電話1:
                        </label>
                        <input
                            type = "text"
                            id = 'client_phone1'
                            name="phone1"
                            value={formData.phone1}
                            onChange={onFormChange}
                        />
                    </div>
                    <div className = {styles.form_group}>
                        <label className = {styles.label_group} htmlFor = 'client_phone2'>
                            客戶電話2:
                        </label>
                        <input
                            type = "text"
                            id = 'client_phone2'
                            name="phone2"
                            value={formData.phone2}
                            onChange={onFormChange}
                        />
                    </div>
                    <div className = {styles.form_group}>
                        <label className = {styles.label_group} htmlFor = 'client_phone3'>
                            客戶電話3:
                        </label>
                        <input
                            type = "text"
                            id = 'client_phone3'
                            name="phone3"
                            value={formData.phone3}
                            onChange={onFormChange}
                        />
                    </div>
                    <div className = {styles.form_group}>
                        <label className = {styles.label_group} htmlFor = 'contentperson'>
                            聯絡人:
                        </label>
                        <input
                            type = "text"
                            id = 'contentperson'
                            name="contentperson"
                            value={formData.contentperson}
                            onChange={onFormChange}
                        />
                    </div>
                    <div className = {styles.form_group}>
                        <label className = {styles.label_group} htmlFor = 'tax_id'>
                            統一編號:
                        </label>
                        <input
                            type = "text"
                            id = 'tax_id'
                            name="taxid"
                            value={formData.taxid}
                            onChange={onFormChange}
                        />
                    </div>
                    <div className = {styles.form_group}>
                        <label className = {styles.label_group} htmlFor = 'addr'>
                            地址:
                        </label>
                        <input
                            type = "text"
                            id = 'addr'
                            name="address"
                            value={formData.address}
                            onChange={onFormChange}
                        />
                    </div>
                    <div className = {styles.form_group}>
                        <label className = {styles.label_group} htmlFor = 'addtime'>
                            新增時間:
                        </label>
                        <input
                            type = "text"
                            id = 'addtime'
                            name= "addingtime"
                            value={formData.addingtime}
                            onChange={onFormChange}
                        />
                        <span>
                            <button onClick={handleButtonClick} style={{marginLeft: '10px' }}>
                                現在時間
                            </button>
                        </span>
                    </div>
                    <div className = {styles.form_group}>
                        <label className = {styles.label_group} htmlFor  = 'remark'>
                            備註:
                        </label>
                        <input
                            type = "text"
                            id = 'remark'
                            name="remark"
                            value={formData.remark}
                            onChange={onFormChange}
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