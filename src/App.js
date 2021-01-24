import { useState, useEffect } from 'react'
import axios from 'axios'
import Header from './components/Header/Header'
import TaskList from './components/TaskList/TaskList'
import './App.css';

function App() {
  // const [ tasks, setTasks ] = useState([
  //   { text: 'Buy cat food', completed: false, date: '2020-12-01', id: '001'},
  //   { text: 'Buy milk', completed: true, date: '2020-12-05', id: '002'},
  //   { text: 'Clean the kitchen', completed: false, date: '2020-11-18', id: '003'},
  //   { text: 'Go to sleep', completed: true, date: '2020-09-18', id: '004'},
  //   { text: 'Go for a walk', completed: false, date: '2020-09-18', id: '005'},
  //   { text: 'Do the food shop', completed: false, date: '2020-09-18', id: '006'},
  // ])
  const [ tasks, setTasks ] = useState([])
  const userId = '9a688c69-3f66-4874-aefa-5dfcd44110d5'

  useEffect(() => {
    //Initiate a get request to API endpoint
    axios
    .get(`https://wv05gxoqdi.execute-api.eu-west-2.amazonaws.com/dev/users/${userId}/tasks`)
    //If successful, update the tasks state
    .then(response => setTasks(response.data))
    //If error, log out the error
    .catch(error => console.log(error))
  }, [])


  const deleteTask = id => {
    const updatedTasks = tasks.filter(task => task.taskId !== id)
    setTasks(updatedTasks)
  }

  const addTask = text => {
    const newTask = {
      description: text,
      completed: false
    }

    //Make a post request, pass in the newTask as the body
    axios
    .post(`https://wv05gxoqdi.execute-api.eu-west-2.amazonaws.com/dev/users/${userId}/tasks`, newTask)
    //If successful, make a get request for all the tasks
    .then(() => axios.get(`https://wv05gxoqdi.execute-api.eu-west-2.amazonaws.com/dev/users/${userId}/tasks`))
    //If get request is successful, update tasks state with everything
    .then((response) => setTasks(response.data))
    //If error, log out the error
    .catch(error => console.log(error))
  }

  const incompleteTasks = tasks.filter(task => !task.completed)
  const completeTasks = tasks.filter(task => task.completed)
  return (
    <div className="App">
      <Header taskCount={ incompleteTasks.length } addTask={ addTask }/>
      <main className="all-tasks">
        <TaskList deleteTask={ deleteTask } tasks={ incompleteTasks } status='incomplete'/>
        <TaskList deleteTask={ deleteTask } tasks={ completeTasks } status='complete'/>
      </main>
    </div>
  );
}

export default App;
