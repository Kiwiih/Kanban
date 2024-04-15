import { createContext, useEffect, useState } from "react";

const TaskContext = createContext({});

export const DataProvider = ({ children }) => {
    const [tasks, setTasks] = useState(
        JSON.parse(localStorage.getItem("taskList")) || []
    );

    useEffect(() => {
        localStorage.setItem("taskList", JSON.stringify(tasks));
    }, [tasks]);

    return (
        <TaskContext.Provider value={{ tasks, setTasks}}>
            {children}
        </TaskContext.Provider>
    )
    
}
export default TaskContext