import React from 'react';
import { Link } from 'react-router-dom';

const Landing = () => {

  return (
    <div className='background-landing'>
      <div className='project-name'>
      <h1>BAND AID</h1>
      <h2>
      Find musicians in your area, connect, and jam!
      </h2>
      </div>
      <div className='form'>
        <div className='container'>
        <div className='cardHeader'>
          <Link to='/login' className='form-button raise'>
            Login
          </Link>
        </div>
        <br/>
        <div className='cardHeader'>
          <Link to='/signup' className='form-button raise'>
            Signup
          </Link>
        </div>
        </div>
      </div>
    </div>
  );
};

export default Landing;
