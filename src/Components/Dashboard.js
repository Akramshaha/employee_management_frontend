import axios from "axios";
import { useEffect, useState } from "react";
import { POSTURL } from '../Utils/Constants';
import { useLocalState } from "../Utils/useLocalStorage";
import Header from "./Header";

function Dashboard() {
    const [jwt, setJwt]  = useLocalState("", "jwt");
    const [employees, setEmployees] = useState(null);
    console.log(POSTURL);

    useEffect(() => {
        axios.get(POSTURL+"/all")
            .then((response) =>{
                setEmployees(response.data);
            })
            .catch((error) => console.log(error));
    }, [])



    return ( 
        <>
            <Header />

            <main>
                <div class="container my-4">

                    <div class="row mb-2">
                        <div class="col-sm-6">
                                <h4 class="dark"> Employee List </h4>
                                <a className="btn btn-primary float-left" href="/addEmployee"> Add New Employee</a>
                        </div>
                        <div class="col-sm-6 text-end">
                            <div id="filter-section">
                                <div id="filter" data-bs-toggle="collapse" href="#filterCollapse"
                                        role="button" aria-expanded="false"
                                        aria-controls="filterCollapse">
                                        
                                        <span class="me-3 fs-5 align-middle"> Filter </span>
                                </div>

                                <div class="collapse multi-collapse my-2" id="filterCollapse">
                                    <div class="card card-body">
                                        <div class="text-start">
                                            <label for="" class="form-label">First name</label>
                                            <input type="text"
                                                    class="form-control form-control-sm mb-3"
                                                    name="" id="" aria-describedby="helpId"
                                                    placeholder="Type first name" />


                                            <label for="" class="form-label">Year of Birth</label>
                                            <input class="form-control mb-3"
                                                    list="yearOptions"
                                                    placeholder="Type to search year..."/>
                                            <datalist id="yearOptions">
                                                    <option value="San Francisco" />
                                                    <option value="New York" />
                                                    <option value="Seattle" />
                                                    <option value="Los Angeles" />
                                                    <option value="Chicago"  />
                                            </datalist>

                                            {/* <label for="" class="form-label">Age</label>
                                            <p class="multi-range mb-3">
                                                    <input type="range" min="18" max="100"
                                                            value="18" id="lower">
                                                    <input type="range" min="18" max="100"
                                                            value="100" id="upper">
                                            </p> */}

                                            <button type="submit"
                                                    class="btn btn-primary">Apply</button>
                                        </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>

                        <table class="table text-center">
                                <thead>
                                        <tr class="table-dark">
                                                <th scope="col">ID</th>
                                                <th scope="col">First Name</th>
                                                <th scope="col">Last Name</th>
                                                <th scope="col">Email</th>
                                                <th scope="col">Designation</th>
                                                <th scope="col">Action</th>
                                        </tr>
                                </thead>
                                <tbody>
                                {employees ? employees.map((employee) => 
                                    
                                        <tr class="table-secondary" key={employee.id}>
                                                <th scope="row">{employee.id}</th>
                                                <td>{employee.firstName}</td>
                                                <td>{employee.lastName}</td>
                                                <td>{employee.email}</td>
                                                <td>{employee.designation}</td>
                                                <td class="text-center">
                                                        
                                                <button className="btn btn-info"
                                                            onClick={() => {
                                                                window.location.href = `/employee/${employee.id}`
                                                            }}>EDIT</button>
                                                </td>
                                        </tr>
                                        ): <></>}
                                        
                                </tbody>
                        </table>
                </div>
        </main>
        </>
       
        
     );
}

export default Dashboard;