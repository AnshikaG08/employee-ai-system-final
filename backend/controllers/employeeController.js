const Employee = require(
  "../models/Employee"
);


// ADD EMPLOYEE
const addEmployee = async (
  req,
  res
) => {

  try {

    const {

      name,

      email,

      department,

      skills,

      performanceScore,

      experience,

    } = req.body;


    const employeeExists =
      await Employee.findOne({
        email,
      });

    if (employeeExists) {

      return res.status(400).json({
        message:
          "Employee already exists",
      });
    }


    const employee =
      await Employee.create({

        name,

        email,

        department,

        skills,

        performanceScore,

        experience,
      });


    res.status(201).json(
      employee
    );

  } catch (error) {

    res.status(500).json({

      message:
        "Error adding employee",
    });
  }
};


// GET EMPLOYEES
const getEmployees = async (
  req,
  res
) => {

  try {

    const employees =
      await Employee.find();

    res.status(200).json(
      employees
    );

  } catch (error) {

    res.status(500).json({

      message:
        "Error fetching employees",
    });
  }
};


// UPDATE EMPLOYEE
const updateEmployee = async (
  req,
  res
) => {

  try {

    const updatedEmployee =
      await Employee.findByIdAndUpdate(

        req.params.id,

        req.body,

        {
          new: true,
        }
      );

    res.status(200).json(
      updatedEmployee
    );

  } catch (error) {

    res.status(500).json({

      message:
        "Error updating employee",
    });
  }
};


// DELETE EMPLOYEE
const deleteEmployee = async (
  req,
  res
) => {

  try {

    await Employee.findByIdAndDelete(
      req.params.id
    );

    res.status(200).json({

      message:
        "Employee deleted",
    });

  } catch (error) {

    res.status(500).json({

      message:
        "Error deleting employee",
    });
  }
};


// ANALYTICS
const getAnalytics = async (
  req,
  res
) => {

  try {

    const employees =
      await Employee.find();

    const totalEmployees =
      employees.length;


    const avgPerformance =

      employees.reduce(

        (acc, emp) =>

          acc +
          emp.performanceScore,

        0

      ) / employees.length;


    res.status(200).json({

      totalEmployees,

      avgPerformance,
    });

  } catch (error) {

    res.status(500).json({

      message:
        "Error fetching analytics",
    });
  }
};


// RANKINGS
const getRankings = async (
  req,
  res
) => {

  try {

    const rankings =
      await Employee.find().sort({

        performanceScore: -1,
      });

    res.status(200).json(
      rankings
    );

  } catch (error) {

    res.status(500).json({

      message:
        "Error fetching rankings",
    });
  }
};


module.exports = {

  addEmployee,

  getEmployees,

  updateEmployee,

  deleteEmployee,

  getAnalytics,

  getRankings,
};