const employeeDB = require('../employeeDB.js');
const Employee = employeeDB.getModel();

module.exports =  
    // Fill in the code
  async function saveEmployee(req,res,next){
  
    let employee = new Employee({
      firstName:     req.body.fname,
      lastName:      req.body.lname,
    }); 
 
    await employee.save();


    res.redirect('/employees');
  }

    

