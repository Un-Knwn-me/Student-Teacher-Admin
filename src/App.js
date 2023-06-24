import './App.css';
import { Route, Switch } from 'react-router-dom';
import WelcomePage from './Components/WelcomePage';
import AddStudent from './Components/AddStudent';
import Students from './Components/Students';
import { useEffect, useState } from 'react';
import EditStudent from './Components/EditStudent';

function App() {
  const [studData, setStudData] = useState([]);

  useEffect(()=>{
    const getStudent = async()=>{
      try {
        const res = await fetch("https://643d2495f0ec48ce90536438.mockapi.io/Student",{
          method: "GET",
        })
        const data = await res.json();
        setStudData(data);
        
      } catch (error) {
        console.log(error);        
      }
    }
    getStudent();
  },[])
  return (
    <div className="App">
      <Switch>
        
        <Route exact path="/">
          <WelcomePage/>
        </Route>

        <Route path="/students">
          <Students
          studData={studData}
          setStudData={setStudData}
          />
        </Route>

        <Route path="/add-stud">
          <AddStudent
          studData={studData}
          setStudData={setStudData}
          />
        </Route>

        <Route path="/edit-stud/:id">
          <EditStudent
          studData={studData}
          setStudData={setStudData}
          />
        </Route>

      </Switch>
    </div>
  );
}

export default App;
