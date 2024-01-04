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

                                                        {/* <svg class="mx-2" xmlns="http://www.w3.org/2000/svg" x="0px"
                                                                y="0px" width="20" height="20" viewBox="0 0 30 30">
                                                                <path
                                                                        d="M 14.984375 2.4863281 A 1.0001 1.0001 0 0 0 14 3.5 L 14 4 L 8.5 4 A 1.0001 1.0001 0 0 0 7.4863281 5 L 6 5 A 1.0001 1.0001 0 1 0 6 7 L 24 7 A 1.0001 1.0001 0 1 0 24 5 L 22.513672 5 A 1.0001 1.0001 0 0 0 21.5 4 L 16 4 L 16 3.5 A 1.0001 1.0001 0 0 0 14.984375 2.4863281 z M 6 9 L 7.7929688 24.234375 C 7.9109687 25.241375 8.7633438 26 9.7773438 26 L 20.222656 26 C 21.236656 26 22.088031 25.241375 22.207031 24.234375 L 24 9 L 6 9 z">
                                                                </path>
                                                        </svg> */}
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