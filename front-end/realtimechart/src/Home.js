import React from 'react'
import "./home.scss";
import { RealTimeChart } from './RealTimeChart';
class Home extends React.Component{
  render() {
    return (
      <div className="home">
        <div className="Chart">
        <RealTimeChart />
        </div>
        <div className="modify-numbers-of-light">
          
          <input className="item-quantity"
                    type="number"
                    min="-40"
                    max="5"
                    // value={quantity}
                    // onChange={handleNumberInputChange}
                  />
          <button
              className="button-update"
          >
              Update</button>
        </div>
    </div>
    )
  }
}

export default Home;
