import { useEffect, useState } from 'react'
import Navbar from './Components/Navbar'
import { v4 as uuidv4 } from 'uuid';
import { MdEditSquare } from "react-icons/md";
import { AiFillDelete } from "react-icons/ai";


function App() {
  const [todo, setTodo] = useState(" ")  //this is an input text
  const [todos, setTodos] = useState([])  //it is an array which holds all our todos
  const [finished, setFinished] = useState(true)

  const savetolocal = (params) => {
    localStorage.setItem("todos", JSON.stringify(todos))
  }

  const Togglefinished = (e) => {
    setFinished(!finished)
  }


  useEffect(() => {
    let todoString = localStorage.getItem("todos")
    if (todoString) {
      let todos = JSON.parse(localStorage.getItem("todos"))
      setTodos(todos)
    }

  }, [])


  const handleEdit = (e, id) => {
    let t = todos.filter(i => i.id === id)
    setTodo(t[0].todo)
    let newTodos = todos.filter(item => {
      return item.id !== id;
    });
    setTodos(newTodos)
    savetolocal();
  }
  const handleDelete = (e, id) => {
    let newTodos = todos.filter(item => {
      return item.id !== id;
    });
    setTodos(newTodos)
    savetolocal();
  }
  const handleAdd = () => {
    setTodos([...todos, { id: uuidv4(), todo, isCompleted: false }])
    setTodo("")  //again set todo as blank
    savetolocal();
  }
  const handleChange = (e) => {
    setTodo(e.target.value)
  }
  const handleCheckbox = (e) => {
    let id = e.target.name
    let index = todos.findIndex(item => {
      return item.id === id;
    })
    let newTodos = [...todos];  //it is a new array
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    setTodos(newTodos)
    savetolocal()
  }

  return (
    <>
      <Navbar />
      <div className="mx-3 md:container md:mx-auto my-6 rounded-xl p-5 bg-slate-300 min-h-screen md:w-1/2">
        <h1 className='font-bold text-center text-3xl'>Taskify - Your Todo on the go</h1>
        <div className="addtodo my-5 flex flex-col gap-4">
          <h2 className='text-2xl font-bold'>Add a Todo</h2>
          <div className="flex">
            <input onChange={handleChange} value={todo} type="text" className='w-full rounded-lg p-2' />
            <button onClick={handleAdd} disabled={todo.length <= 3} className='bg-slate-200 hover:bg-slate-400 p-3 py-1 disabled:bg-slate-200 text-black rounded-md m-2 font-bold'>Add to list</button>
          </div>
        </div>
        <input className='my-3' id='show' onChange={Togglefinished} type="checkbox" checked={finished} /> 
        <label className='mx-2' htmlFor="show">Show Finished</label>
        <div className='h-[2px] bg-black opacity-50 width-90% mx-auto my-7'></div>
        <h2 className='text-lg font-bold'>Yours Todos</h2>
        <div className="todos">
          {todos.length === 0 && <div className='m-5 font-bold'>No todos found</div>}
          {todos.map(item => {

            return (finished || !item.isCompleted) && <div key={item.id} className="todo flex md:w-100% my-4 justify-between">
              <div className='flex gap-6'>
                <input name={item.id} onChange={handleCheckbox} type="checkbox" checked={item.isCompleted} id='' />
                <div className={item.isCompleted ? "line-through" : ""}>{item.todo}</div>
              </div>
              <div className="buttons flex h-full">
                <button onClick={(e) => handleEdit(e, item.id)} className='bg-slate-200 hover:bg-slate-400 p-3 py-1 text-black rounded-md mx-1 font-bold'><MdEditSquare />
                </button>
                <button onClick={(e) => { handleDelete(e, item.id) }} className='bg-slate-200 transition-all hover:bg-slate-400 p-3 py-1 text-black rounded-md mx-1 font-bold'><AiFillDelete /></button>
              </div>
            </div>
          })}
        </div>
      </div>
    </>
  )
}

export default App
