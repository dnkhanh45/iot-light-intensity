import "./home.scss";
import { RealTimeChart } from './RealTimeChart';
import axios from 'axios';
import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

class Home extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      min: 0,
      max: 0,
      startDate: new Date('March 1, 2022 00:00:00'),
      currentDate: new Date(),
      endDate: new Date(),
      series: null
    }
  }

  componentDidMount() {
    axios.get("http://localhost:5000/init").then(response => {
      console.log(response);
      this.setState({
        min: response.data.min,
        max: response.data.max,
        startDate: new Date('March 1, 2022 00:00:00'),
        currentDate: new Date(),
        endDate: new Date(),
        series: null
      })
    })
  }

  setStartDate(date) {
    this.setState({
      currentDate: date
    })
    console.log(this.state.currentDate);
    var bodyFormData = new FormData();
    bodyFormData.append('time', date.getTime());
    axios.post("http://localhost:5000/", bodyFormData).then(response => {
      console.log(response);
      console.log(response.data);
      this.setState({
        series: response.data
      })
    })
  }

  handleMinChange = (e) => {
    const value = e.target.value;
    if (value < this.state.max) {
      this.setState({ min: Number(value) })
    }
  }

  handleMaxChange = (e) => {
    const value = e.target.value;
    if (value > this.state.min) {
      this.setState({ max: Number(value) })
    }
  }

  handleClick = (e) => {
    e.preventDefault();
    console.log(this.state);
    var bodyFormData = new FormData();
    bodyFormData.append('min', this.state.min);
    bodyFormData.append('max', this.state.max);
    axios.post("http://localhost:5000/200", bodyFormData).then(response => {
      console.log(response);
      console.log(response.data);
    })
  }
  render() {
    // const [value, setValue] = React.useState(new Date('2014-08-18T21:11:54'));
    return (
      <div className="home">
        <div className="chart-parent">
          <div className="date-time">
            <DatePicker
              selected={this.state.currentDate}
              minDate={this.state.startDate}
              maxDate={this.state.endDate}
              showTimeSelect={true}
              dateFormat="dd/MM/yyyy hh:mm aa"
              minTime={this.state.startDate.getTime()}
              maxTime={
                (this.state.currentDate.getDay() == this.state.endDate.getDay()) ?
                this.state.endDate.getTime() : new Date('March 1, 2022 23:59:59').getTime()
              }
              // min={this.state.startDate.getTime()}
              // max={this.state.endDate.getTime()}
              onChange={(date) => this.setStartDate(date)} />
            {/* <TimePicker
              value={value}
              onChange={setValue} /> */}
          </div>
          <div className="Chart">
            <RealTimeChart />
          </div>
        </div>
        <div className="modify-numbers-of-light">
          <div className='title'>CHANGE</div>
          <p></p>
          <div className='sub-title'>MIN</div>
          <input className="item-quantity"
            value={this.state.min}
            onChange={this.handleMinChange}
            type="number"
            min={0}
            max={350}
            step={50}
            onKeyDown={(event) => {
              event.preventDefault();
            }}
          />
          <p></p>
          <div className='sub-title'>MAX</div>
          <input className="item-quantity"
            value={this.state.max}
            onChange={this.handleMaxChange}
            type="number"
            min={50}
            max={400}
            step={50}
            onKeyDown={(event) => {
              event.preventDefault();
            }}
          />
          <p></p>
          <button
            className="button-update"
            onClick={this.handleClick}
          >
            Update</button>
        </div>
      </div>
    )
  }
}

export default Home;
