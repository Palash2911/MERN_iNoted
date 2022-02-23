import './App.css';
import Navbar from './components/Navbar';
import AllNotes from './components/AllNotes';
import Home from './components/Home';
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import NoteState from './context/Notes/NoteState';
import Login from './components/Login';
import Signup from './components/Signup';
import Alert from './components/Alert';
import {useState} from "react";


function App() {

  const [alert, Setalert] = useState(null)

  const showAlert = (message, type)=>{
    Setalert({
      mssg : message,
      type : type
    })
    setTimeout(() => {
      Setalert(null)
    }, 1000);
  }


  return (
    <>
    <NoteState>
      <Router>
        <Navbar showAlert={showAlert}/>
        <Alert alert={alert}/>
        <div className="container">
          <Routes>
            <Route exact path="/" element={<Home showAlert={showAlert}/>}></Route>
            <Route exact path="/allnotes" element={<AllNotes showAlert={showAlert} />}></Route>
            <Route exact path="/login" element={<Login showAlert={showAlert}/>}></Route>
            <Route exact path="/signup" element={<Signup showAlert={showAlert}/>}></Route>
          </Routes>
        </div>
      </Router>
    </NoteState>
    </>
  );
}

export default App;
