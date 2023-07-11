import { Route, Routes } from 'react-router-dom';
import './App.css';
import User from './pages/UserDetails';
import Add from './pages/Add'
import Edit from './pages/Edit';

function App() {
  return (
    <div className="App container">
      <Routes>
        <Route path='/' Component={User}></Route>
        <Route path='/add' Component={Add}></Route>
        <Route path='/Edit/:id' Component={Edit}></Route>
      </Routes>
    </div>
  );
}

export default App;
