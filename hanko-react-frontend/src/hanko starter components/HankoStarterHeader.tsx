
import { useNavigate, useLocation } from 'react-router-dom';

import LogoutButton from '../components/LogoutButton'
import { useUserData } from '../hooks/useUserData';

import './hanko-starter-style.css'


const HankoStarterHeader = () => {

  const navigate = useNavigate();

  const { email } = useUserData();

  const location = useLocation();

  let menu =           
  <button onClick={() => navigate('/profile')}>Profile</button>


  if(location.pathname.includes('profile')){
    menu = 
    <button onClick={() => navigate('/dashboard')}>Dashboard</button>
  }

  
  return (
    <div className='starterHeader'>
      <div className='headerGap'></div>
      <div className='userMenu'>
        <div className='userInfo'>
          <h1>{email}</h1>
          <img src="/userpfp.png"/>
          <img src="/expand.png" className='expandIcon'/>
        </div>
        <div className='userDropdown'>
          {menu}
          <LogoutButton></LogoutButton>
        </div>
      </div>
    </div>  
  )
}

export default HankoStarterHeader