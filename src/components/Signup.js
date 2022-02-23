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
      const response = await fetch(`https://inoted.netlify.app/signup`, {
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
          localStorage.removeItem('token');
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
    <div className='container my-3 d-flex flex-column align-items-center'>
      <h2>Signup To iNoted</h2>
        <form onSubmit={handlesubmit} className="my-4" style={{width: '50%'}}>
          <div className="mb-3 my-4">
              <input type="text" className="form-control" id="name" name="name" onChange={onChange} aria-describedby="emailHelp" placeholder='Enter Your Name' required/>
          </div>
          <div className="mb-3 my-4">
              <input type="email" className="form-control" id="email" name="email" onChange={onChange} aria-describedby="emailHelp" placeholder='Enter Your Email-ID' required/>
          </div>
          <div className="mb-3 my-4">
              <input type="password" className="form-control"id="password" name="password" minLength={8} placeholder='Enter Password' onChange={onChange} required/>
          </div>
            <button type="submit" className="btn btn-primary">Submit</button> 
        </form>
    </div>
  )
}

export default Signup