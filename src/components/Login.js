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
        const response = await fetch(`http://localhost:3000/api/authen/login`, {
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
    <div className="container my-3 d-flex flex-column align-items-center">
      <h2>Login To Continue </h2>
      <form onSubmit={handlesubmit} className="my-4" style={{width: '50%'}}>
        <div className="mb-3">
            <input type="email" className="form-control" value={credentials.email} onChange={onChange} id="email" name="email" aria-describedby="emailHelp" placeholder='Enter Email-Id' required/>
        </div>
        <div className="mb-3 my-4">
            <input type="password" className="form-control" onChange={onChange} value={credentials.password} id="password" name="password" placeholder='Enter Password' required/>
        </div>
        <button type="submit" className="btn btn-primary">Submit</button> 
        </form>
    </div>
  )
}

export default Login