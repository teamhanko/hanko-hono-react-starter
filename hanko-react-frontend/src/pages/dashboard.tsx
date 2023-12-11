import HankoProfile from "../components/HankoProfile";
import LogoutBtn from '../components/LogoutBtn';
import { useNavigate } from "react-router-dom";


const Dashboard = () => {
  const navigate = useNavigate();
  return (
    <>
      <HankoProfile />
      <div>
        <LogoutBtn />
        <button style={{ marginLeft: "10px" }} onClick={() => navigate("/protected")}>Access the protected page</button>
      </div>
    </>
  )
}

export default Dashboard;