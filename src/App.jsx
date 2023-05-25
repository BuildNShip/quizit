import "./App.css";
import TestLanding from "./pages/TestLanding/TestLanding";
import Landing from "./pages/Landing/Landing";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import TestReport from "./pages/TestReport/TestReport";

function App() {
    return (
        <div className="App">
            <Router>
                <Routes>
                    <Route path="/" element={<Landing />} />
                    <Route path="/:name" element={<TestLanding />} />
                    <Route path="/report/:name" element={<TestReport />} />
                </Routes>
            </Router>
        </div>
    );
}

export default App;
