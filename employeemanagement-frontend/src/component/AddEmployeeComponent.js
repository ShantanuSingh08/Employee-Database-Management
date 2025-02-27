import React, { useState, useEffect } from 'react';
import EmployeeService from '../service/EmployeeService';
import { Link, useNavigate, useParams } from 'react-router-dom';

const AddEmployeeComponent = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [company, setCompany] = useState('');
    const [jobTitle, setJobTitle] = useState('');
    const [department, setDepartment] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [salary, setSalary] = useState('');
    const navigate = useNavigate();
    const { id } = useParams();

    const employeeData = { firstName, lastName, email, company, jobTitle, department, startDate, endDate, salary }; 

    /** Send data to API and navigate when successful */
    function saveEmployee(e) {
        e.preventDefault();

        if (
            firstName &&
            lastName &&
            email &&
            company &&
            jobTitle &&
            department &&
            startDate &&
            salary
        ) {
            /** If id is present in the parameter, it should update; else, it should save */
            if (id) {
                EmployeeService.updateEmployee(id, employeeData)
                    .then(() => navigate("/employee"))
                    .catch(e => console.log(e));
            } else {
                EmployeeService.saveEmployee(employeeData)
                    .then(() => navigate("/employee"))
                    .catch(e => console.log(e));
            }
        } else {
            alert("Please, fill in all required fields.");
        }
    }

    function title() {
        return id ? "Update Employee" : "Add Employee";
    }

    useEffect(() => {

        const storedCompany = localStorage.getItem('companyName');
        if (storedCompany) {
            setCompany(storedCompany);
        } else {
            alert("No company name found in local storage.");
        }
        
        if (id) {
            EmployeeService.getEmployeeById(id)
                .then(res => {
                    const { firstName, lastName, email, company, jobTitle, department, startDate, endDate, salary } = res.data;
                    setFirstName(firstName);
                    setLastName(lastName);
                    setEmail(email);
                    setCompany(company);
                    setJobTitle(jobTitle);
                    setDepartment(department);
                    setStartDate(startDate);
                    setEndDate(endDate);
                    setSalary(salary);
                })
                .catch(e => console.log(e));
        }
    }, [id]);

    return (
        <div>
            <div className='container mt-5'>
                <div className='row'>
                    <div className='card col-md-8 offset-md-2'>
                        <h2 className='text-center'>{title()}</h2>
                        <div className='card-body'>
                            <form>
                                <div className='form-group mb-2'>
                                    <input
                                        className='form-control'
                                        value={firstName}
                                        onChange={(e) => setFirstName(e.target.value)}
                                        type="text"
                                        placeholder='Enter First Name'
                                        required
                                    />
                                </div>
                                <div className='form-group mb-2'>
                                    <input
                                        className='form-control'
                                        value={lastName}
                                        onChange={(e) => setLastName(e.target.value)}
                                        type="text"
                                        placeholder='Enter Last Name'
                                        required
                                    />
                                </div>
                                <div className='form-group mb-2'>
                                    <input
                                        className='form-control'
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        type="email"
                                        placeholder='Enter Email'
                                        required
                                    />
                                </div>
                                <div className='form-group mb-2'>
                                    <input
                                        className='form-control'
                                        value={jobTitle}
                                        onChange={(e) => setJobTitle(e.target.value)}
                                        type="text"
                                        placeholder='Enter Job Title'
                                        required
                                    />
                                </div>
                                <div className='form-group mb-2'>
                                    <input
                                        className='form-control'
                                        value={department}
                                        onChange={(e) => setDepartment(e.target.value)}
                                        type="text"
                                        placeholder='Enter Department'
                                        required
                                    />
                                </div>
                                <div className='form-group mb-2'>
                                    <input
                                        className='form-control'
                                        value={startDate}
                                        onChange={(e) => setStartDate(e.target.value)}
                                        type="date"
                                        placeholder='Enter Start Date'
                                        required
                                    />
                                </div>
                                <div className='form-group mb-2'>
                                    <input
                                        className='form-control'
                                        value={endDate}
                                        onChange={(e) => setEndDate(e.target.value)}
                                        type="date"
                                        placeholder='Enter End Date (Optional)'
                                    />
                                </div>
                                <div className='form-group mb-2'>
                                    <input
                                        className='form-control'
                                        value={salary}
                                        onChange={(e) => setSalary(e.target.value)}
                                        type="number"
                                        placeholder='Enter Salary'
                                        required
                                    />
                                </div>
                                <button onClick={(e) => saveEmployee(e)} className='btn btn-success'>
                                    Save
                                </button>{" "}
                                <Link to={"/employee"} className='btn btn-danger'>
                                    Cancel
                                </Link>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddEmployeeComponent;
