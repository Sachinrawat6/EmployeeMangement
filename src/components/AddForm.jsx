import React from 'react';

const AddForm = () => {
  return (
    <div className=' p-2 rounded-xl  mx-auto '>
      <form className='flex justify-evenly gap-4'>
        <input 
          type='number' 
          name='styleNumber' 
          placeholder='Style Number' 
          className='p-2 border border-gray-200 w-full rounded-lg focus:outline-none focus:ring-1 focus:ring-teal-400' 
        />
        <input 
          type='number' 
          name='qty' 
          placeholder='#####' 
          className='p-2 border border-gray-200 w-full rounded-lg focus:outline-none focus:ring-1 focus:ring-teal-400' 
        />
        <input 
          type='number' 
          name='onlineQty' 
          placeholder='#####' 
          className='p-2 border border-gray-200 w-full rounded-lg focus:outline-none focus:ring-1 focus:ring-teal-400' 
        />
      
      </form>
    </div>
  );
};

export default AddForm;