import React from 'react'
import Header from '@/components/navbar'
import { ReactNode } from 'react';
import '../app/globals.css';
import { url } from 'inspector';

interface MainProps {
  children: ReactNode;
}

const Main = ({ children }: MainProps) => {
  return (
    <main 
      style={{ 
        marginTop: '1rem',
        backgroundImage: 'url(${require(./images/sa.jpg)})', 
        backgroundColor: '#2d545e', 
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat', 
        backgroundPosition: 'center',
        display: 'flex', // Add flex display
        flexDirection: 'column',
        position: 'relative', // Align items vertically
        alignItems: 'stretch',
         // Center items horizontally
        minHeight: '100vh' // Ensure the main element takes the full height of the viewport
      }} 
    >
      <Header />
      <div className="w-1/2 flex min-h-96 items-center">
        {children}
      </div>
    </main>
  );
};

export default Main;
