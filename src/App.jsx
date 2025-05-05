import { useState,useEffect } from 'react'
import Navbar from './components/Navbar'
import './App.css'
import { v4 as uuidv4 } from 'uuid';
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

function App() {
  const [count, setCount] = useState(0)
  const [todo, setTodo] = useState("")
  const [todos, setTodos] = useState([])
  const [showfinished, setShowfinished] = useState(true)

  useEffect(() => {
    let todoString = localStorage.getItem("todos")
    if(todoString){
     let todos = JSON.parse(localStorage.getItem("todos"))
     setTodos(todos)
    }
  }, [])
  

  const savetoLS = ()=>{
    localStorage.setItem("todos", JSON.stringify(todos))
  }

  const handlechange = (e) => {
    setTodo(e.target.value)
  }

  const handleAdd = () => {
    setTodos([...todos, { id: uuidv4(), todo, isCompleted: false }])
    setTodo("")
    savetoLS()
  }

  const handleCheckbox = (e) => {
    let id = e.target.name
    let index = todos.findIndex(item => {
      return item.id == id
    })
    let newtodos = [...todos]
    newtodos[index].isCompleted = !newtodos[index].isCompleted
    setTodos(newtodos)
    savetoLS()
  }

  const handleEdit = (e, id) => {
    let selectTodo = todos.filter(item => item.id == id)
    setTodo(selectTodo[0].todo)
    let newtodos = todos.filter(item => {
      return item.id !== id
    })
    setTodos(newtodos)
    savetoLS()
  }

  const handleDelete = (e, id) => {
    let newtodos = todos.filter(item => {
      return item.id !== id
    })
    setTodos(newtodos)
    savetoLS()
  }

  const toggleFinished = ()=>{
    setShowfinished(!showfinished)
  }

  const handleFinished = (e, isCompleted)=>{
    
  }
  return (
    <>
      <Navbar />
      <div className="mx-4 md:container md:w-[50vw] md:mx-auto bg-violet-100 rounded-lg my-10 p-7 min-h-[80vh]">
        <h1 className="font-bold text-center text-xl mb-5">iTask - your online task planner</h1>
        <h1 className="text-lg font-bold mb-1">Add a Todo</h1>
        <input onChange={handlechange} value={todo} className="text-sm w-full rounded-xl pl-1 py-1" type="text" placeholder="Enter Todo" />
        <button disabled={todo.length<=3} onClick={handleAdd} className="bg-violet-700 hover:bg-violet-800 disabled:opacity-70 transition-all font-bold text-sm rounded-lg text-white p-2 py-1 mt-3 w-full">Save</button>
        <div>
        <input onChange={toggleFinished} className="my-3" type="checkbox" checked={showfinished} name="" id="" /><span className='mx-2'>Show Finished Todos</span>
        </div>
        <h1 className="text-lg font-bold">Your Todos</h1>
        <div className="todos">
          {todos.length == 0 && <div className="text-center mt-5">No Todos to display</div>}
          {todos.map(item => {
            return (showfinished || !item.isCompleted) && <div key={item.id} className="todo flex justify-between items-center max-w-full md:max-w-[65%] my-2">
              <div className="flex gap-5 md:gap-8">
                <input onChange={handleCheckbox} type="checkbox" checked={item.isCompleted} name={item.id} />
                <div className={`break-words w-[50vw] md:w-[20vw] ${item.isCompleted ? "line-through" : ""}`}><div>{item.todo}</div></div>
              </div>
              <div className="flex buttons my-1">
                <button onClick={(e) => { handleEdit(e, item.id) }} className="bg-violet-700 hover:bg-violet-800 rounded text-white p-2 py-1 mx-2"><FaEdit /></button>
                <button onClick={(e) => { handleDelete(e, item.id) }} className="bg-violet-700 hover:bg-violet-800 rounded text-white p-2 py-1"><MdDelete /></button>
              </div>
            </div>
          })}
        </div>
      </div>

    </>
  )
}

export default App
