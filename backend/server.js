const express = require("express");
const cors = require('cors');
const path = require('path')
const mysql = require('mysql2');
const app = express();
const { v4: uuidv4 } = require("uuid");

app.use(express.static(path.join(__dirname, '../frontend/build')));

//資料庫設定
const db = mysql.createConnection({
    host : 'localhost:3306',
    user : 'root',
    password : '0011224433',
    database : 'clientrecords'
});
db.connect(err => {
    if (err) {
        console.error('Database connection failed:', err.stack);
        return;
    }
    console.log('Connected to MySQL database.');
});
app.use(cors());
app.use(express.json());

//登入頁面
app.post('/api/login' , (req, res) => {
    const {email, password} = req.body;
    if (email !== 'test@gmail.com' || password !== '0011224433'){   
        res.status(400).json({ success: false, message: '密碼錯誤' });
    }else{
        res.json({ success: true});
    }
});

// 客戶頁面
app.get('/api/getdata/customer', (req, res) => {
    const query = 'SELECT * FROM  客戶資料表'; // 替換為你的資料表名稱
    db.query(query, (err, results) => {
        if (err) {
            console.error(err);
            res.status(500).send('Database query failed.');
        } else {
            res.json(results); 
            console.log('Database query successfully');
        }
    });
});
app.post('/api/insertdata/customer' , (req, res) => {
    const {name, phone1, phone2, phone3, contentperson, taxid, address, addingtime, remark} = req.body;
    const id = uuidv4();
    const query = "INSERT INTO 客戶資料表 VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";

    db.query(query, [id, name, phone1, phone2, phone3, contentperson, taxid, address, addingtime, remark], (err, result) => {
        if (err) {
            console.error("新增資料失敗:", err);
            return res.status(500).json({ error: "新增資料時發生錯誤。" });
        }
    
        // console.log("新增成功:", result);
        res.status(201).json({
            message: "新增資料成功！",
            data: { id, name},
        });
    });
});
app.post('/api/delete/customer', (req, res) => {
    const {ids} = req.body;
    const query = 'DELETE FROM 客戶資料表 WHERE 客戶ID IN (?)';;

    db.query(query, [ids], (err, result) => {
        if (err) throw err;
        res.json({ success: true, deletedCount: result.affectedRows });
    });
});

// 電腦頁面
app.get('/api/getdata/customername', (req, res) => {
    const query = 'SELECT 客戶ID, 客戶名稱 FROM 客戶資料表'
    db.query(query, (err, result) => {
        if (err) {
            console.error(err); // 錯誤處理
            res.status(500).json({ error: '資料庫查詢失敗' }); // 回傳錯誤訊息
            return;
        }
        if (err) throw err;
        res.json(result);
        console.log('get customerID and name success')
        // console.log(result)
    })
});

app.get('/api/getdata/computer', (req, res) => {
    const query = 
        `SELECT a.電腦ID, c.客戶名稱, a.電腦IP, a.新增日期, a.自購, a.筆電, b.筆電型號,
        b.主機板型號, b.CPU型號, b.風扇, b.記憶體, b.電源供應器, b.機殼, 
        b.顯示卡, b.網路卡, b.其他配件, b.保固到期日
        FROM 客戶電腦資料表 a
        JOIN 電腦配置紀錄表 b ON a.電腦ID = b.電腦ID
        JOIN 客戶資料表 c ON a.客戶ID = c.客戶ID;`;
    db.query(query, (err, result) => {
        if (err) {
            console.error(err); // 錯誤處理
            res.status(500).json({ error: '資料庫查詢失敗' }); // 回傳錯誤訊息
            return;
        }
        if (err){
            throw err;
        } 
        else{
            res.json(result);
            console.log('Database query successfully');
        }
    })
});

app.post('/api/insertdata/computer', (req, res) => {
    const { computerData, detailData } = req.body;
    const customerID = computerData.custormerID;
    const queryCount = `
        SELECT COUNT(*) AS count 
        FROM 客戶電腦資料表 
        WHERE 客戶ID = ?
    `;

    db.query(queryCount, [customerID], (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).json({ error: "Failed to count customer computers" });
            return;
        }

        const computerCount = result[0].count; // 該客戶已有的電腦數量
        const newComputerID = `${customerID}_PC_${computerCount + 1}`; // 生成新的電腦ID

        // 更新 computerData 的電腦ID
        computerData.computerID = newComputerID;
        // 插入資料到 客戶電腦資料表
        const queryA = `
            INSERT INTO 客戶電腦資料表 (電腦ID, 客戶ID, 電腦IP, 新增日期, 自購, 筆電)
            VALUES (?, ?, ?, ?, ?, ?)
        `;
        const valuesA = [
            computerData.computerID,
            computerData.custormerID,
            computerData.computerIP,
            computerData.addingtime,
            computerData.buyItYourself,
            computerData.laptop
        ];

        db.query(queryA, valuesA, (err, resultA) => {
            if (err) {
                console.error(err);
                res.status(500).json({ error: "Failed to insert computer data" });
                return;
            }

            // 插入資料到 電腦配置紀錄表
            const queryB = `
                INSERT INTO 電腦配置紀錄表 (電腦ID, 主機板型號, CPU型號, 風扇, 記憶體, 電源供應器, 機殼, 顯示卡, 網路卡, 其他配件, 保固到期日, 筆電型號)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            `;
            const valuesB = [
                computerData.computerID,
                detailData.motherboard,
                detailData.cpu,
                detailData.fan,
                detailData.ram,
                detailData.power,
                detailData.case,
                detailData.gpu,
                detailData.internetcard,
                detailData.other,
                detailData.warranty,
                detailData.laptop_type
            ];

            db.query(queryB, valuesB, (err, resultB) => {
                if (err) {
                    console.error(err);
                    res.status(500).json({ error: "Failed to insert detail data" });
                    return;
                }

                // 全部成功後回傳結果
                res.json({ 
                    message: "Data inserted successfully", 
                    newComputerID, 
                    resultA, 
                    resultB 
                });
            });
        });
    });
});

app.post('/api/delete/computer', (req, res) => {
    const {ids} = req.body;
    const query = 'DELETE FROM 客戶電腦資料表 WHERE 電腦ID IN (?)';;

    db.query(query, [ids], (err, result) => {
        if (err) throw err;
        res.json({ success: true, deletedCount: result.affectedRows });
    });
});


app.listen(5000, '0.0.0.0', () => {
    console.log('伺服器運行於 http://localhost:5000');
});