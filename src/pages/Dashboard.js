import {useState, useEffect} from 'react'
import './Dashboard.css'
import { useNavigate } from 'react-router-dom' 
 
import jwt from 'jsonwebtoken'
function App() {
  
  const navigate = useNavigate()
	const [hospital, sethospital] = useState('')
	const [doctor, setdoctor] = useState('')
    const [timeSlot, settimeSlot] = useState('')
    const [date, setdate] = useState('')
    const [token, setToken] = useState('')
    const [location, setLocation] = useState('')
    const [pharmacy1, setpharmacy1] = useState('')
    const [pharmacy2, setpharmacy2] = useState('')
    const [pharmacy3, setpharmacy3] = useState('')
    const [pharmacy4, setpharmacy4] = useState('')
    const [pharmacyadd1, setpharmacyadd1] = useState('')
    const [pharmacyadd2, setpharmacyadd2] = useState('')
    const [pharmacyadd3, setpharmacyadd3] = useState('')
    const [pharmacyadd4, setpharmacyadd4] = useState('')
    const [medicineName, setMedicineName] = useState('')
    const [medicineStartDate, setMedicineStartDate] = useState('')
    const [medicineEndDate, setMedicineEndDate] = useState('')
    const [medicineTime, setMedicineTime] = useState('')

   // const [addpharmacy, setpharmacy] = useState('')
    // add a try and catch here
    useEffect(() => {
      const token = localStorage.getItem('token')
      if (token) {
        window.addEventListener('load', showStatus);
        const user = jwt.decode(token)
        if (!user) {
          localStorage.removeItem('token')
          navigate('/login')
        }
      }
      else {
          navigate('/login')
      }
     // document.getElementsByClassName("bookApointment")[0].style.display = "none";
      //document.getElementsByClassName("pharmacyPart")[0].style.display = "none";
     
    }, [])
    async function submitUserData(event) {
        event.preventDefault()// prevent sending the data of form to some other link
       try {
        const response = await fetch('http://localhost:1337/api/dashboard', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
        'x-access-token': localStorage.getItem('token'),
			},
			body: JSON.stringify({
				hospital,
				doctor,
				timeSlot,
        date
			}),
		})
        const data = await response.json()
        if(data.status === 'ok') {
            alert(data.message + data.token )
             setToken(data.token); 
         }
        else {
          alert("Booking Unsuccessful!!!")
        }
    }
    catch(err) {
      alert("Something Went Wrong!!")
    }
  }
    // code for accessing pharmacy
    const getPharmacy = async () =>  {
      let url = 'https://api.foursquare.com/v2/venues/search?near=';
  let clientId = 'UR452DQYR4ARGSXTUHG4PPANF1E2OHQOXPVOCYZLZCI4WHFZ';
  let clientSecret = 'FMOVRFMKOLFMWCMG5HSWN0XARDN0GD5WEOMNJ5SBDM1H5314';
      let urlToSend = `${url}${location}&limit=6&client_id=${clientId}&client_secret=${clientSecret}&query=pharmacy&v=20211112`;
      try {
      const response = await fetch(urlToSend);
      if(response.ok)
      {  
          const jsonResponse = await response.json();

        setpharmacy1(jsonResponse.response.venues[0].name)
        setpharmacy2(jsonResponse.response.venues[1].name)
        setpharmacy3(jsonResponse.response.venues[2].name)
        setpharmacy4(jsonResponse.response.venues[3].name)
        setpharmacyadd1(jsonResponse.response.venues[0].location.address)
        setpharmacyadd2(jsonResponse.response.venues[1].location.address)
        setpharmacyadd3(jsonResponse.response.venues[2].location.address)
        setpharmacyadd4(jsonResponse.response.venues[3].location.address)
       // setpharmacyadd1(jsonResponse.response.venues[0].name)
        /*  jsonResponse.response.venues.forEach(element => {
            console.log(element.name)
                      return (<p>{element.name}</p>);
            
          });*/
           
      }
      } catch(error) {
          console.log(error)
      }
  }
  function handleLogout() {
    localStorage.removeItem('token')
          navigate('/login')    
  }

  async function sendMedicineTrackingData(event) {
    try {
    const response = await fetch('http://localhost:1337/api/tracker', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
        'x-access-token': localStorage.getItem('token'),
			},
			body: JSON.stringify({
				medicineName,
				medicineStartDate,
				medicineEndDate,
        medicineTime,
        medicineStatus : 0
			}),
		})

    const data = await response.json()
        if(data.status === 'ok') {
          console.log("Data sent successfully")
          alert("Data sent successfully");
        }
        else {
          console.log("Unsuccessful !!! ")
        }

  }
  catch(err) {
    alert("Something Went Wrong!!")
  }
}


  async function showStatus(event) {
    event.preventDefault() 
    document.getElementsByClassName("pharmacyPart")[0].style.display = "none";
    document.getElementsByClassName("bookApointment")[0].style.display = "none";
    document.getElementsByClassName("showStatus")[0].style.display = "block";
    document.getElementsByClassName("medicineTracker")[0].style.display = "none";
    try {
    const req = await fetch('http://localhost:1337/api/dashboard', {
			headers: {
				'x-access-token': localStorage.getItem('token'),
			},
		})

		const data = await req.json()
		if (data.status === 'ok') {
      console.log(data)
			sethospital(data.hospital)
      setdoctor(data.doctor)
      if(data.timeSlot == 'slot1'){
      settimeSlot("9:00 AM to 11:00 AM")
      } else if (data.timeSlot == 'slot2') {
        settimeSlot("11:00 AM to 1:00 PM")
      }
      else if (data.timeSlot == 'slot3') {
        settimeSlot("4:00 PM to 6:00 PM")
      }
      else if (data.timeSlot == 'slot4') {
        settimeSlot("7:00 PM to 9:00 PM")
      }
      else {
        settimeSlot(" ")
      }
      setdate(data.date.slice(0,10))
      setToken(data.token)
		} else if(data.status === 'no') {
       
		}
    }
    catch(err) {
      alert("Something Went Wrong");
    }
   
  }
  async function updateMedicineStatus() {
    try {
    const response = await fetch('http://localhost:1337/api/tracker', {
      method: 'POST',
			headers: {
				'Content-Type': 'application/json',
        'x-access-token': localStorage.getItem('token'),
			},
      body: JSON.stringify({
				 medicineStatus : 1
			}),
		})
    const data = await response.json()
        if(data.status === 'ok') {
          console.log("Medicine Status updated")
          alert("Status Updated");
        }
        else {
          console.log("Unsuccessful !!! ")
        }
      }
      catch(err) {
        alert("Something Went Wrong!!")
      }

  }
  function showBooking(event){
    event.preventDefault()
    document.getElementsByClassName("showStatus")[0].style.display = "none";
    document.getElementsByClassName("pharmacyPart")[0].style.display = "none";
    document.getElementsByClassName("bookApointment")[0].style.display = "block";
    document.getElementsByClassName("medicineTracker")[0].style.display = "none";

  }
  function showPharmacy(event){
    event.preventDefault()
    document.getElementsByClassName("showStatus")[0].style.display = "none";
    document.getElementsByClassName("bookApointment")[0].style.display = "none";
    document.getElementsByClassName("pharmacyPart")[0].style.display = "block";
    document.getElementsByClassName("medicineTracker")[0].style.display = "none";
  }
  function showTracking(event){
    event.preventDefault()
    document.getElementsByClassName("showStatus")[0].style.display = "none";
    document.getElementsByClassName("bookApointment")[0].style.display = "none";
    document.getElementsByClassName("pharmacyPart")[0].style.display = "none";
    document.getElementsByClassName("medicineTracker")[0].style.display = "block";
  }
	return (
    <div>
        <div  className="heading">
		<h1>MedicAssist</h1>
        <h2>"One Place for all your medical needs"</h2>
		</div>
    <div className="navBar">
    <ul>
  <li><a href="" onClick={showStatus} onLoad={showStatus}>Home</a></li>
  <li><a href="" onClick={showBooking}>Booking</a></li>
  <li><a href="" onClick={showPharmacy}>Medicine</a></li>
  <li><a href="" onClick={showTracking}>Medicine Tracker</a></li>
  <li style={{float:"right"}}><a href="" onClick={handleLogout}>Logout</a></li>
</ul>
    </div>
           <div className="pageContent">
          <h1>Welcome to Dashboard</h1>
          <div className="bookApointment">
          <h1>Book your Appointment</h1>
          <form onSubmit={submitUserData}>
              <input list="hospitalName" onChange={(e) => sethospital(e.target.value)} name="hospitalName" placeholder="choose hospital" required /> 
              <datalist id="hospitalName">
                <option value="AIIMS"></option>
                <option value="CMC"></option>
              </datalist> 
              <select name="doctorName" onChange={(e) => setdoctor(e.target.value)} required >
              <option value="" readonly="true" hidden="true" selected>Choose Doctor</option>
               <optgroup label="Cardiologist">
                <option value="Arun Gupta">Arun Gupta</option>
              </optgroup>
              <optgroup label="Gynaecologist">
                <option value="Asha Rai">Asha Rai</option>
              </optgroup>
              <optgroup label="Diabetologist">
                <option value="V Mohan">V Mohan</option>
              </optgroup>
              </select>
            
            <input list="timeSlot" name="timeSlot" onChange={(e) => settimeSlot(e.target.value)} placeholder="choose time slot" required /> 
            <datalist id="timeSlot">
                <option value="slot1">9:00 AM to 11:00 AM</option>
                <option value="slot2">11:00 AM to 1:00 PM</option>
                <option value="slot3">4:00 PM to 6:00 PM</option>
                <option value="slot4">7:00 PM to 9:00 PM</option>
                </datalist>   
          
             <input name="date" onChange={(e) => setdate(e.target.value)} type="date" placeholder="Date" max="2021-12-05" min="2021-12-02" required /> 
             <input className="submitButton" type="submit" value="Submit" required/> 
             
          </form>
          </div>
          <div className="pharmacyPart">
          <h1>Search Nearby Medical Shops</h1>
          <input onChange={(e) => setLocation(e.target.value)} placeholder="enter location" required />
          <button onClick={getPharmacy}>search</button>
           <div id="pharmacyList">
           <h3>{pharmacy1}  {pharmacyadd1}</h3>
           <h3>{pharmacy2}  {pharmacyadd2}</h3>
           <h3>{pharmacy3}  {pharmacyadd3}</h3>
           <h3>{pharmacy4}  {pharmacyadd4}</h3>
           </div>
        </div>
        <div className="showStatus">
          <p>Hospital : {hospital}</p>
          <p>Doctor : {doctor}</p>
          <p>Appointment Date : {date}</p> 
          <p>Consultation timing : {timeSlot}</p>
          <p>Token Number : {token}</p>
        </div>
        <div className="medicineTracker">
        <h1>Track your medicine </h1>
          <input onChange={(e) => setMedicineName(e.target.value)} placeholder="Medicine Name " type="text" required />
          <input onChange={(e) => setMedicineStartDate(e.target.value)} placeholder="Course Start Date " type="date" required />
          <input onChange={(e) => setMedicineEndDate(e.target.value)} placeholder="Course End Date " type="date" required />
          <input onChange={(e) => setMedicineTime(e.target.value)} placeholder="Time" type="time" required />
          <button onClick={sendMedicineTrackingData}>Submit</button>
          <div className="medicineStatus">
          <br/><br/>
          <p>I have taken today's medicine</p>
          <button onClick={updateMedicineStatus}>Confirm</button>
          </div>
        </div>
        </div>
        </div>
        );
        
}
    export default App