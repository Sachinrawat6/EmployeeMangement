import React from 'react'
import {BrowserRouter as Router,Routes,Route} from "react-router-dom";
// import AddRecord from './components/AddRecord';
import AddTailors from './components/AddTailors';
import Navbar from './components/Navbar';
import Home from './components/Home';
import AddRecord from './components/AddRecord';
import Footer from './components/Footer';

const App = () => {
  return (
   <Router>
    <Navbar/>
    <Routes>
    <Route path='/' element={<Home/>} />
      <Route path='/add-record' element={<AddRecord/>} />
      <Route path='/add-tailors' element={<AddTailors/>} />
     
      
    </Routes>

    <Footer/>
   </Router>
  )
}

export default App