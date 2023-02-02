const employeeDB = require('../employeeDB.js');
const Employee = employeeDB.getModel();

module.exports =  async function deleteEmployeeAfterConfirm(req , res , next) {
    
    // Fill in the code
    let id = req.body.id;
	    
    let employee = await Employee.findById(id);
    console.log(employee);

    if (!employee) {
      res.render('404');
      console.log("can't delete")
    } else {
      await employee.remove();
      res.redirect('/employees');
    }
        
  };

  