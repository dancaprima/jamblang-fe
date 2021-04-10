import Logo from '../assets/images/logo-jamscan.png';
import IconHistory from './IconHistory';
import { useHistory } from "react-router-dom";

const Header = () => {
  let history = useHistory();

  return (
    <header>
      <img src={Logo} alt='logo jamscan' className='logo' />
      <span onClick={() => history.push('/history')}>
        <IconHistory />
      </span>
    </header>
  )
}

export default Header;
