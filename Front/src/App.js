import logo from './logo.svg';
import './App.css';
import Log from './new_task/log_in';
import Check from './new_task/check';
import { Route,Routes } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Log/>}/>
        <Route path='/test' element={<Check/>}/>
      </Routes>
    </div>
  );
}

export default App;
