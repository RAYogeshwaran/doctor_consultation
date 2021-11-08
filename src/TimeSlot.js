import React from 'react'
import './HospitalList.css'
class TimeSlot extends React.Component {
  render() {
    return (
        <div>
             
            <label>Time Slot :  </label>
            <input list="timeSlot" name="timeSlot" placeholder="choose time slot" required></input>
             
            <datalist id="timeSlot">
                <option value="slot1">9:00 AM to 11:00 AM</option>
                <option value="slot2">11:00 AM to 1:00 PM</option>
                <option value="slot3">4:00 PM to 6:00 PM</option>
                <option value="slot4">7:00 PM to 9:00 PM</option>
                </datalist>  
        </div>
    );
  }
}


export default TimeSlot;