import React from 'react';
import Link from 'next/link';

function Header() {
  return (
    <header className='p-4 w-screen'>
      <div className='container mx-auto flex justify-end items-end'>
        <nav className='flex justify-end'>
          <Link href="/" className='mx-8 p-2 transition duration-300 ease-in-out transform hover:bg-pink-300 hover:border hover:border-gray-400 hover:scale-105'>
            Home
          </Link>
          <Link href="/profile" className='mx-8 p-2 transition duration-300 ease-in-out transform hover:bg-pink-300 hover:border hover:border-gray-400 hover:scale-105'>
            Profile
          </Link>
          <Link href="/posts" className='mx-8 p-2 transition duration-300 ease-in-out transform hover:bg-pink-300 hover:border hover:border-gray-400 hover:scale-105'>
            Posts
          </Link>
        </nav>
      </div>
    </header>
  );
}

export default Header;
