import React, { Component } from 'react';
import $ from 'jquery';
import * as Charting from 'chart-library';
import { CSVLink, CSVDownload } from "react-csv";

export class RealTimeChart extends Component {

	constructor(props) {
		super(props);

		this.el = React.createRef();

		this.state = {
			data: new Charting.Collections.List(),
			series: props?.series,
			chart: null
		}
	}

	componentDidMount() {
		this.setState({
			chart: null
		});
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

		myChart.theme.axisLabelsBrush = myChart.theme.axisTitleBrush = myChart.theme.axisStroke =
			new Charting.Drawing.Brush("#2e2e2e");
		myChart.theme.highlightStroke = new Charting.Drawing.Brush("#cecece");
		myChart.theme.uniformSeriesFill = new Charting.Drawing.LinearGradientBrush("#FFFFCC", "#FFFF00");

		var dataList = new Charting.Collections.List();

		var intervalId = setInterval(this.updateStock.bind(this), 10000);
		this.setState({ chart: myChart, data: dataList, intervalId: intervalId });
		this.updateStock();
	}

	componentDidUpdate(prevProps, prevState) {
		if (prevProps.series !== this.props.series) {
			clearInterval(this.state.intervalId);
			var dataList = new Charting.Collections.List();
			for (var time in this.props.series) {
				var stock_info = this.props.series[time];
				var dataItem = new Charting.StockPrice(stock_info["value"], "", "", "", new Date(time));
				dataList.add(dataItem);
			}
			var series = new Charting.StockPriceSeries(dataList);
			series.dateTimeFormat = Charting.DateTimeFormat.ShortTime;
			var data = new Charting.Collections.ObservableCollection();
			data.add(series);
			this.state.chart.series = data;
			this.state.chart.draw();
			this.setState({
				data: dataList
			})
		}
	}

	updateStock() {
		$.getJSON("http://localhost:5000/", function (json) {
			var times = json["timeSeries"];

			var update = (this.state.chart.series.count() > 0);

			for (var time in times) {
				var stock_info = times[time];
				var dataItem = new Charting.StockPrice(stock_info["value"], "", "", "", new Date(time));
				this.state.data.add(dataItem);
				if (update) {
					break;
				}
			}

			var series = new Charting.StockPriceSeries(this.state.data);
			series.dateTimeFormat = Charting.DateTimeFormat.ShortTime;

			var data = new Charting.Collections.ObservableCollection();
			data.add(series);
			this.state.chart.series = data;
			this.state.chart.draw();
		}.bind(this));
	}

	render() {
		const dataList = this.state.data;
		var data = [];
		for (var i in [...Array(dataList.count()).keys()]) {
			var _dataItem = dataList.item(i);
			console.log(_dataItem, Object.keys(_dataItem));
			data.push([_dataItem.m_date, _dataItem.m_open]);
		}
		return (
			<div>
				<canvas width="600px" height="400px" ref={this.el}></canvas>
				<p></p>
				<div>
					<CSVLink data={data}>Get CSV</CSVLink>
					<CSVDownload data={data} target="_blank" />
				</div>
			</div>
		);
	}

}