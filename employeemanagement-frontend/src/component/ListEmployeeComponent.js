import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import EmployeeService from '../service/EmployeeService';
import AuthService from '../service/AuthService'; 

const ListEmployeeComponent = () => {
    const [employeeArray, setEmployeeArray] = useState([]);
    const navigate = useNavigate(); 



    function getAllEmployee() {
        const companyName = localStorage.getItem('companyName');  
        if (companyName) {
            EmployeeService.getAllEmployee()
                .then(response => {
                    setEmployeeArray(response.data);
                })
                .catch(e => {
                    console.log("Error fetching employees:", e);
                });
        } else {
            console.log('No company name found in localStorage');
        }
    }

    function deleteEmployee(e, id) {
        e.preventDefault();
        EmployeeService.deleteEmployee(id)
        .then(() => {
            window.location.reload();  
            })
        .catch(e => console.log(e));
    }

    function handleLogout() {
        AuthService.logout(); 
        navigate('/login'); 
    }

    useEffect(() => {
        getAllEmployee();
    }, []);
    
    return (
        <div className='container'>
            <Link to={"/add-employee"} className='btn btn-primary mb-2 mt-3'>
                Add Employee
            </Link>

            <button onClick={handleLogout} className='btn btn-secondary mb-2 mt-3' style={{marginLeft: '1000px', backgroundColor:'red'}}>
                Logout
            </button>

            <h2 className='text-center mb-4'>List Employee</h2>
            <table className='table table-bordered table-striped'>
                <thead>
                    <th>Employee ID</th>
                    <th>Employee First Name</th>
                    <th>Employee Last Name</th>
                    <th>Employee Email</th>
                    <th>Actions</th>
                </thead>
                <tbody>
                    {employeeArray.map(employee =>
                        <tr key={employee.id}>
                            <td>{employee._id}</td>
                            <td>{employee.firstName}</td>
                            <td>{employee.lastName}</td>
                            <td>{employee.email}</td>
                            <td>
                                <Link to={`/add-employee/${employee._id}`} className='btn btn-info'>
                                    Update
                                </Link> {" "}
                                <a onClick={(e) => deleteEmployee(e, employee._id)} className='btn btn-danger'>
                                    Delete
                                </a>
                            </td>
                        </tr>)}
                </tbody>
            </table>
        </div>
    );
};

export default ListEmployeeComponent;
