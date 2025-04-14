import React from "react";
import { Link } from "react-router-dom";


export default function Navbar() {
  return (
    <nav className="bg-gray-100 mt-10 text-gray-800 p-4 font-sans rounded-lg shadow-teal-300  container mx-auto ">
      <div className=" mx-auto flex justify-evenly items-center">
       <Link to="/"> <h1 className="text-2xl font-bold tracking-wide lowercase"><span className="text-teal-400 capitalize text-6xl">Tailor</span> Management</h1></Link>
        <ul className="flex space-x-6 text-lg">
          <li>
            <Link to="/add-record" className="hover:text-teal-400 transition">Add Record</Link>
          </li>
          <li>
            <Link to="/add-tailors" className="hover:text-teal-400 transition">Add Tailor</Link>
          </li>
         
        </ul>
      </div>
    </nav>
  );
}