const express = require('express');
const router = express.Router();
const filename = 'database/database.sqlite';
const sqlite3 = require('sqlite3').verbose();
let db = new sqlite3.Database(filename);
// db.run("PRAGMA foreign_keys = ON");

router.get('/customers', function(req, res) {
  var sql = 'select * from customers';

  db.all(sql, [], (err, rows) => {
    if (err) {
        console.log('ERROR fetching from the database:', err);
        return;
    }
    console.log('Request succeeded, new data fetched', rows);
    res.status(200).json({
      customers: rows
    });
  });
});


router.get('/customers/id/:id', function(req, res) {
  // TODO: add code here
  const id = req.params.id;
  //if (typeof +id !== 'number'){res.status(400).json({customers:"bas request"});}
  var sql = 'select * from customers where id ='+req.params.id;
  console.log(sql);
  db.all(sql,[],(err,row) =>{
    if (err) {
      console.log('ERROR fetching from the database:', err);
      return;
    }
  console.log('Request succeeded, new data fetched', row);
  res.status(200).json({
    customer: row
   });
  });
});


router.get('/customers/surnames', function(req, res) {
  var sql = `select * from customers where surname in ("Dove", "Smith")` ;

   db.all(sql, [], (err, rows) => {
    if (err) {
        console.log('ERROR fetching from the database:', err);
        return;
    }
    console.log('Request succeeded, new data fetched', rows);
    res.status(200).json({
      customers: rows
    });
  });
});


router.get('/customers/search/:surname', function(req, res) {
  // TODO: add code here

  const id = req.params.id;
 // if (typeof +id === 'number'){res.status(400).json({customers:"bas request"});}
  var sql = `select * from customers where surname like  '%${req.params.surname}%'`;
  console.log(sql);
  db.all(sql,[],(err,row) =>{
    if (err) {
      console.log('ERROR fetching from the database:', err);
      return;
    }
  console.log('Request succeeded, new data fetched', row);
  res.status(200).json({
    customer: row
   });
  });
});


router.post('/customers/', function(req, res) {
  // EXPECTED JSON Object:
  // {
  //   title: 'Mr',
  //   firstname: 'Laurie',
  //   surname: 'Ainley',
  //   email: 'laurie@ainley.com'
  // }
  const data = req.body;
  //data = JSON.parse(data);
  console.log(data);
  const sql = `insert into customers (title, first_name, surname, email) values ('${data.title}', '${data.firstname}', '${data.surname}', '${data.email}')`;
  db.run(sql,[],(err,row) =>{
    if (err) {
      console.log('ERROR fetching from the database:', err);
      return;
    }
  console.log('Request succeeded, new data inserted', data);
  res.status(200).json({
    customer: data
    });
  });
  console.log("select * from customers ");
  // TODO: add code here
});


router.put('/customers/:id', function(req, res) {
  const id = req.params.id;
  
  var sql = `update customers set surname = '${req.params.surname}', email = '${req.params.email}' where id ='${req.params.id}'`;
  console.log(sql);
  db.run(sql,[],(err,data) =>{
    if (err) {
      console.log('ERROR fetching from the database:', err);
      return;
    }
  console.log('Request succeeded, record updated', data);
  res.status(200).json({
    customer: req.body
   });
  });
});

router.delete('/reservation/:id', function(req, res) {
 var id  = req.params.id;
 console.log(id);
 const sql = `delete from reservations WHERE id = ${req.params.id}`; 
  db.run(sql)
  return res.status(200).send();
});
// get '/reservations'
// TODO: add code here
router.get('/reservations/dates', function(req, res) {
  var sql = 'select * from reservations where check_in_date in ("2018/06/01","2018/07/10") and check_out_date in ("2018/06/06","2018/07/20")';

  db.all(sql, [], (err, rows) => {
    if (err) {
        console.log('ERROR fetching from the database:', err);
        return;
    }
    console.log('Request succeeded, new data fetched', rows);
    res.status(200).json({
      reservations: rows
    });
  });
});

router.get('/reservations/ordered', function(req,res){
  var sql = `select * from reservations order by check_in_date desc`;
  db.all(sql,[],(err, rows)=>{
    if (err){
      console.log('ERROR fetching from the database:', err);
      return;
    }
    console.log('request succeded, new data fetched', rows);
    res.status(200).json({
      dates:rows
    });
  });
});


// get '/reservation/:id'
router.get('/reservation/:id', function(req, res) {
  // TODO: add code here
  const id = req.params.id;
  //if (typeof +id !== 'number'){res.status(400).json({customers:"bas request"});}
  var sql = 'select * from reservations where id ='+req.params.id;
  console.log(sql);
  db.all(sql,[],(err,row) =>{
    if (err) {
      console.log('ERROR fetching from the database:', err);
      return;
    }
  console.log('Request succeeded, new data fetched', row);
  res.status(200).json({
    reservation: row
   });
  });
});


// delete '/reservations/:id'
// TODO: add code here


// get '/reservations/starting-on/:startDate'
router.get('/reservation/starting-on/:startDate', function(req, res) {
  // TODO: add code here
  //const check_in_date = req.params.startDate;
  //if (typeof +id !== 'number'){res.status(400).json({customers:"bas request"});}
  console.log(req.params.startDate);
  var sql = 'select * from reservations where check_in_date ='+req.params.startDate;
  console.log(sql);
  db.all(sql,[],(err,row) =>{
    if (err) {
      console.log('ERROR fetching from the database:', err);
      return;
    }
  console.log('Request succeeded, new data fetched', row);
  res.status(200).json({
    reservation: row
   });
  });
});
// 


// get '/reservations/active-on/:date'
router.get('/reservations/active-on/:date', function(req, res) {
  // TODO: add code here
  //const check_in_date = req.params.startDate;
  //if (typeof +id !== 'number'){res.status(400).json({customers:"bas request"});}
  console.log(req.params.date);
  var sql = `select * from reservations where check_in_date <= ${req.params.date} and check_out_date > ${req.params.date}`;
  console.log(sql);
  db.all(sql,[],(err,row) =>{
    if (err) {
      console.log('ERROR fetching from the database:', err);
      return;
    }
  console.log('Request succeeded, new data fetched', row);
  res.status(200).json({
    reservation: row
   });
  });
});


// post '/reservations'
// EXPECTED JSON Object:
// {
//   customer_id: 1,
//   room_id: 1,
//   check_in_date: '2018-01-20',
//   check_out_date: '2018-01-22',
//   room_price: 129.90
// }
router.post('/reservation/', function(req, res) {
 
  const data = req.body;
  if (data.customer_id === null) {res.status(400).json({customers:"bad request"});}
  //data = JSON.parse(data);
  console.log(data);
  const sql = `insert into reservations (customer_id, room_id, check_in_date, check_out_date, room_price) values ('${data.customer_id}','${data.room_id}','${data.check_in_date}','${data.check_out_date}','${data.room_price}')`;
  db.run(sql,[],(err,row) =>{
    if (err) {
      console.log('ERROR fetching from the database:', err);
      return;
    }
  console.log('Request succeeded, new data inserted', data);
  res.status(200).json({
    reservations: data
    });
  });
  console.log("select * from reservations ");
  // TODO: add code here
});



// get `/detailed-invoices'
// TODO: add code here


// get `/reservations/details-between/:from_day/:to_day`
// TODO: add code here

module.exports = router;
