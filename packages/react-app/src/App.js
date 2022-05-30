
import React, { useEffect, useState } from "react";

import logo from "./ethereumLogo.png";

import AppRouter from "./routes";
import AppFrame from "./layouts/AppFrame";
import { Box, Container } from "@mui/material";



function App() {
  
  return (
    
      <AppFrame> 
        <AppRouter />
      </AppFrame>
    
  );
}

export default App;
