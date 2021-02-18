import { useState } from 'react'
import Header from './components/Header/Header'
import TaskList from './components/TaskList/TaskList'
import './App.css';

function App() {
  const [ tasks, setTasks ] = useState([
    { text: 'Buy cat food', completed: false, date: '2020-12-01', id: '001'},
    { text: 'Buy milk', completed: true, date: '2020-12-05', id: '002'},
    { text: 'Clean the kitchen', completed: false, date: '2020-11-18', id: '003'},
    { text: 'Go to sleep', completed: true, date: '2020-09-18', id: '004'},
    { text: 'Go for a walk', completed: false, date: '2020-09-18', id: '005'},
    { text: 'Do the food shop', completed: false, date: '2020-09-18', id: '006'},
  ])

  const incompleteTasks = tasks.filter(task => !task.completed)
  const completeTasks = tasks.filter(task => task.completed)
  return (
    <div className='App'>
      <Header taskCount={ incompleteTasks.length }/>
      <main className='all-tasks'>
        <TaskList tasks={ incompleteTasks } status='incomplete'/>
        <TaskList tasks={ completeTasks } status='complete'/>
      </main>
    </div>
  );
}

export default App;
