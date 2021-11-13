import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './Register.css'
function App() {
	const navigate = useNavigate()

	const [name, setName] = useState('')
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')

	async function registerUser(event) {
		event.preventDefault()

		const response = await fetch('http://localhost:1337/api/register', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				name,
				email,
				password,
			}),
		})

		const data = await response.json()

		if (data.status === 'ok') {
			navigate('/login')
		}
		else if(data.status === 'error') {
			alert("Email Already Exist!!!")
		}
	}

	return (
		<div>
		<div  className="heading">
		<h1>MedicAssist</h1>
        <h2>"One Place for all your medical needs"</h2>
		</div>
		<h1>Register as new user</h1>
			
			<form onSubmit={registerUser}>
				<input
					value={name}
					onChange={(e) => setName(e.target.value)}
					type="text"
					placeholder="Name"
				/>
				<br />
				<input
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					type="email"
					placeholder="Email"
				/>
				<br />
				<input
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					type="password"
					placeholder="Password"
				/>
				<br />
				 <input className="submitButton" type="submit" value="Register" /> 
			</form>
		</div>
	)
}

export default App