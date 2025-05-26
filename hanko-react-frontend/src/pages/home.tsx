import HankoAuth from '../components/HankoAuth'
import HankoStarterInfo from '../hanko starter components/HankoStarterInfo'

const Home = () => {
  return (
    <div>
        <title>Hanko React + Node Starter </title>
        <HankoStarterInfo></HankoStarterInfo>
        <HankoAuth></HankoAuth>
    </div>
  )
}

export default Home