import { Routes, Route } from 'react-router-dom';
import ListComponent from './components/ListComponent';
import TableFilterComponent from './components/TableFilterComponent';

const App = () => {
  return (
    <Routes>
      <Route path="/list" element={<ListComponent />} />
      <Route path="/" element={<TableFilterComponent/>} />
      <Route path="*" element={<h1>Error 404: Not found</h1>} />
    </Routes>
  );
};

export default App;
