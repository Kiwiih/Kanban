import { createContext, useEffect, useState } from "react";

const ColumnsContext = createContext({});

  export const ColumnDataProvider = ({ children }) => {
    const [columns, setColumns] = useState(() => {
        const savedColumns = localStorage.getItem('columns');
        return savedColumns ? JSON.parse(savedColumns) : [
        {
            id: 1,
            title: 'Todo',
        },
        {
            id: 2,
            title: 'Doing'
        },
        {
            id: 3,
            title: 'Done'
        }
        ]
    });
    
        useEffect(() => {
            localStorage.setItem('columns', JSON.stringify(columns));
        }, [columns]);

        const handleDeleteColumn = (id) => {
            const updatedColumns = columns.filter(column => column.id !== id);
            setColumns(updatedColumns);
          };
    
    return (
        <ColumnsContext.Provider value={{ columns, setColumns, handleDeleteColumn}}>
            {children}
        </ColumnsContext.Provider>
    )
}

export default ColumnsContext