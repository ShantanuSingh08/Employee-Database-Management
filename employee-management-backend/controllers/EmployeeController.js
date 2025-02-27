const Employee = require('../models/Employee');

// Get all employees by company
exports.getAllEmployeesByCompany = async (req, res) => {
    const { company } = req.query;  // Get company name from query string
    try {
        // If company is provided, filter by company, otherwise return an error
        if (!company) {
            return res.status(400).json({ message: "Company name is required" });
        }

        // MongoDB query to filter employees by company
        const employees = await Employee.find({ company: company });

        // If no employees are found for the given company
        if (employees.length === 0) {
            return res.status(404).json({ message: `No employees found for company: ${company}` });
        }

        res.status(200).json(employees);  // Return the employees in the response
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch employees", error: error.message });
    }
};

// Get an employee by ID
exports.getEmployeeById = async (req, res) => {
    try {
        const employee = await Employee.findOne({ where: { id: req.params.id } });
        if (!employee) {
            return res.status(404).json({ message: "Employee not found" });
        }
        res.status(200).json(employee);
    } catch (error) {
        res.status(500).json({ message: "Error fetching employee", error: error.message });
    }
};

// Create a new employee
exports.createEmployee = async (req, res) => {
    const { firstName, lastName, email, company, jobTitle, department, startDate, endDate, salary } = req.body;
    try {
        const newEmployee = await Employee.create({
            firstName,
            lastName,
            email,
            company,
            jobTitle,
            department,
            startDate,
            endDate,
            salary
        });
        res.status(201).json(newEmployee);
    } catch (error) {
        res.status(400).json({ message: "Failed to create employee", error: error.message });
    }
};

// Update an employee by ID
exports.updateEmployee = async (req, res) => {
    const { firstName, lastName, email, company, jobTitle, department, startDate, endDate, salary, isActive } = req.body;
    try {
        const updatedEmployee = await Employee.findByIdAndUpdate(
            req.params.id,  
            { firstName, lastName, email, company, jobTitle, department, startDate, endDate, salary, isActive },
            { new: true }  
        );

        if (!updatedEmployee) {
            return res.status(404).json({ message: "Employee not found" });
        }

        res.status(200).json(updatedEmployee);
    } catch (error) {
        res.status(400).json({ message: "Failed to update employee", error: error.message });
    }
};

// Delete an employee by ID (MongoDB example)
exports.deleteEmployee = async (req, res) => {
    try {
        // Using Mongoose's findByIdAndDelete method
        const deleted = await Employee.findByIdAndDelete(req.params.id); 

        // If no employee is found with the provided ID
        if (!deleted) {
            return res.status(404).json({ message: "Employee not found" });
        }

        // Successfully deleted
        res.status(200).json({ message: "Employee deleted successfully" });
    } catch (error) {
        // Catching any errors and returning them
        res.status(500).json({ message: "Failed to delete employee", error: error.message });
    }
};
