import React from 'react';
import { HashRouter, Route, Routes } from 'react-router-dom';

import Layout from '../pages/Layout';
import Front from '../pages/Front';
import Detail from '../pages/Detail';

function BasicRoute() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/front" element={<Front />} />
          <Route path="/detail" element={<Detail />} />
        </Route>
      </Routes>
    </HashRouter>
  );
}

export default BasicRoute;
