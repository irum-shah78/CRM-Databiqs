import { useEffect } from "react";
const Dashboard = ({ currentUser }) => {
  useEffect(() => {
    if (currentUser && currentUser.email) {
      console.log("Current User Email:", currentUser.email);
    }
  }, [currentUser]);

  return (
    <>
      <div className="ms-8">
        <h1 className="text-black ">Dashboard</h1>
        {currentUser && currentUser.email && (
          <p className="text-gray-700">Welcome, {currentUser.email}!</p>
        )}
      </div>
    </>
  );
};

export default Dashboard;
