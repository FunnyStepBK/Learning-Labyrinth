import { Routes, Route, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Home from "./pages/home";
import SignUp from "./pages/sign-up";
import SignIn from "./pages/sign-in";
import Landing from "./pages/landing";
import ProtectedRoute from "./components/ProtectedRoute";
import isLoggedIn from "./pages/utils/checkLogin";

function App() {
  const navigate = useNavigate();

  useEffect(() => {
    isLoggedIn();
   
  }, [navigate]);
  
  
  return (
    <div>
      <Routes>
        <Route index element={<Landing />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/home" element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        } />
        </Routes>
    </div>
  );
}


export default App;
