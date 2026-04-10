import { useState, useEffect } from "react";
import LoginModal from "../app/components/LoginModal";

interface Props {
  children: JSX.Element;
}

interface User {
  _id: string;
  name: string;
  mobile: string;
}

const ProtectedRoute: React.FC<Props> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showLogin, setShowLogin] = useState(false);

  // ✅ Check token on mount
  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      setIsAuthenticated(true);
    } else {
      setShowLogin(true);
    }
  }, []);

  // ✅ When login success
  const handleLoginSuccess = (user: User) => {
    setIsAuthenticated(true);
    setShowLogin(false);
  };

  // 🚫 Show modal if not logged in
  if (!isAuthenticated) {
    return (
      <>
        {showLogin && (
          <LoginModal
            onClose={() => {}} // ❌ prevent closing
            onLoginSuccess={handleLoginSuccess}
          />
        )}
      </>
    );
  }

  // ✅ Show page after login
  return children;
};

export default ProtectedRoute;