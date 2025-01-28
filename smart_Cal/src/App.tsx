import AuthScreen from './screens/AuthScreen';
import LandingPage from './screens/LandingPage'
import { Routes, Route } from "react-router-dom";

function App() {

  return (
    <div>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path='/auth' element={<AuthScreen />} />
      </Routes>
    </div>
  )
}

export default App
