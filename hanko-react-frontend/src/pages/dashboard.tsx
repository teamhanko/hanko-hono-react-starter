import HankoStarterInfo from '../hanko starter components/HankoStarterInfo'
import HankoStarterDashboard from '../hanko starter components/HankoStarterDashboard'
import HankoStarterHeader from '../hanko starter components/HankoStarterHeader'

const Dashboard = () => {
  return (
    <div>
      <title>Hanko starter dashboard</title>
      <HankoStarterInfo></HankoStarterInfo>
      <HankoStarterHeader></HankoStarterHeader>
      <HankoStarterDashboard></HankoStarterDashboard>
    </div>
  )
}

export default Dashboard