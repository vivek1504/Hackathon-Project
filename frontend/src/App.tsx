import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import { Navbar } from './components/Navbar'
import { UserProfile } from './components/UserProfile'
import { Signup } from './components/Signup'
import { HomePage } from './components/HomePage'
import { About } from './components/About'

function App() {
  return <>
    <Navbar />
    <BrowserRouter>
        <Routes>
            <Route path='/UserProfile' element={<UserProfile></UserProfile>}></Route>
            <Route path='/signup' element={<Signup></Signup>}></Route>
            <Route path='/' element={<HomePage></HomePage>}></Route>
            <Route path='/about' element={<About></About>}></Route>
        </Routes>
    </BrowserRouter>
  </>
}

export default App
