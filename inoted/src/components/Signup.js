import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom'

const Signup = (props) => {

  const [credentials, setCredentials] = useState({name: "", email: "", password: ""})

  let histo = useNavigate();

    const onChange=(e)=>{
      setCredentials({...credentials, [e.target.name]: e.target.value})
    }

    const {name, email, password} = credentials;

    const handlesubmit = async (e)=>{
      e.preventDefault();
      const response = await fetch(`http://localhost:5000/api/authen/signup`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({name, email, password})
        });
      const jsons = await response.json();
      console.log(jsons)

      if(jsons.success)
      {
          // Save Auth Token and Redirect
          localStorage.setItem('token', jsons.authtoken);
          histo("/")
          props.showAlert("Account Created Successfully", "success")
      }
      else
      {
          props.showAlert("E-mail Already Exists !!", "danger")
      }
    }

  return (
    <div className='container'>
        <form onSubmit={handlesubmit}>
          <div className="mb-3">
              <label htlmfor="name" className="form-label">Enter Name</label>
              <input type="text" className="form-control" id="name" name="name" onChange={onChange} aria-describedby="emailHelp" required/>
          </div>
          <div className="mb-3">
              <label htlmfor="email" className="form-label">Enter Email</label>
              <input type="email" className="form-control" id="email" name="email" onChange={onChange} aria-describedby="emailHelp" required/>
          </div>
          <div className="mb-3">
              <label htlmfor="password" className="form-label">Enter Password</label>
              <input type="password" className="form-control"id="password" name="password" onChange={onChange} required minLength={5}/>
          </div>
            <button type="submit" className="btn btn-primary">Submit</button> 
        </form>
    </div>
  )
}

export default Signup