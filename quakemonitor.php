<?php
include_once('config.php');

if ( !empty($_GET['ajax']) ) {
		// OK cool - then let's create a new cURL resource handle
	$ch = curl_init();

	// Now set some options (most are optional)

	// Set URL to download
	curl_setopt($ch, CURLOPT_URL, 'http://www.geonet.org.nz/quakes/services/all.json');

	// Include header in result? (0 = yes, 1 = no)
	curl_setopt($ch, CURLOPT_HEADER, 0);

	// Should cURL return or print out the data? (true = return, false = print)
	curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

	// Timeout in seconds
	curl_setopt($ch, CURLOPT_TIMEOUT, 10);

	// Download the given URL, and return output
	$output = curl_exec($ch);

	// Close the cURL resource, and free system resources
	curl_close($ch);

	echo $output;
	die;
}
?>
<html>
	<head>
		<script src="Scripts/libs/jquery.js"></script>
		<script type="text/javascript"
src="https://maps.googleapis.com/maps/api/js?key=<?php echo GOOGLEMAPS_API ?>Q&sensor=false">
		</script>
		<script src="Scripts/libs/gmaps.js"></script>
		<script src="Scripts/libs/twinkle.js"></script>
		<script src="Scripts/main.js"></script>
		
		<link href="css/bootstrap.css" rel="stylesheet">
		<link href="css/bootstrap-responsive.css" rel="stylesheet">
		<link href="css/screen.css" rel="stylesheet">
	</head>
	<body>

		<div class="container">
		<div class="page-header">
			<h1>Quake monitor</h1>
		</div>
			<div class="row">
				<div class="span12 time_since invisible">
					<span class="hours"></span> Hrs <span class="minutes"></span> Min <span class="seconds"></span> Secs since last quake
				</div>
				<div class="span6 recent_quake invisible">
					<h3>Most recent quake:
						<span class="magnitude"></span>M - <span class="depth"></span> @ <span class="origintime"></span>
					</h3>
				</div>
				<div class="span6 strongest_quake">
					<h3>Strongest quake:
						<span class="magnitude"></span>M - <span class="depth"></span> @ <span class="origintime"></span>
					</h3>
				</div>
			</div>
			<div id="map"></div>
		</div>

</html>
