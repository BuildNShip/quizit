import "./App.css"
import Landing from "./pages/Landing/Landing"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"


function App() {
  return (
    <div className="App">
       <Router>
        <Routes>
          <Route path="/launchpad" element={<Landing />} />
        </Routes>
      </Router>
      
    </div>
  )
}

export default App
