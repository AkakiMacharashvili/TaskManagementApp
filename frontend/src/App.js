import { useState } from 'react';
import './App.css';
import CreateTask from './CreateTask';
import Login from './LogIn';
import SignUp from './SignUp';
import Tasks from './Tasks';


function App() {
  
  const [login, setLogin] = useState(false);
  const [signup, setSignup] = useState(false);
  const [task, setTask] = useState(false);
  const [myTasks, setMyTasks] = useState(false);
 
  //------------------Signin---------------------
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [usernameSU, setUsernameSU] = useState('');
  const [email, setEmail] = useState('');
  const [passwordSU, setPasswordSU] = useState('');

  //------------------Login---------------------
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loggedInUser, setLoggedInUser] = useState(null);

  //----------------Create Task-----------------
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [month, setMonth] = useState('');
  const [day, setDay] = useState('');
  const [year, setYear] = useState('');

  //-----------------Tasks----------------------

  const [tasks, setTasks] = useState([]);
  
  

  const handleLogin = () => {
    setLogin(true);
    setSignup(false);
    setTask(false);
    setMyTasks(false);
  }

  const handleSignUp = () => {
    setSignup(true);
    setLogin(false);
    setTask(false);
    setMyTasks(false);
  }

  const handleCreateTask = () => {
    setTask(true);
    setLogin(false);
    setSignup(false);
    setMyTasks(false);
  }

  const handleShowTasks = () => {
    setMyTasks(true);
    setTask(false);
    setLogin(false);
    setSignup(false);
  }
  return (
    <div className="App">
      <button onClick={handleLogin}>Log In</button>
      <button onClick={handleSignUp}>Sign up</button>
      <button onClick={handleCreateTask}>Create Task</button>
      <button onClick={handleShowTasks}>My Task</button>
      
      {signup && (
        <SignUp firstName={firstName} setFirstName={setFirstName} lastName={lastName} setLastName={setLastName}
                username={usernameSU} setUsername={setUsernameSU} email={email} setEmail={setEmail}
                password={passwordSU} setPassword={setPasswordSU} />
      )}

      {login && (
        <Login username={username} setUsername={setUsername} password={password} setPassword={setPassword} 
        loggedInUser={loggedInUser} setLoggedInUser={setLoggedInUser}/>
      )}

      {task && (
        <CreateTask title={title} setTitle={setTitle} description={description} setDescription={setDescription}
                    day={day} setDay={setDay} month={month} setMonth={setMonth} year={year} setYear={setYear}
                    loggedInUser={loggedInUser}/>
      )}
      
      {myTasks && (
        <Tasks tasks={tasks} setTasks={setTasks} loggedInUser={loggedInUser}/>
      )}

    </div>
  );
}

export default App;
