import './App.css';
import {useState, useEffect} from "react";
import Axios from 'axios';
import Edit from './components/Edit';

function App(){

    const [name, setName] = useState("");
    const [age, setAge] = useState(0);
    const [country, setCountry] = useState("");
    const [position, setPosition] = useState("");
    const [wage, setWage] = useState(0);

    const [newWage, setNewWage] = useState(0);

    const [employeeList, setEmployeelist] = useState([]);

    const [usernameReg, setUsernameReg] = useState("");
    const [passwordReg, setPasswordReg] = useState("");

     const [username, setUsername] = useState("");
     const [password, setPassword] = useState("");
     const [loginStatus, setLoginStatus] = useState(false);

    Axios.defaults.withCredentials = true;
     const register = () =>{
       Axios.post('http://localhost:3001/register', {username: usernameReg, password: passwordReg}).then((response)=>{
       console.log(response);
     })
     };

    const login = () =>{
      Axios.post('https://mysql-deplay-heroku-test.herokuapp.com/login', {username: username, password: password}).then((response)=>{
        if(!response.data.auth){
          setLoginStatus(false);
        } else {
          localStorage.setItem("token", response.data.token)
          setLoginStatus(true);
        }
      })
    };
  

    const addEmployee = () =>{
        Axios.post('https://mysql-deplay-heroku-test.herokuapp.com/create', {
            name: name, 
            age: age, 
            country: country, 
            position: position, 
            wage: wage
        }).then(()=>{
            setEmployeelist([...employeeList, {
                name: name, 
                age: age, 
                country: country, 
                position: position, 
                wage: wage,
            },]);
        });
    };

    const getEmployees = () =>{
        Axios.get('https://mysql-deplay-heroku-test.herokuapp.com/employees').then((response) =>{
          setEmployeelist(response.data);
        });
      };

   const updateEmployeeWage = (id) =>{
         Axios.put(`https://mysql-deplay-heroku-test.herokuapp.com/update/${id}`, {wage: newWage, id: id}).then((response)=>{
             setEmployeelist(employeeList.map((val) => {
               if(val.id === id){
                 return {id: val.id, name: val.name, age: val.age, country: val.country, position: val.position, wage: newWage}
               } else {
                 return val;
               }
             }))
         });
    }

    const deleteEmployee = (id) =>{
        Axios.delete(`https://mysql-deplay-heroku-test.herokuapp.com/delete/${id}`).then((response) =>{
            setEmployeelist(employeeList.filter((val) =>{
                return val.id !== id
            }))
        });
    }

    const handleChange = (e) => {
      setNewWage(e.currentTarget.value);
    }

    useEffect(() => {
      Axios.get("https://mysql-deplay-heroku-test.herokuapp.com/login").then((response) =>{
        if(response.data.loggedIn === true){
          setLoginStatus(response.data.user[0].username);
        }
      })
    }, []);


    return(
        <div className="App">
             <h1>Registration</h1>
            <label>Username</label>
            <input type="text" onChange={(e)=>{setUsernameReg(e.target.value)}}/>
            <label>Password</label>
            <input type="password" onChange={(e)=>{setPasswordReg(e.target.value)}}/>
            <button onClick={register}>Register</button>
            <div className="information">
            {!loginStatus ?
            <div>
              <h1>Login</h1>
              <label>Username</label>
              <input type="text" onChange={(e)=>{setUsername(e.target.value)}}/>
              <label>Password</label>
              <input type="password" onChange={(e)=>{setPassword(e.target.value)}}/>
              <button onClick={login}>Login</button>
              <h1>{loginStatus}</h1>
            </div>
              :
              <div>
              <label>Name:</label>
                <input type="text" onChange={(event)=>{setName(event.target.value)}}/>
                <label>Age:</label>
                <input type="number" onChange={(event)=>{setAge(event.target.value)}}/>
                <label>Country:</label>
                <input type="text" onChange={(event)=>{setCountry(event.target.value)}}/>
                <label>Position:</label>
                <input type="text" onChange={(event)=>{setPosition(event.target.value)}}/>
                <label>Wage:</label>
                <input type="number" onChange={(event)=>{setWage(event.target.value)}}/>
                <button onClick={addEmployee}>Add Employee</button>
                <div className='employees'>
                <button onClick={getEmployees}>Employee List</button>
                <table>
                  <th>
                    <td>Name</td>
                    <td>Age</td>
                    <td>Country</td>
                    <td>Position</td>
                    <td>Wage</td>
                  </th>
                
                {employeeList.map((val, key) =>(
                  <Edit item={val} onDelete={itemDel => deleteEmployee(val.id)} onUpdate={itemUpdate => updateEmployeeWage(val.id)} onHandleChange={handleChange} isLoggedIn={loginStatus}/>
                        
                ))}
                </table>
                </div>
              </div>
            }
            </div>
        </div>
   )
}

export default App;