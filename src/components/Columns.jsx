import { useState, useContext } from "react"
import { useParams } from 'react-router-dom'
import { FaTrash } from "react-icons/fa";

import TaskContext from '../context/TaskContext';
import Footer from './Footer'
import ColumnsContext from "../context/ColumnsContext";
import TasksContent from "./TasksContent"
import Header from "./Header";

const Columns = () => {

const { columnName } = useParams();
const {columns, setColumns, handleDeleteColumn} = useContext(ColumnsContext);
const { tasks, setTasks } = useContext(TaskContext);

const column = columns.find(column => column.title.toLowerCase() === columnName);

// const renderTasks = tasks.filter(task => task.column === column.title);
console.log(tasks)

  return (
    <>
    <Header />
    <main>
    <div className='board-column'>
        <div className='column-header'>
        <h2 className='link'>{column.title}</h2>
        <button onClick={()=>handleDeleteColumn(column.id)} className="column-trash"><FaTrash/></button>
        </div>
        <div className="task-list">
        <TasksContent columnId={column.id}/>
      </div>
    </div>
    </main>
    <Footer />
    </>
  )
}

export default Columns