$(document).ready(function(){

	var url ="?ajax=1",
		recentQuake = '0',
		strongestQuake = '0',
		totalSeconds = 0,

		qMap = new GMaps({
			div: '#map',
			lat: -41,
			lng: 174,
			zoom: 5,
			disableDefaultUI: true
		});

	function cleanTime(time) {
		return time.split('.')[0].split(' ')[1];
	}

	function getSeconds(time) {
		var QuakeTime = fixUTC(time),
			currTime = new Date();
		console.log(currTime + '-' + QuakeTime );
		currTime = currTime.getTime(currTime);
		QuakeTime = QuakeTime.getTime(QuakeTime);
		difference = currTime - QuakeTime;
		console.log(currTime + '-' + QuakeTime + '=' + difference);
		var hours = Math.floor(difference / 36e5),
			minutes = Math.floor(difference % 36e5 / 60000),
			seconds = Math.floor(difference % 60000 / 1000);
		console.log(hours, minutes, seconds);
		$('.hours').html(hours);
		$('.minutes').html(minutes);
		$('.seconds').html(seconds);

		$('.time_since').removeClass('invisible');
	}


	function checkResponse() {
		$.ajax({
			url: url,
			crossDomain: true,
			dataType: 'json'
		}).done(function(data){
			thisQuake = data.features[0];
			if ( recentQuake != thisQuake.id ) {
				recentQuake = thisQuake.id;
				time = getTime(thisQuake.properties.origintime);
				console.log('TotalSeconds', totalSeconds);

				$('.xcoord', '.recent_quake').html(thisQuake.geometry.coordinates[0]);
				$('.ycoord', '.recent_quake').html(thisQuake.geometry.coordinates[1]);
				$('.depth', '.recent_quake').html(thisQuake.properties.depth.toFixed(0) + ' km');
				$('.publicid', '.recent_quake').html(thisQuake.properties.publicid);
				$('.origintime', '.recent_quake').html(time);
				$('.magnitude', '.recent_quake').html(thisQuake.properties.magnitude.toFixed(1));

				$('.recent_quake').removeClass('invisible');
				$('.latest').removeClass('latest');
				qMap.drawOverlay({
					lat: thisQuake.geometry.coordinates[1],
					lng: thisQuake.geometry.coordinates[0],
					content: '<div data-publicid="'+thisQuake.properties.publicid+'" class="overlay latest">' + thisQuake.properties.magnitude.toFixed(1) + 'M&nbsp;' + time + '</div>'
				});

				console.log('populated again', strongestQuake);
				if ( strongestQuake.properties.magnitude < thisQuake.properties.magnitude ) {
					strongestQuake = thisQuake;
					populateStrongest(strongestQuake);
				}
			}
			totalSeconds = getSeconds(thisQuake.properties.origintime);

			$('div').find('[data-publicid="' + thisQuake.properties.publicid + '"]').twinkle({
				"effectOptions": {
					"color": "rgba(0,150, 0, 0.5)",
					"radius": 80
				}
			});
			$('div').removeClass('strongest');
			$('div[data-publicid="' + strongestQuake.properties.publicid + '"]').addClass('strongest');

			$('.strongest').twinkle({
				"effectOptions": {
					"radius": 100
				}
			});
		});
	}


	function populateStrongest(thisQuake) {
		time = getTime(thisQuake.properties.origintime);
		$('.xcoord', '.strongest_quake').html(thisQuake.geometry.coordinates[0]);
		$('.ycoord', '.strongest_quake').html(thisQuake.geometry.coordinates[1]);
		$('.depth', '.strongest_quake').html(thisQuake.properties.depth.toFixed(0) + ' km');
		$('.publicid', '.strongest_quake').html(thisQuake.properties.publicid);
		$('.origintime', '.strongest_quake').html(time);
		$('.magnitude', '.strongest_quake').html(thisQuake.properties.magnitude.toFixed(1));
		$('.strongest').removeClass('strongest');
	}


	function fixUTC(UTC) {
		UTC = UTC.replace(/-/g, '/').split('.')[0];
		return new Date(UTC + ' UTC');
	}

	function getTime(UTC) {
		time = fixUTC(UTC);
		return time.toTimeString().split(' ')[0];
	}

	function initialSetup() {
		$.ajax({
			url: url,
			crossDomain: true,
			dataType: 'json'
		}).done(function(data){
			$.each(data.features, function(index, value) {
				recentQuake = value;

				if ( strongestQuake == '0' || strongestQuake.properties.magnitude < value.properties.magnitude ) {
					strongestQuake = value;
					$('div').removeClass('strongest');
				}

				mag = value.properties.magnitude.toFixed(1);
				time = getTime(value.properties.origintime);
				qMap.drawOverlay({
					lat: value.geometry.coordinates[1],
					lng: value.geometry.coordinates[0],
					content: '<div data-publicid="'+value.properties.publicid+'" class="overlay">' + mag + 'M&nbsp;' + time + '</div>'
				});
			});

			populateStrongest(strongestQuake);
		});
	}

	setInterval(checkResponse, 1000);
	initialSetup();

});
