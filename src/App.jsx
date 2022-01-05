import React from 'react';
import Router from 'src/app/router/Router';

import Navbar from 'src/components/Navbar';

import './App.css';

function App() {
  return (
    <div>
      <Navbar />
      <section className="container-fluid">
        <div className="row justify-content-center">
          <div className="col-12 col-xl-8">
            <Router />
          </div>
        </div>
      </section>
    </div>
  );
}

export default App;
