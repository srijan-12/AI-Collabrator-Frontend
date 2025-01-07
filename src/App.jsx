import { BrowserRouter, Routes, Route } from "react-router-dom"
import { Login } from "./Components/Login"
import { Signup } from "./Components/Signup"
import {Provider} from 'react-redux'
import appStore from "./store/appStore"
import { Home } from "./Components/Home"
import { Project } from "./Components/Project"
export default function App() {
  return (
    <Provider store={appStore}>
      <BrowserRouter basename="/api">
          <Routes>
              <Route path="/" element={<Home/>}/>
              <Route path="/user/login" element={<Login/>}/>
              <Route path="/user/signup" element={<Signup/>}/>
              <Route path="/project/:id" element={<Project/>}/>
          </Routes>
      </BrowserRouter>
   </Provider>
  )
}