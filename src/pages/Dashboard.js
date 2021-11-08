import {useState} from 'react'
function App() {
	const [hospital, sethospital] = useState('')
	const [doctor, setdoctor] = useState('')
    const [timeSlot, settimeSlot] = useState('')
    const [date, setdate] = useState('')
    
    async function submitUserData(event) {
        event.preventDefault()// prevent sending the data of form to some other link

        const response = await fetch('http://localhost:1337/api/dashboard', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				hospital,
				doctor,
				timeSlot,
        date
			}),
		})
        const data = await response.json()
        console.log(data)
        if(data.status === 'ok') {
            console.log("booking successful with token number "+ data.token )
        }
        else {
            console.log("Booking Unsuccessful!!!")
        }


    }
	return (
        <div>
          <h1>Welocme to Dashboard</h1>
          <form onSubmit={submitUserData}>
              <label>Hospital Name </label>
              <input list="hospitalName" onChange={(e) => sethospital(e.target.value)} name="hospitalName" placeholder="choose hospital" required /> 
              <datalist id="hospitalName">
                <option value="AIIMS"></option>
                <option value="CMC"></option>
              </datalist> 
              <label>Doctor  </label>
              <input list="doctorName" onChange={(e) => setdoctor(e.target.value)} name="doctorName" placeholder="choose doctor" required/> 
              <datalist id="doctorName">
                <option value="Arun Gupta"></option>
                <option value="Asha Rai"></option>
              </datalist>
              <label>Time Slot :  </label>
            <input list="timeSlot" name="timeSlot" onChange={(e) => settimeSlot(e.target.value)} placeholder="choose time slot" required /> 
            <datalist id="timeSlot">
                <option value="slot1">9:00 AM to 11:00 AM</option>
                <option value="slot2">11:00 AM to 1:00 PM</option>
                <option value="slot3">4:00 PM to 6:00 PM</option>
                <option value="slot4">7:00 PM to 9:00 PM</option>
                </datalist>   
             <label>Date for Appointment</label>
             <input name="date" onChange={(e) => setdate(e.target.value)} type="date" required /> 
             <input type="submit" value="Submit" required/> 
             <input type="button" value="Sign Out" required/> 
          </form>
        </div>
        );
}
    export default App