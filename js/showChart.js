months = ["January", "February", "March", "April", "May", "June", "July"];
days = ["Monday", "Tuesday", "Wednesday","Thursday", "Friday", "Saturday", "Sunday"];
hours = ["00:00","01:00","02:00","03:00","04:00","05:00","06:00","07:00","08:00","09:00",
		 "10:00","11:00","12:00","13:00","14:00","15:00","16:00","17:00","18:00","19:00",
		 "20:00","21:00","22:00","23:00"];

data = {
	labels: months,
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

opt = {
	scaleOverlay : false,
	scaleOverride : false,
	scaleLineColorX : "transparent",
	scaleLineColorY : "#002E67",
	scaleLineWidth : 3,
	scaleFontFamily : "'comfortaa'",
	scaleFontSize : 9,
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

showChart = function(vmID, tenant, token, check_param, scale, div) {

	setChart(check_param, scale);

	getData();

	id = '#' + div;
	$(id).empty();

	$(id).append($('<h2 id = "title"> CPU usage </h2>'));
	$(id).append($('<canvas>', {id: 'chart'}));
	$(id).append($('<div>', {id: 'refresh'
									}).append($('<button>', {id: 'refresh_button'})));
	$('#refresh_button').on('click', refreshData);

	var ctx = $("#chart").get(0).getContext("2d");
	chart = new Chart(ctx).Line(data, opt);
	console.log(chart);

};

setChart = function(check_param, scale) {

	var date = new Date();

	switch (check_param) {

		case 'cpu':
		data.datasets[0].label = "CPU Usage";
		break;
		case 'disk':
		data.datasets[0].label = "Disk Usage";
		break;
		case 'mem':
		data.datasets[0].label = "Memory Usage";
		break;
		default:
		console.log("Error. Unable to identify check_param to set chart's title");
		break;
	};

	switch (scale) {

		case 'day':
		var today = date.getDay();
		var first = [];
		var last = [];

		for(i = today+1; i <= 6; i++){
		first[first.length] = days[i];
		}

		for(i = 0; i<= today; i++){
		last[last.length] = days[i];
		}

		data.labels = first.concat(last);
		break;

		case 'week':
		data.labels = ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"];
		break;

		case 'month':
		data.labels = ["03/01","03/01","03/01","03/01","03/01","03/01","03/01"];
		break;

		default:
		lconsole.log("Error. Unable to identify the scale to set chart's labels");
		break;
	};
};

getData = function() {
	data.datasets[0].data  = [28,48,40,200,96,27,100];
};

refreshData = function() {
	chart.update();
	
};