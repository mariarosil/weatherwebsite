$(function(){
	var locale = 'us',
		weatherDiv = $('#weather'),
		scroller = $('#scroller'),
		location = $('h1.location');

	getWeatherData(locale, dataReceived, showError);

	function dataReceived(data) {
		// Get the offset from UTC (turn the offset minutes into ms)
		var offset = (new Date()).getTimezoneOffset()*60*1000;
		var city = data.city.name;
		var country = data.city.country;

		$.each(data.list, function(){
			// "this" holds a forecast object
			// Get the local time of this forecast (the api returns it in utc)
			var localTime = new Date(this.dt*1000 - offset);
			addWeather(
				this.weather[0].icon,
				moment(localTime).format('DD MMMM'),	// We are using the moment.js library to format the date
				this.weather[0].description ,  this.temp.day.toFixed(0) + '°C'
			);
		});
		// Add the location to the page
		location.html(city+', <b>'+country+'</b>');
		weatherDiv.addClass('loaded');
		// Set the slider to the first slide
	}

	function addWeather(icon, day, condition, temp) {

		//var markup = '<li>'+
		//	'<img src="img/icons/'+ icon +'.png" />'+
			//' <p class="day">'+ day +'</p> <p class="cond">'+ condition +
			//'</p></li>';
        
        var markup = '<li>' +
			'<p class="table_day_name">' + day +'</p>' +
            '<p class="table_day_pic"><img src="icons/'+ icon + '.png" /></p>' +
			'<p class="table_day_descr">' + condition + '</p>' +
            '<p class="table_day_descr">' + temp + '</p>' +
			'</p></li>';

		scroller.append(markup);
	}

	/* Error handling functions */
	function showError(msg) {
		weatherDiv.addClass('error').html(msg);
	}
});
