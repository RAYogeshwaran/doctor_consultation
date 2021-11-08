import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
        <Route path="/register" element={<Register/>} /> 
        <Route path="/login" element={<Login/>} />
        <Route path="/dashboard" element={<Dashboard/>} />
      </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App;


/*import React from 'react'
import DoctorList from './DoctorList';
import HospitalList from './HospitalList';
import TimeSlot from './TimeSlot';
import DoctorCard from './DoctorCard';
import UserDetails from './UserDetails';
import './App.css'
import Login from './pages/Login';
 class App extends React.Component {
   constructor(props) {
    super(props);
    this.state = {
      hospital : {
        AIIMS : {
        doctors : {
          'Arun Gupta' : {
            slot1 : {
              id : 1,
              curr_token : 10,
              total_token : 25
            },
            slot2 : {
              id : 1,
              curr_token : 10,
              total_token : 25
            },
            slot3 : {
              id : 1,
              curr_token : 10,
              total_token : 25
            },
            slot4 : {
              id : 1,
              curr_token : 10,
              total_token : 25
            },
          },
          'Asha Rai' : {
            slot1 : {
              id : 2,
              curr_token : 25,
              total_token : 25
            },
            slot2 : {
              id : 2,
              curr_token : 8,
              total_token : 25
            },
            slot3 : {
              id : 2,
              curr_token : 8,
              total_token : 25
            },
            slot4 : {
              id : 2,
              curr_token : 8,
              total_token : 25
            },
          },
        }
      }
    },
    userEntry : {
      hospitalName : '',
      doctorName : '',
      timeSlot : '',
      status : 0,
    },
    userData : {
      name : '',
      mobNo : 0
    },
    showUserEntry : 0,
    enterUserData : 0,
    finalMessage : 0 
    };
    this.update_token = this.update_token.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.updateObject = this.updateObject.bind(this);
    this.confirmBooking = this.confirmBooking.bind(this);
    this.onProceed = this.onProceed.bind(this);
    this.getTokenNo = this.getTokenNo.bind(this);
    
   }
    
   update_token(hosName,docName,timeSlot) {
    let curr_token = this.state.hospital[hosName].doctors[docName][timeSlot].curr_token;
    let total_token = this.state.hospital[hosName].doctors[docName][timeSlot].total_token;
    //console.log(curr_token)
    if(curr_token && curr_token < total_token && total_token){
    this.setState({
       hospital: this.updateObject(hosName,docName,timeSlot)
    });
    return 1;
  }
    else return 0;
  }
  updateObject(hos_name,doc_name,timeSlot) {
      let temp = this.state.hospital;
      temp[hos_name].doctors[doc_name][timeSlot].curr_token = temp[hos_name].doctors[doc_name][timeSlot].curr_token+1;
      return (temp);
  }
  getTokenNo(hos_name,doc_name,timeSlot) {
    return this.state.hospital[hos_name].doctors[doc_name][timeSlot].curr_token 
  }
  async onSubmit() {
    //fetch('http://localhost:1337/api/login'
    let hospitalName = (document.querySelector('[name="hospitalName"]').value);
    let doctorName = (document.querySelector('[name="doctorName"]').value);
    let timeSlot = (document.querySelector('[name="timeSlot"]').value);
    
    let status = this.update_token(hospitalName,doctorName,timeSlot);
    this.setState({
      userEntry : {
        hospitalName : hospitalName,
        doctorName : doctorName,
        timeSlot : timeSlot,
        status : status
      }
    });
    this.setState({
      showUserEntry : 1
    });
    const response = await fetch('http://localhost:1337/api/register', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				hospitalName,
				doctorName,
        timeSlot,
        status
			}),
		})

		const data = await response.json()
      console.log(data)
  }
  onProceed () {
    this.setState({
      enterUserData : 1
    });
    
  }
  confirmBooking() {
    let patientName = document.getElementById("patientName").value;
    let mobNumber = document.getElementById("mobNumber").value;
    this.setState({
      userData : {
        name : patientName,
        mobNo : mobNumber
      }
    });
   this.setState({
    finalMessage : 1 
   });  
  }
  render() {
    let hospitalName = ((document.querySelector('[name="hospitalName"]')||{}).value) || "AIIMS";
    let doctorName = ((document.querySelector('[name="doctorName"]')||{}).value) || "Arun Gupta";
    let timeSlot = ((document.querySelector('[name="timeSlot"]')||{}).value) || "slot1";
    let token = this.getTokenNo(hospitalName,doctorName,timeSlot);
    //let hospitalName = (document.querySelector('[name="hospitalName"]').value);
    //let doctorName = (document.querySelector('[name="doctorName"]').value);
    //let timeSlot = (document.querySelector('[name="timeSlot"]').value);
    //let temp = this.state.hospital.AIIMS.doctors['Arun Gupta'].slot1.curr_token;
      
     return (
       <div>
       <Login></Login>
       <div className='heading'>
        <h1>MedicAssist</h1>
        <h2>"One Place for all your medical needs"</h2>
        </div>
        <br></br>
        <HospitalList></HospitalList>
        <DoctorList></DoctorList>
        <TimeSlot></TimeSlot>
        <button onClick={this.onSubmit}>Check Availability</button>
        {this.state.showUserEntry ? <DoctorCard details={this.state.userEntry}></DoctorCard> : null}
        {this.state.showUserEntry ? <button onClick={this.onProceed}>Proceed</button> : null}
        {this.state.enterUserData ? <UserDetails></UserDetails> : null}
        {this.state.enterUserData ? <button onClick={this.confirmBooking}>Confirm Booking</button> : null}
        {this.state.finalMessage ? <h1>Congratulation! You booking is confirmed with token number {token}</h1> : null}
       </div>
    );
   }
   
 }
 

export default App;  */
