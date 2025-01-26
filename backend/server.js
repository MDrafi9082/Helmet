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

//checking if vehicle exists
app.post('/api/vehicles', (req,res) =>{
  const sql = " select * from vehicles where numberPlate = ? ";
  db.query(sql, [req.body.number] , (err, data) => {
    if(err){
      return res.status(500).json({ error: 'Database error' }); 
    }
    if(data.length === 0){
      return res.json('vehicle is not there');
    }else{
      console.log('vehicle there');
      return res.json('vehicle there');
    }
  });
});


app.post('/api/transactions',(req,res) => {
  const sql = "select * from transactions where numberPlate = ? " ;
  
  // if (!req.body.transData) {
  //   console.log('first type madu jhaat');
  //   return res.status(400).json({ error: 'Transaction data is required' });
  // }

  db.query(sql, [req.body.transData], (err,data) => {
    if(err){
      return res.status(500).json({error: 'DataBase error'});
    }
    if(data.length === 0){
      return res.json('no fines');
    }
    return res.json(data);
  });
});


//random complete check of the fines present in the database
app.get('/api/fines',(req,res) => {
  db.query("select * from fines",(err, result) => {
    if(err){
      console.error('error fetching :', err);
      return res.status(500).send('Internal Server Error');
    }
    res.json(result);
  })
});

app.listen(port, () => {
  console.log(`backend server is running in this on http://localhost:${port}`)
});


// app.get('/api/vehicles',(req,res) => {
//   db.query("select * from vehicles where numberPlate = ?",[req.body.number],(err, result) => {
//     if(err){
//       console.error('error fetching :', err);
//       return res.status(500).send('Internal Server Error');
//     }
//     res.json(result);
//   })
// });


//example checkings 


// app.get('/api/transactions',(req,res) => {
//   db.query("select * from transactions",(err, result) => {
//     if(err){
//       console.error('error fetching :', err);
//       return res.status(500).send('Internal Server Error');
//     }
//     res.json(result);
//   })
// });