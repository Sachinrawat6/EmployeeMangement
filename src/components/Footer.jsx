import React from 'react'

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white text-center p-4 fixed bottom-0 w-full shadow-md ">
      <p>&copy; {new Date().getFullYear()} Tailor Management. All rights reserved.</p>
    </footer>
  );
}

export default Footer