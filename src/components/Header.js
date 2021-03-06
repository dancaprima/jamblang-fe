import Logo from '../assets/images/logo-jamscan.png';
import IconHistory from './IconHistory';
import { useHistory } from "react-router-dom";
import { useEffect, useState } from 'react';

const Header = () => {
  let history = useHistory();
  
  return (
    <header>
      <img onClick={() => history.push('/')} src={Logo} alt='logo jamscan' className='logo' />
      <span onClick={() => history.push('/history')}>
        <IconHistory />
      </span>
    </header>
  )
}

export default Header;
