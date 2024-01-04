import { useEffect, useState } from "react";
import Header from "./Header";
import axios from "axios";
import { useLocalState } from "../Utils/useLocalStorage";
import { POSTURL } from '../Utils/Constants';

function EditEmployee() {
    const [jwt, setJwt]  = useLocalState("", "jwt");

    const employeeId = window.location.href.split("/employee/")[1];

    const [employeeData, setEmployeeData] = useState(null);

    const [marStatusList, setMarStatusList] = useState("");
    const [genderList, setGenderList] = useState("");
    const [designationList, setDesignationList] = useState("");
    const [departmentList, setDepartmentList] = useState("");
    
    useEffect(() => {

        axios.get(POSTURL+`/get/${employeeId}`)
            .then((response) =>{
                console.log(response);
                setEmployeeData(response.data);
            } )
            .catch((error) => console.log(error));

            axios.get(POSTURL+"/dtoData")
            .then((response) =>{
                setMarStatusList(response.data.marStatusList);
                setDepartmentList(response.data.departmentList);
                setDesignationList(response.data.designationList);
                setGenderList(response.data.genderList);
            } )
            .catch((error) => console.log(error));
    }, [])

    function updateEmployeeVal(prop, value){
        const newAssignment = {...employeeData};
        newAssignment[prop] = value;
        setEmployeeData(newAssignment);
        //console.log(assignment);
    }

    function sendAddEmployeeRequest(){
        employeeData.id = employeeId;
        alert(employeeData.id);

        axios.put(POSTURL+"/update", employeeData )
        .then((response) => {
            setEmployeeData(response.data);
            window.location="/dashboard";
        });


    }

    return ( 
        <>
            <Header />

            <main>
            {employeeData ? (
        <div className="mx-auto my-4 row justify-content-center g-2">

            <div className="col-sm-5 card">

                <div className="card-body">
                    <h4 className="card-title mb-3">Update Employee Details</h4>

                    <div className="row mb-2">
                        <div className="col">
                            <input type="text" className="form-control" placeholder="First name" aria-label="First name"
                            value={employeeData.firstName} onChange={(e) => updateEmployeeVal("firstName",e.target.value)}/>
                        </div>
                        <div className="col">
                            <input type="text" className="form-control" placeholder="Last name" aria-label="Last name"
                            value={employeeData.lastName} onChange={(e) => updateEmployeeVal("lastName",e.target.value)}/>
                        </div>
                    </div>

                    <div className="row mb-2">
                        <div className="col">
                            <input type="text" className="form-control" placeholder="Email Address"
                                aria-label="Email Address" value={employeeData.email} onChange={(e) => updateEmployeeVal("email",e.target.value)}/>
                        </div>
                    </div>

                    <div className="row mb-2">
                        <div className="col">
                            <textarea className="form-control" placeholder="Address" rows="3"  value={employeeData.address} onChange={(e) => updateEmployeeVal("address",e.target.value)}></textarea>
                        </div>
                    </div>

                   
                    <div className="row mb-2">
                        <div className="col">
                            <select className="form-select" aria-label="Select Gender" name="gender" value={employeeData.gender} onChange={(e) => updateEmployeeVal("gender",e.target.value)}>
                            <option >Select Gender</option>
                            {genderList ? genderList.map((mStatus) => 
                                <option key={mStatus} value={mStatus}>{mStatus}</option>
                            ): <></>}
                            </select>
                        </div>
                        <div className="col">
                            <select className="form-select" aria-label="Select Marital Status" name="maritalStatus" value={employeeData.maritalStatus} onChange={(e) => updateEmployeeVal("maritalStatus",e.target.value)}>
                                <option >Select Marital Status</option>
                                {marStatusList ? marStatusList.map((mStatus) => 
                                    <option key={mStatus} value={mStatus}>{mStatus}</option>
                                ): <></>}
                            </select>
                        </div>
                    </div>

                    <br />
                    <h5 className="card-title mb-3">Work Details</h5>
                    
                    <div className="row mb-4">
                        <div className="col">
                            <select className="form-select" aria-label="Select Designation" name="designation" value={employeeData.designation} onChange={(e) => updateEmployeeVal("designation",e.target.value)}>
                                <option >Select Designation</option>
                                {designationList ? designationList.map((mStatus) => 
                                    <option key={mStatus} value={mStatus}>{mStatus}</option>
                                ): <></>}
                            </select>
                        </div>
                        <div className="col">
                            <select className="form-select" aria-label="Select Marital Status" name="departmentId" value={employeeData.departmentId} onChange={(e) => updateEmployeeVal("departmentId",e.target.value)}>
                                <option>Select Department</option>
                                {departmentList ? departmentList.map((mStatus) => 
                                    <option key={mStatus.id} value={mStatus.id}>{mStatus.deptName}</option>
                                ): <></>}
                            </select>
                        </div>
                    </div>

                    <div className="row mb-2">
                        <div className="col text-end">
                            <button type="submit" className="btn btn-primary" onClick={() => sendAddEmployeeRequest()}>submit</button>
                        </div>
                        <div className="col text-start">
                            <button type="submit" className="btn btn-secondary" onClick={() => window.location="/dashboard"}>back</button>
                        </div>
                    </div>
                </div>

            </div>
        </div>
        ):<></>}
    </main>

            {/* <div className="container">
            <div className="card col-md-12">
                <div className="card-header">
                    Add New Employee
                </div>
                <div className="card-body">
                {employeeData ? (
                <div className="form-body">
                    <div className="row">
                        <div className="form-holder">
                            <div className="form-content">
                                <div className="form-items">
                                    <form className="requires-validation" novalidate>

                                        <div className="col-md-12">
                                        <input className="form-control" type="text" placeholder="First Name" 
                                                value={employeeData.firstName} onChange={(e) => updateEmployeeVal("firstName",e.target.value)} />
                                        </div>
                                        <div className="col-md-12">
                                        <input className="form-control" type="text" name="lastName" placeholder="Last Name" 
                                                value={employeeData.lastName} onChange={(e) => updateEmployeeVal("lastName",e.target.value)}/>
                                        </div>

                                        <div className="col-md-12">
                                            <input className="form-control" type="text" name="address" placeholder=" Address" 
                                                value={employeeData.address} onChange={(e) => updateEmployeeVal("address",e.target.value)}/>
                                            
                                        </div>

                                        <div className="col-md-12">
                                            <select className="form-select mt-3" value={employeeData.maritalStatus}  name="maritalStatus" onChange={(e) => updateEmployeeVal("maritalStatus",e.target.value)} >
                                                <option>-- SELECT Marital Status --</option>
                                                {marStatusList ? marStatusList.map((mStatus) => 
                                                    <option key={mStatus} value={mStatus}>{mStatus}</option>
                                                ): <></>}
                                                </select>
                                            
                                        </div>

                                        <div className="col-md-12">
                                            <select className="form-select mt-3" value={employeeData.designation} name="designation" onChange={(e) => updateEmployeeVal("designation",e.target.value)}>
                                                <option >-- SELECT Designation --</option>
                                                {designationList ? designationList.map((mStatus) => 
                                                    <option key={mStatus} value={mStatus}>{mStatus}</option>
                                                ): <></>}
                                                </select>
                                            
                                        </div>

                                        <div className="col-md-12">
                                            <select className="form-select mt-3" name="departmentId" value={employeeData.departmentId} onChange={(e) => updateEmployeeVal("departmentId",e.target.value)}>
                                                <option >-- SELECT Department --</option>
                                                {departmentList ? departmentList.map((mStatus) => 
                                                    <option key={mStatus.id} value={mStatus.id}>{mStatus.deptName}</option>
                                                ): <></>}
                                                </select>
                                            
                                        </div>

                                        

                                       
                                        <div className="form-button mt-3">
                                            <button id="submit" type="submit" className="btn btn-primary" onClick={() => sendAddEmployeeRequest()}>Add New Employee</button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                ):<></>}

                </div>
            </div>
            </div> */}
        </>
     );
}

export default EditEmployee;