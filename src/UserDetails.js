import React from 'react'
import './UserDetails.css'
class UserDetails extends React.Component {
  render() {
   // let data = this.props.data;
    return (
        <div id="userDetails">
          <h1>Fill your details: </h1>
          <label>Enter Patient Name : </label>
          <input type="text" id="patientName"></input>
          <label>Enter Mobile Number : </label>   
          <input type="number" id="mobNumber"></input>
        </div>
    );
  }
}


export default UserDetails;
