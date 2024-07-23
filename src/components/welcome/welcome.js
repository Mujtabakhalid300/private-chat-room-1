import React,{useEffect} from "react";
import { useNavigate } from "react-router-dom";

const Welcome = () => {
  const navigate = useNavigate();

  // Optional: Uncomment the useEffect block if you want to navigate after a delay
  useEffect(() => {
    setTimeout(() => {
      navigate("/name");
    }, 3000);
  }, [navigate]);

  return (
    <div className="main-div flex justify-center items-center h-screen">
      <div className="p-20 bg-white bg-opacity-50 backdrop-filter backdrop-blur-lg shadow-lg rounded-lg hello-section text-center">
        <h1 className="animate-blurAnimation text-white title-h1 text-4xl font-bold mb-4">Welcome</h1>
        {/* Add more content here if needed */}
      </div>
    </div>
  );
};

export default Welcome;
