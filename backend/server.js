const mysql = require('mysql');
const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
const port = 5004;
app.use(express.json());

app.get('/',(req,res) => {
  res.send('guess what nigga, im finally here');
});

const db = mysql.createConnection({
  host:'localhost',
  user:'root',
  password:'Rafi#sql24',
  database:'vehicle_fines'
})

db.connect((err) => {
  if(err){
    console.log(err);
  }else{
    console.log('the databyas connectedaa sucksessfully');
  }
});

app.post('/api/vehicles', (req,res) =>{
  const sql = " select * from vehicles where numberPlate = ? ";
  db.query(sql, [req.body.number] , (err, data) => {
    if(err){
      return res.status(500).json({ error: 'Database error' }); 
    }
    if(data.length == 0){
      return res.json('vehicle is not there');
    }else{
      return res.json('vehicle there');
    }
  });
});

// app.get('/api/vehicles',(req,res) => {
//   db.query("select * from vehicles",(err, result) => {
//     if(err){
//       console.error('error fetching :', err);
//       return res.status(500).send('Internal Server Error');
//     }
//     res.json(result);
//   })
// });

// app.get('/api/fines',(req,res) => {
//   db.query("select * from fines",(err, result) => {
//     if(err){
//       console.error('error fetching :', err);
//       return res.status(500).send('Internal Server Error');
//     }
//     res.json(result);
//   })
// });

// app.get('/api/transactions',(req,res) => {
//   db.query("select * from transactions",(err, result) => {
//     if(err){
//       console.error('error fetching :', err);
//       return res.status(500).send('Internal Server Error');
//     }
//     res.json(result);
//   })
// });

app.listen(port, () => {
  console.log(`backend server is running in this on http://localhost:${port}`)
})