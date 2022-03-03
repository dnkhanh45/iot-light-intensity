import logo from './logo.svg';
import './App.scss';
import React from 'react'
// import logo from
import { RealTimeChart } from './RealTimeChart';
// import { Home } from './Home';
import Home from './Home';
function App() {
  return (
    <div className="App">
      <div className="title">
      <img src={logo} className="App-logo" alt="logo" />
      <p className="app-title"> <b>Ứng dụng điều khiển ánh sáng thông minh</b> </p>
        </div> 

      {/* <div className="chart">
        <RealTimeChart />
        </div> */}
      <div className="modify"> <Home /></div>
  </div>

  );
}

export default App;
