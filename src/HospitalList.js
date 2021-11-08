import React from 'react'
import './HospitalList.css'
class HospitalList extends React.Component {
  render() {
    return (
        <div >
            
            <label>Hospital Name : </label>
            <input list="hospitalName" name="hospitalName" placeholder="choose hospital" required></input>
             
            <datalist id="hospitalName">
                <option value="AIIMS"></option>
                <option value="CMC"></option>
                </datalist> 
        </div>
    );
  }
}


export default HospitalList;
