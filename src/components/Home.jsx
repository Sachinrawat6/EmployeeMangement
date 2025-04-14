import React from "react";
import { Link } from "react-router-dom"; // Assuming React Router is used

const Home = () => {
  return (
    <div className="container mx-auto py-10 px-4 text-center">
      <h1 className="text-3xl font-bold text-teal-600">Welcome to Tailor Management</h1>
      <p className="mt-4 text-gray-600">Easily record and manage tailor work details.</p>
      
      <div className="mt-6 flex justify-center">
        <img 
          src="https://png.pngtree.com/png-clipart/20230511/ourmid/pngtree-seamtress-png-image_7095548.png" 
          alt="Tailor at work" 
          className="rounded-lg shadow-xs w-[460px]"
        />
      </div>
      
      <div className="mt-10 flex justify-center gap-6">
        <Link
          to="/add-record"
          className="bg-teal-500 text-white px-6 py-3 rounded-lg shadow-md hover:bg-teal-600"
        >
          Add New Record
        </Link>
       
      </div>
    </div>
  );
};

export default Home;
