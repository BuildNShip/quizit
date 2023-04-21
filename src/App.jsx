import "./App.css"
import TestLanding from "./pages/TestLanding/TestLanding"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"


function App() {
  return (
    <div className="App">
       <Router>
        <Routes>
          <Route path="/launchpad" element={<TestLanding />} />
        </Routes>
      </Router>
      
    </div>
  )
}

export default App
