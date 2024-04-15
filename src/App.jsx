import { BrowserRouter as Router, Route, Routes, useParams} from 'react-router-dom';
import Columns from './components/Columns'
import { DataProvider } from './context/TaskContext';
import { ColumnDataProvider } from './context/ColumnsContext';
import MissingPage from './components/MissingPage';
import AllColumns from './components/AllColumns';

function App() {

  const DynamicColumn = () => {
    const params = useParams();
    const { columnName } = params;
  
    return <Columns title={columnName} />;
  };

  return (
    <ColumnDataProvider>
    <DataProvider>
    <Router>
      <Routes>
        <Route path="/" element={<AllColumns />} />
        <Route path="*" element={<MissingPage />} />
        <Route path="/column/:columnName" element={<DynamicColumn />} />
      </Routes>
    </Router>
  </DataProvider>
  </ColumnDataProvider>
  )
}

export default App
