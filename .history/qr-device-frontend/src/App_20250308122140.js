import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import DevicePage from "./Components/DevicePage";
import DeviceToolsLayout from "./DeviceTools/DeviceToolsLayout";
import DeviceViewer from "./DeviceTools/DeviceViewer";
import DeviceToolsHome from "./DeviceTools/DeviceToolsHome";
// Import other components as needed

function App() {
  return (
    <Router>
      <Routes>
        {/* Device Tools routes */}
        <Route path="/device-tools" element={<DeviceToolsLayout />}>
          <Route index element={<DeviceToolsHome />} />
          <Route path="view/:id" element={<DeviceViewer />} />
        </Route>
        
        {/* Original routes */}
        <Route path="/devices" element={<DevicePage />} />
        
        {/* Redirect root to device tools */}
        <Route path="/" element={<Navigate to="/device-tools" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
