import React, { useState, useEffect } from 'react';

const AddTailors = () => {
  // Load workers from localStorage or use default data
  const [workers, setWorkers] = useState(() => {
    const savedWorkers = localStorage.getItem('workers');
    return savedWorkers ? JSON.parse(savedWorkers) : [
      { name: "Ramprit", isPieceRate: true },
      { name: "Anil", isPieceRate: true },
      { name: "Rizwan", isPieceRate: true },
      { name: "Mustafa", isPieceRate: true },
      { name: "Mukhtar", isPieceRate: true },
      { name: "khurshid", isPieceRate: true },
      { name: "Nurul", isPieceRate: true },
      { name: "Praveen 2", isPieceRate: true },
      { name: "Surender Tailor", isPieceRate: true },
      { name: "Qamaruddin", isPieceRate: true },
      { name: "Samir", isPieceRate: true },
      { name: "Shan", isPieceRate: false },
      { name: "kadir", isPieceRate: true },
      { name: "Praveen", isPieceRate: true },
      { name: "Idrish", isPieceRate: false },
      { name: "Mubarak", isPieceRate: false },
      { name: "Kamran", isPieceRate: false },
      { name: "Lata", isPieceRate: false },
      { name: "Shah Mohd", isPieceRate: false },
      { name: "Kadir", isPieceRate: false },
      { name: "Praveen", isPieceRate: false },
      { name: "Shamsuddin", isPieceRate: true },
      { name: "Vijay", isPieceRate: true },
      { name: "Dilshad", isPieceRate: true },
      { name: "Vikas", isPieceRate: true },
      { name: "Niumuddin", isPieceRate: true },
      { name: "Ranjeet", isPieceRate: true }
    ];
  });

  useEffect(() => {
    localStorage.setItem('workers', JSON.stringify(workers));
  }, [workers]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const name = event.target.tailorName.value.trim();
    const isPieceRate = event.target.tailorCategory.value === "Yes";

    if (name && !workers.some(worker => worker.name.toLowerCase() === name.toLowerCase())) {
      const newWorkers = [...workers, { name, isPieceRate }];
      setWorkers(newWorkers);
    }
    event.target.reset();
  };

  return (
    <>
    <div className='container max-w-lg mx-auto mt-10'>
      <form onSubmit={handleSubmit}>
        <div className='p-4 flex flex-col justify-center gap-3'>
          <input 
            type="text" 
            name="tailorName" 
            placeholder='Tailor Name...'  
            className='border-1 border-gray-200 py-2 outline-teal-400 rounded-md px-4' 
            required
          />
          <select name="tailorCategory" className='border-1 border-gray-200 py-2 outline-teal-400 rounded-md px-4' required>
            <option value="">Select Type</option>
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
          <input 
            type="submit" 
            value="Add" 
            className='bg-teal-300 cursor-pointer text-white py-2 outline-teal-400 rounded-md px-4' 
          />
        </div>
      </form>

      
    </div>
    <div className='mt-5 p-4 container mx-atuo  mb-40  mx-auto  rounded-lg'>
        <h2 className=' font-bold mb-2 text-2xl text-center '>Tailors List</h2>
        
          <div className='flex justify-between font-bold mb-2  bg-gray-100 p-4'>
            <div>Sr.NO </div>
            <div>Tailor Name </div>
            <div>Work Category</div>
          </div>
          {workers.map((worker, index) => (
            <>
           
           <div key={index} className={`flex justify-between p-3 cursor-pointer hover:bg-teal-200 duration-75 ease-in  ${index % 2 === 0 ? "bg-teal-50" : ""}`}>

              <span>{index+1} </span>
              <p> {worker.name} </p>
              <p> {worker.isPieceRate ? 'Piece Rate' : 'Fixed Rate'} </p>
            </div>
            </>
          ))}
        
      </div>
    </>
  );
};

export default AddTailors;
