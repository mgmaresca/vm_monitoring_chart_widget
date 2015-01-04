chart_data = {
	labels: ["January", "February", "March", "April", "May", "June", "July"],
	datasets: [
	{
		label: "CPU Usage",
		fillColor : "rgba(151,187,205,0.5)",
		strokeColor : "#099EC6",
		pointColor : "#002E67",
		pointStrokeColor : "#fff",
		data: [65, 59, 80, 81, 56, 55, 40]
	}
	]
};

chart_opt = {
	scaleOverlay : false,
	scaleOverride : false,
	scaleLineColorX : "transparent",
	scaleLineColorY : "#002E67",
	scaleLineWidth : 3,
	scaleFontFamily : "'comfortaa'",
	scaleFontSize : 12,
	scaleFontStyle : "normal",
	scaleFontColorY : "#099EC6",
	scaleFontColorX : "rgb(127,127,127)",
	scaleShowGridLinesX : true,
	scaleShowGridLinesY : false,
	scaleShowMiniLinesY : false,
	scaleGridLineColor : "rgba(0,0,0,.05)",
	scaleGridLineWidth : 2,
	bezierCurve : false,
	pointDot : true,
	pointDotRadius : 4,
	pointDotStrokeWidth : 2,
	datasetStroke : true,
	datasetStrokeWidth : 1,
	datasetFill : false ,
	animation : true,
	animationSteps : 60,
	animationEasing : "easeOutQuart",
	onAnimationComplete : null
};

showChart = function(check_param, scale, div){

	setChart(check_param, scale);
	getData();

	id = '#' + div;
	$(id).empty();

	$(id).append($('<canvas>', {id: 'chart'}));

	

	var chart_ctx = $("#chart").get(0).getContext("2d");
	var monitoring_chart = new Chart(chart_ctx).Line(chart_data, chart_opt);

};

setChart = function(check_param, scale) {

	switch (check_param) {

		case 'cpu':
		chart_data.datasets[0].label = "CPU Usage";
		break;
		case 'disk':
		chart_data.datasets[0].label = "Disk Usage";
		break;
		case 'mem':
		chart_data.datasets[0].label = "Memory Usage";
		break;
		default:
		console.log("Error. Unable to identify check_param to set chart's title");
		break;
	};

	switch (scale) {

		case 'day':
		chart_data.labels = ["12:00","13:00","14:00","15:00","16:00","17:00","18:00"];
		break;
		case 'week':
		chart_data.labels = ["Monday","Tuesday","Wendesday","Thursday","Friday","Saturday","Sunday"];
		break;
		case 'month':
		chart_data.labels = ["03/01","03/01","03/01","03/01","03/01","03/01","03/01"];
		break;
		default:
		lconsole.log("Error. Unable to identify the sclae to set chart's labels");
		break;
	};
};

getData = function() {
	chart_data.data = [28,48,40,19,96,27,100];
};