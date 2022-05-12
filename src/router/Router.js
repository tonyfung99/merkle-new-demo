import React from 'react';
import { HashRouter, Route, Routes } from 'react-router-dom';

function BasicRoute() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/front" element={<Front />} />
        </Route>
      </Routes>
    </HashRouter>
  );
}

export default BasicRoute;
