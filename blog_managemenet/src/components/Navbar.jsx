import React from 'react';

const Navbar = () => {
  return (
    <nav className="bg-blue-600 text-white px-4 py-2 flex justify-between items-center">
      <div className="text-lg font-bold">MERN App</div>
      <div>
        <a href="/" className="mx-2 hover:underline">
          Home
        </a>
        <a href="/about" className="mx-2 hover:underline">
          About
        </a>
        <a href="/contact" className="mx-2 hover:underline">
          Contact
        </a>
      </div>
    </nav>
  );
};

export default Navbar;
