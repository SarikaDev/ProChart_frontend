import React from "react";
import { Outlet } from "react-router-dom";
import HandleRoutes from "./Routes/HandleRoutes";

const App = () => {
  return (
    <div className='min-h-screen '>
      <HandleRoutes>
        <Outlet />
      </HandleRoutes>
    </div>
  );
};

export default App;
