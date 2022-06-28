import './index.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header'
import Tasks from './components/Tasks';
import Addtask from './components/Addtask';
import Footer from './components/Footer';
import About from './components/About';
import { useState, useEffect } from "react"

const App = () => {
  const [showAddTask, setShowAddTask] = useState(false)
  
  // Task component
  const [tasks, setTasks] = useState([])

  useEffect(() => {
    const getTasks = async () => {
      const taskFromServer = await fetchTasks()
      setTasks(taskFromServer)
    }

    getTasks()
  }, [])

  // fetch Tasks
  const fetchTasks = async () => {
    const res = await fetch('http://localhost:5000/tasks')
    const data = await res.json()

    return data
  }
  // fetch Task
  const fetchTask = async (id) => {
    const res = await fetch(`http://localhost:5000/tasks/${id}`)
    const data = await res.json()

    return data
  }


  //Add task
  
    const addTask = async (task) => {
      const res = await fetch('http://localhost:5000/tasks', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify(task),
      })

      const data = await res.json()

      setTasks([...tasks, data])
    }
    
    
    //const addTask = (task) => {
    // const id = Math.floor(Math.random() * 10000) + 1
    // const newTask = { id, ...task}
    // setTasks([...tasks, newTask])
  //}

  //Delete task
  const deleteTask = async (id) => {
    await fetch(`http://localhost:5000/tasks/${id}`, {
      method: 'DELETE',
    })
    setTasks(tasks.filter((task) => task.id !== id))
  }
// Toggle Reminder
// map through where task.id matches id thats clicked it will toggle reminder, otherwise it stays the same.
const toggleReminder = async (id) => {
  const taskToToggle = await fetchTask(id)
  const updTask = { ...taskToToggle, reminder: !taskToToggle.reminder}

  const res = await fetch(`http://localhost:5000/task/${id}`, {

    method: 'PUT',
    headers: {
      'Content-type': 'application/json'
    },
    body: JSON.stringify(updTask)
  })

  const data = await res.json()

  setTasks(tasks.map((task) => task.id === id ?
   { ...task, reminder: !data.reminder} : task))
}

  return (
    <Router>
      <div className='container'>
        <Header
          title='To Do List'
          onAdd={() => setShowAddTask(!showAddTask)}
          //boolean on if its shown or not
          showAdd={showAddTask}
        />
          <Routes>
            <Route path='/' exact element ={
              <>
              {showAddTask && <Addtask onAdd={addTask}/>}
              {tasks.length > 0 ? (
                <Tasks
                  tasks={tasks}
                  onDelete={deleteTask}
                  onToggle={toggleReminder}/>
              ) : ( 'There are no tasks' )}
              
              </>
            }/>
            <Route path='/about' element={<About/>}/>
          </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
