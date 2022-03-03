import React, { Component } from 'react';
import $ from 'jquery';
import * as Charting from 'chart-library';

export class RealTimeChart extends Component {

	constructor(props) {
		super(props);

		this.el = React.createRef();

		this.state = {
			chart: null
		}
	}

	componentDidMount() {
		var myChart = new Charting.Controls.AreaChart(this.el.current);

		myChart.title = "Chart";
		myChart.theme.titleFontSize = 16;
		myChart.theme.axisTitleFontSize = 14;
		myChart.showLegend = false;

		myChart.showXCoordinates = false;
		myChart.xAxisLabelRotationAngle = 30;

		myChart.xAxis.minValue = 0;
		myChart.xAxis.interval = 1;
		myChart.xAxis.maxValue = 40;
		myChart.xAxis.title = "Time";
		myChart.yAxis.title = "Light Intensity (Lux)";
		myChart.gridType = Charting.GridType.Horizontal;

		myChart.gridType = Charting.GridType.Horizontal;
		myChart.theme.gridColor1 = new Charting.Drawing.Color("#ffffff");
		myChart.theme.gridColor2 = new Charting.Drawing.Color("#ffffff");
		myChart.theme.gridLineColor = new Charting.Drawing.Color("#cecece");
		myChart.theme.gridLineStyle = Charting.Drawing.DashStyle.Dash;

		// myChart.plot.seriesStyle = new Charting.CandlestickSeriesStyle(
		// 	new Charting.Drawing.Brush("#ff2f26"),
		// 	new Charting.Drawing.Brush("#00b140"),
		// 	new Charting.Drawing.Brush("#2e2e2a"), 2,
		// 	Charting.Drawing.DashStyle.Solid, myChart.plot.seriesRenderers.item(0));

		myChart.theme.axisLabelsBrush = myChart.theme.axisTitleBrush = myChart.theme.axisStroke =
			new Charting.Drawing.Brush("#2e2e2e");
		myChart.theme.highlightStroke = new Charting.Drawing.Brush("#cecece");
		myChart.theme.uniformSeriesFill = new Charting.Drawing.LinearGradientBrush("#FFFFCC", "#FFFF00");

		var dataList = new Charting.Collections.List();

		var intervalId = setInterval(this.updateStock.bind(this), 3000);
		this.setState({ chart: myChart, data: dataList, intervalId: intervalId });
		this.updateStock();
	}

	updateStock() {
		// $.getJSON("https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=IBM&interval=1min&apikey=demo", function (json) {
		$.getJSON("http://localhost:5000/", function (json) {

			// console.log(json);

			var times = json["Time Series (1min)"];

			var update = false;

			if (this.state.chart.series.count() > 0)
				update = true;

			for (var time in times) {
				// console.log(time);
				var stock_info = times[time];

				// var dataItem = new Charting.StockPrice(stock_info["1. open"], stock_info["4. close"], stock_info["3. low"],
				// 	stock_info["2. high"], new Date(time));
				var dataItem = new Charting.StockPrice(stock_info["1. open"], "", "", "", new Date(time));

				if (!update) {
					// console.log("update");
					this.state.data.insert(0, dataItem);
				}
				else {
					this.state.data.add(dataItem);
					this.state.data.removeAt(0);
					break;
				}
			}

			// console.log(this.state.data);
			// console.log(this.state.data["_items"]);

			var series = new Charting.StockPriceSeries(this.state.data);
			series.dateTimeFormat = Charting.DateTimeFormat.ShortTime;

			var data = new Charting.Collections.ObservableCollection();
			data.add(series);
			this.state.chart.series = data;
			this.state.chart.draw();
		}.bind(this));
	}

	render() {
		return (
			<div>
				<canvas width="600px" height="400px" ref={this.el}></canvas>
			</div>
		);
	}

}