import { useEffect, useState } from "react";
import Header from "./Header";
import axios from "axios";
import { useLocalState } from "../Utils/useLocalStorage";
import { POSTURL } from '../Utils/Constants';

function AddEmployee() {
    const [jwt, setJwt]  = useLocalState("", "jwt");

    const [employeeData, setEmployeeData] = useState(null);

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [address, setAddress] = useState("");
    const [age, setAge] = useState(0);
    const [designation, setDesignation] = useState("");
    const [departmentId, setDepartmentId] = useState();
    const [gender, setGender] = useState("");
    const [maritalStatus, setMaritalStatus] = useState("");
    const [dob, setDob] = useState("");

    const [marStatusList, setMarStatusList] = useState("");
    const [genderList, setGenderList] = useState("");
    const [designationList, setDesignationList] = useState("");
    const [departmentList, setDepartmentList] = useState("");
    
    useEffect(() => {
        axios.get(POSTURL+"/dtoData")
            .then((response) =>{
                setEmployeeData(response.data);
                setMarStatusList(response.data.marStatusList);
                setDepartmentList(response.data.departmentList);
                setDesignationList(response.data.designationList);
                setGenderList(response.data.genderList);
            } )
            .catch((error) => console.log(error));
    }, [])

    function sendAddEmployeeRequest(){
        const resBody = {
            "firstName":firstName,
            "lastName":lastName,
            "email":email,
            "address":address,
            "departmentId":departmentId,
            "designation":designation,
            "gender":gender,
            "maritalStatus":maritalStatus,
            "age":age,
            "dateOfBirth":dob
        };
        console.log(resBody);

        alert(resBody.gender)
        axios.post(POSTURL+"/add", resBody )
        .then((response) => {
        window.location="/dashboard";
        });
    }

    // ('#datepicker').datepicker({
    //     uiLibrary: 'bootstrap5'
    // });

    return ( 
        <>
            <Header />
            <main>
        <div className="mx-auto my-4 row justify-content-center g-2">

            <div className="col-sm-5 card">

                <div className="card-body">
                    <h4 className="card-title mb-3">Employee Details</h4>

                    <div className="row mb-2">
                        <div className="col">
                            <input type="text" className="form-control" placeholder="First name" aria-label="First name"
                            value={firstName} onChange={(event) => setFirstName(event.target.value)}/>
                        </div>
                        <div className="col">
                            <input type="text" className="form-control" placeholder="Last name" aria-label="Last name"
                            value={lastName} onChange={(event) => setLastName(event.target.value)}/>
                        </div>
                    </div>

                    <div className="row mb-2">
                        <div className="col">
                            <input type="text" className="form-control" placeholder="Email Address"
                                aria-label="Email Address" value={email} onChange={(event) => setEmail(event.target.value)}/>
                        </div>
                    </div>

                    <div className="row mb-2">
                        <div className="col">
                            <textarea className="form-control" placeholder="Address" rows="3"  value={address} onChange={(event) => setAddress(event.target.value)}></textarea>
                        </div>
                    </div>

                    <div className="row mb-2">
                        <div className="col">
                            <input type="date" placeholder="Date of Birth" id="datepicker" className="w-50"
                            value={dob} onChange={(event) => setDob(event.target.value)} />
                        </div>
                    </div>

                    <div className="row mb-2">
                        <div className="col">
                            <select className="form-select" aria-label="Select Gender" name="gender" onChange={(event) => setGender(event.target.value)}>
                            <option >Select Gender</option>
                            {genderList ? genderList.map((mStatus) => 
                                <option key={mStatus} value={mStatus}>{mStatus}</option>
                            ): <></>}
                            </select>
                        </div>
                        <div className="col">
                            <select className="form-select" aria-label="Select Marital Status" name="maritalStatus" onChange={(event) => setMaritalStatus(event.target.value)}>
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
                            <select className="form-select" aria-label="Select Designation" name="designation" onChange={(event) => setDesignation(event.target.value)}>
                                <option >Select Designation</option>
                                {designationList ? designationList.map((mStatus) => 
                                    <option key={mStatus} value={mStatus}>{mStatus}</option>
                                ): <></>}
                            </select>
                        </div>
                        <div className="col">
                            <select className="form-select" aria-label="Select Marital Status" name="departmentId" onChange={(event) => setDepartmentId(event.target.value)}>
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
    </main>
        </>
     );
}

export default AddEmployee;