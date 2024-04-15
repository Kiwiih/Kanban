import { useContext, useState, useEffect } from "react";
import { FaUndo, FaAngleRight, FaEdit, FaAngleLeft } from "react-icons/fa";

import TaskContext from "../context/TaskContext"
import ColumnsContext from "../context/ColumnsContext";
import ModalComponent from "./ModalComponent"


const TasksContent = ({ columnId }) => {

  const { columns, setColumns } = useContext(ColumnsContext);
  const { tasks, setTasks } = useContext(TaskContext);
  const [selectedTask, setSelectedTask] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filteredTasks, setFilteredTasks] = useState([]);

  // console.log(columns);
  // console.log(tasks);
  // console.log(columnId)

  useEffect(() => {
    const tasksInColumn = tasks.filter((task) => task.stateId === columnId);
    setFilteredTasks(tasksInColumn);
  }, [tasks, columnId]);

  const handleOpenModal = (taskId) => {
    const task = tasks.find((task) => task.id === taskId);
    setSelectedTask(task);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

   // Function to move tasks to the right column
   const moveToRight = (taskId) => {
    const updatedTasks = tasks.map((task) => {
      const columnIndex = columns.findIndex((column) => column.id === task.stateId);
      if (task.id === taskId && columnIndex < columns.length - 1) {
        return { ...task, stateId: columns[columnIndex + 1].id };
      } else if (task.id === taskId) {
        window.alert(" (ﾉ◕ヮ◕)ﾉ*:･ﾟ✧ Kan inte flytta tasken till en column som inte finns.");
      }
      return task;
    });
    // console.log(updatedTasks);
    setTasks(updatedTasks);
  };
  const moveToLeft = (taskId) => {
    const updatedTasks = tasks.map((task) => {
      const columnIndex = columns.findIndex((column) => column.id === task.stateId);
      if (task.id === taskId && columnIndex > 0) {
        return { ...task, stateId: columns[columnIndex - 1].id };
      }else if (task.id === taskId) {
        window.alert(" (ﾉ◕ヮ◕)ﾉ*:･ﾟ✧ Kan inte flytta tasken till en column som inte finns.");
      }
      return task;
    });
    // console.log(updatedTasks);
    setTasks(updatedTasks);
  };

  return (
    <>
     {filteredTasks.map(task => (
        <div key={task.id} className="tasks">
          <div className="taskInfo">
            <h3>{task.title}</h3>
            <p>
              {task.content.length > 25? task.content.slice(0, 25) + "...": task.content}
            </p>
          </div>
          <div className="taskButtons">
            <button className='moveArrow' onClick={() => moveToLeft(task.id)}><FaAngleLeft /></button>
            <button className="moveArrow" onClick={() => handleOpenModal(task.id)}><FaEdit /></button>
            <button className="moveArrow" onClick={() => moveToRight(task.id)}><FaAngleRight /></button>
          </div>
        </div>
      ))}
    <ModalComponent 
      selectedTask={selectedTask}
      isOpen={isModalOpen} 
      onClose={handleCloseModal} 
    />
  </>
  )
}

export default TasksContent