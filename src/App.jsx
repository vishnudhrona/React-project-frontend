import { BrowserRouter, Route, Routes } from "react-router-dom"
import Patientrouter from "./Router/Patientrouter"
import Doctorrouter from "./Router/Doctorrouter"
import Adminrouter from "./Router/Adminrouter"

function App() {

  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path="/*" element = {<Patientrouter />} />
      <Route path="/doctors/*" element = {<Doctorrouter />} />
      <Route path="/admin/*" element = {<Adminrouter />} />
    </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
