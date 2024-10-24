import "./App.css";
import { useState } from "react";
import Header from "./components/header/Header";
import JobCalculator from "./pages/jobcalculator/JobCalculator";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Sidebar from "./components/sidebar/Sidebar.jsx";
import Dashboard from "./pages/dashboard/Dashboard.jsx";
import LeadManagment from "./components/leadmanagment/LeadManagment.jsx";
import DealManagment from "./components/dealmanagment/DealManagment.jsx";
import LeadDetails from "./components/leaddetails/LeadDetails.jsx";
import JobCalculatorDetails from "./components/jobcalculatordetails/JobCalculatorDetails.jsx";
import Tasks from "./pages/tasksandfollowup/TasksFollowup.jsx";
import AddTask from "./components/addtask/AddTask.jsx";
import Permit from "./pages/permithoaprop/PermitHoa.jsx";
import Chatbot from "./components/chatbot/ChatBot.jsx";
import Commissions from "./pages/commissions/Commissions.jsx";
import AddCommission from "./components/addcommission/AddCommission.jsx";
import EditCommission from "./components/editcommission/EditCommission.jsx";
import SignIn from "./pages/signin/Signin.jsx";
import SignUp from "./pages/signup/Signup.jsx";

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const handleUserSignIn = (userData) => {
    setCurrentUser({ email: userData.email, ...userData });
  };

  // const handleUserSignOut = () => {
  //   setCurrentUser(null);
  // };

  return (
    <>
      <Router>
        <Header user={currentUser} />
        <div className="flex">
          <Sidebar
            isSidebarOpen={isSidebarOpen}
            setIsSidebarOpen={setIsSidebarOpen}
          />

          <div
            className={`flex-1 p-4 transition-all duration-300 ease-in-out ${
              isSidebarOpen ? "xl:ml-52 lg:ml-48 md:ml-44 ml-2" : "ml-0"
            }`}
          >
            <Chatbot />
            <Routes>
              <Route path="/" element={<Navigate to="/dashboard" />} />
              <Route
                path="/dashboard"
                element={<Dashboard currentUser={currentUser} />}
              />
              <Route path="/jobcalculator" element={<JobCalculator />} />
              <Route
                path="/leadmanagement"
                element={<LeadManagment currentUser={currentUser} />}
              />
              <Route path="/dealmanagement" element={<DealManagment />} />
              <Route path="/lead/:id" element={<LeadDetails />} />
              <Route
                path="/jobcalcdetails"
                element={<JobCalculatorDetails />}
              />
              <Route path="/tasks" element={<Tasks />} />
              <Route path="/addtask" element={<AddTask />} />
              <Route path="/permit-hoa" element={<Permit />} />
              <Route path="/financials/commissions" element={<Commissions />} />
              <Route path="/addcommissions" element={<AddCommission />} />
              <Route path="/commissions/:id" element={<EditCommission />} />
              <Route
                path="/signin"
                element={<SignIn setUser={handleUserSignIn} />}
              />
              <Route path="/signup" element={<SignUp />} />
            </Routes>
          </div>
        </div>
      </Router>
    </>
  );
}

export default App;
