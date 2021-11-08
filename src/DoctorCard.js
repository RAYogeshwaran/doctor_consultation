import React from 'react'
import './DoctorCard.css'
class DoctorCard extends React.Component {
 
    render() {
       let data = this.props.details;
       let time;
       if(data.timeSlot === 'slot1') 
        time = '9:00 AM to 11:00 AM'
        else if(data.timeSlot === 'slot2')
        time = '11:00 AM to 1:00 PM'
        else if(data.timeSlot === 'slot3')
        time = '4:00 PM to 6:00 PM'
        else if(data.timeSlot === 'slot4')
        time = '7:00 PM to 9:00 PM'
        else time = ''
    return (
        <div>
            <h1 id="doctorCardHeading">Appointment Details </h1> 
            <div id="doctorCard">
            <h1>Hospital's Name: <span>{data.hospitalName}</span></h1>
            <h1>Doctor: <span>{data.doctorName}</span></h1>
            <h1>Consultation Timings: <span>{time}</span></h1>
            <h1>Status : <span>{data.status ? 'Available' : 'Not Available'}</span></h1>
             </div>
        </div>
    );
  }
}


export default DoctorCard;
