const employeeDB = require('../employeeDB.js');
const Employee = employeeDB.getModel();

module.exports = async function editEmployee(req , res , next){

    // Fill in the code
    let id = req.params.id;

    let employee = await Employee.findById(id);
     
     if (!employee){
              res.render('404');
         }
      else {
              res.render('editEmployeeView',
              {title:"Edit the employee", 
               data: {id: employee._id,
                      firstName: employee.firstName,
                      lastName: employee.lastName
                    }
                   });                
      }

    
};

