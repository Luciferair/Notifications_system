import AuthScreen from './screens/AuthScreen';
import LandingPage from './screens/LandingPage'
import { Routes, Route } from "react-router-dom";

function App() {

  return (

    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path='/auth' element={<AuthScreen />} />
    </Routes>

  )
}

export default App
