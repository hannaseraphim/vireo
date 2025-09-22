import Signup from './components/routes/Signup'
import Login from './components/routes/Login';
import Home from './components/routes/Home'
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
import PublicRoute from './components/PublicRoute';
import './components/Default.css'
import './Lang'

function App() {
  return ( 
    <Router>
      <Routes>
        <Route path='/login' element={<PublicRoute> <Login /></PublicRoute>}/>
        <Route path='/signup' element={<PublicRoute> <Signup /></PublicRoute>}/>
        <Route path='/' element={<ProtectedRoute> <Home /> </ProtectedRoute>}/>
      </Routes>
    </Router>
  )
}

export default App
