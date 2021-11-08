import React from 'react'
import './HospitalList.css'
class DoctorList extends React.Component {
  render() {
    return (
        <div>
            
            <label>Doctor : </label>
            <input list="doctorName" name="doctorName" placeholder="choose doctor" required></input>
            
            <datalist id="doctorName">
                <option value="Arun Gupta"></option>
                <option value="Asha Rai"></option>
                </datalist> 
        </div>
    );
  }
}


export default DoctorList;
