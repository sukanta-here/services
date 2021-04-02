const sql = require("./db.js");

// constructor
const employee = function(employee) {
  this.email = employee.email;
  this.emp_name = employee.emp_name;
  this.salary = employee.salary;
};

employee.create = (newemployee, result) => {

  sql.query("INSERT INTO employee SET ?", newemployee, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created employee: ", { emp_id: res.insertId, ...newemployee });
    result(null, { emp_id: res.insertId, ...newemployee });
  });
};

employee.findById = (employeeId, result) => {
  sql.query(`SELECT * FROM employee WHERE emp_id = ${employeeId}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found employee: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found employee with the id
    result({ kind: "not_found" }, null);
  });
};

employee.getAll = result => {
  sql.query("SELECT * FROM employee", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("employee: ", res);
    result(null, res);
  });
};

employee.updateById = (emp_id, employee, result) => {
  sql.query(
    "UPDATE employee SET email = ?, emp_name = ?, salary = ? WHERE emp_id = ?",
    [employee.email, employee.emp_name, employee.salary, emp_id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found employee with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated employee: ", { emp_id: emp_id, ...employee });
      result(null, { emp_id: emp_id, ...employee });
    }
  );
};

employee.remove = (emp_id, result) => {
  sql.query("DELETE FROM employee WHERE emp_id = ?", emp_id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found employee with the emp_id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted employee with emp_id: ", emp_id);
    result(null, res);
  });
};

employee.removeAll = result => {
  sql.query("DELETE FROM employee", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} employee`);
    result(null, res);
  });
};

module.exports = employee;