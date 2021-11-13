import { useState } from 'react'
import './Register.css'
function App() {
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')

	async function loginUser(event) {
		event.preventDefault()

		const response = await fetch('http://localhost:1337/api/login', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				email,
				password,
			}),
		})

		const data = await response.json()
        console.log(data);
		if (data.user) {
			alert('Login successful')
			localStorage.setItem('token', data.user)
			window.location.href = '/dashboard' 
		} else {
			alert('Please check your username and password')
		}
	}

	return (
		<div>
		<div  className="heading">
		<h1>MedicAssist</h1>
        <h2>"One Place for all your medical needs"</h2>
		</div>
			<h1>Login</h1>
			<form onSubmit={loginUser}>
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
				<input className="submitButton" type="submit" value="Login" />
			</form>
		</div>
	)
}

export default App