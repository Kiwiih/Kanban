import { FaPlus } from 'react-icons/fa';
import { useContext, useState } from 'react'
import TaskContext from '../context/TaskContext'
import ColumnsContext from '../context/ColumnsContext'


const AddTasks = () => {
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [newTaskContent, setNewTaskContent] = useState("");
  const {tasks, setTasks} = useContext(TaskContext);
  const {columns, setColumns} = useContext(ColumnsContext);
  const [showForm, setShowForm] = useState(false);

  const handleAddTask = (e) => {
    e.preventDefault();
    if (!newTaskTitle || !newTaskContent) return;
    const defaultColumn = columns.find(column => column.title.toLowerCase() === "todo");
    addTask({
      title: newTaskTitle,
      content: newTaskContent,
      stateId: defaultColumn.id 
    });
    setNewTaskTitle("");
    setNewTaskContent("");
    setShowForm(false);
  }

  const addTask = (task) => {
    const id = tasks.length ? (tasks[tasks.length - 1].id + 1) : 1;
    const newTask = { id, ...task };
    const taskList = [...tasks, newTask];
    setTasks(taskList);
  }

    return (
        <div className='add-task_section'>
        {showForm ? ( 
          <form className="addForm" onSubmit={handleAddTask}>
            <input
              type="text"
              id="addTaskTitle"
              placeholder="Add task title"
              required
              value={newTaskTitle}
              onChange={(e) => setNewTaskTitle(e.target.value)}
            />
            <input
              type="text"
              id="addTaskContent"
              placeholder="Add task content"
              required
              value={newTaskContent}
              onChange={(e) => setNewTaskContent(e.target.value)}
            />
            <button type="submit" aria-label="Add Task" className='submit-button'>
              <FaPlus style={{ color: "black", backgroundColor: "white", fontSize: "1em" }} />
            </button>
          </form>
        ) : (
          <button onClick={() => setShowForm(true)} className='submit-button' >
            <FaPlus style={{ color: "black", backgroundColor: "white", fontSize: "1em" }}/>
          </button> 
        )}
      </div>
    )
}

export default AddTasks