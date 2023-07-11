import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebase";
import Sidebar from "../../components/Sidebar";

const Dashboard: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuthStatus = () => {
      const unsubscribe = onAuthStateChanged(auth, (user) => {
        if (!user) {
          navigate("/");
        }
      });
      return () => {
        unsubscribe();
      };
    };
    checkAuthStatus();
  }, [navigate]);

  return (
    <>
      <Sidebar></Sidebar>
    </>
  );
};

export default Dashboard;
