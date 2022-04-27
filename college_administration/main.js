//Main Class

const express = require('express');
var sql = express();
const bodyParser = require('body-parser');
const mysql = require('mysql');
const { json } = require('express/lib/response');
sql.use(bodyParser.json());

// Connection Configurations
var con = mysql.createConnection({
host: 'localhost',
user: 'root',
password: 'Aditya@123',
database: 'jan'
});

// Connect to Database
con.connect((err)=>{
   
    if(!err)
    console.log("Connected...")
    else
    console.log('Connection Fail :'+json.stringify(err,undefined,2));
    
}); 

// Add student with following details and also  Assign a student to a department, also to a course
    
sql.post('/Student', function (req, res) {
    let data ={ stud_id:req.body.stud_id,dept_id:req.body.dept_id,cour_id:req.body.cour_id,name:req.body.name,dob:req.body.dob,phon_no:req.body.phon_no,address:req.body.address,yoj:req.body.yoj};
      let sqlQuery = "INSERT INTO Student SET ?";

       let query = con.query(sqlQuery, data,(err, results) => {

          if(!err)
          console.log('inserted successfully');
          else
        console.log(err);
      });
            
     });

// Add teacher with following details and also Assign a teacher to a department, also to a course

sql.post('/teacher', function (req, res) {
    let data ={ teac_id:req.body.stud_id,dept_id:req.body.dept_id,cour_id:req.body.cour_id,name:req.body.name,dob:req.body.dob,phon_no:req.body.phon_no,address:req.body.address};
        let sqlQuery = "INSERT INTO teacher SET ?";
  
         let query = con.query(sqlQuery, data,(err, results) => {
  
            if(!err)
            console.log('inserted successfully');
            else
          console.log(err);
    });
              
});

// Get list of teachers sorted by department

sql.get('/teacher', function (req, res) {

    con.query('select * from teacher order by dept_id asc',(err,rows,fields)=>{

    if(!err)
    console.log(rows);
    else
    console.log(err);
  });
});

//Get list of current students filtered by department, year and/or courses

sql.get('/Student', function (req, res) {

  con.query('select * from Student order by dept_id,yoj',(err,rows,fields)=>{

  if(!err)
  console.log(rows);
  else
  console.log(err);
 });
});

  //  Delete a particular student data

sql.delete('/Student/:stud_id', function (req, res) {

    con.query('delete from Student where stud_id=?',[req.params.stud_id],(err,rows,fields)=>{
    
        if(!err)
        console.log('deleted successfully');
        else
      console.log(err);
    });
  });

  //  Update a particular student data

sql.put('/Student/:stud_id', function (req, res) {

  con.query('update Student set name=? where stud_id=?',[req.body.name,req.params.stud_id],(err,rows,fields)=>{
  
      if(!err)
      console.log('update successfully');
      else
    console.log(err);
  });
});
                                
// set port
sql.listen(3001, function () {
console.log(' Node app is running on port 3001');
});
module.exports = sql;