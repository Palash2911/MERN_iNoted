import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom'

const Login = (props) => {

    const [credentials, setCredentials] = useState({email: "", password: ""})

    // UseHistory hook - for redirecting
    let histo = useNavigate();

    const onChange=(e)=>{
        setCredentials({...credentials, [e.target.name]: e.target.value})
    }

    const handlesubmit = async (e)=>{
        e.preventDefault();
        const response = await fetch(`http://localhost:5000/api/authen/login`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({email: credentials.email, password: credentials.password})
          });
        const jsons = await response.json();
        console.log(jsons)

        if(jsons.success)
        {
            // Save Auth Token and Redirect
            localStorage.setItem('token', jsons.authtoken);
            histo("/")
            props.showAlert("Login Succesfull ", "success")
        }
        else
        {
            props.showAlert("Invalid Credentials !! ", "danger")
        }
    }

  return (
    <div>
      <form onSubmit={handlesubmit}>
        <div className="mb-3">
            <label htlmfor="email" className="form-label">Email address</label>
            <input type="email" className="form-control" value={credentials.email} onChange={onChange} id="email" name="email" aria-describedby="emailHelp" required/>
        </div>
        <div className="mb-3">
            <label htlmfor="password" className="form-label">Password</label>
            <input type="password" className="form-control" onChange={onChange} value={credentials.password} id="password" name="password" required/>
        </div>
        <button type="submit" className="btn btn-primary">Submit</button> 
        </form>
    </div>
  )
}

export default Login
