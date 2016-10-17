(function(){
	var app = {

		time : null,
		intervalID: null,
		countClickPause: null,
		
		init : function() {
			app.listeners();
		},

		listeners : function() {
			$("#start").on("click", app.start);
			$("#stop").on("click", app.stop);
			$("#pause").on("click", app.pause);
			$("#inputUser").on("input", app.inputUser);
			$("#reset").on("click", app.reset);
		},

		inputUser : function() {
			app.time = $("#inputUser").val();
			app.timeDisplay();
		},

		start : function() {
			if (app.intervalID === null) {
				app.intervalID = setInterval(function() {
					if (app.time > 0) {
						app.time--;
						app.timeDisplay();
					}
				}, 1000);
			}
		},

		stop : function() {
			clearInterval(app.intervalID);
			app.intervalID = null;
		},

		timeDisplay : function() {
			var minutes = Math.floor(app.time / 60);
			var seconds = Math.floor(app.time % 60);
			app.timeDisplayMinutes(minutes);
			app.timeDisplaySeconds(seconds);
		},

		timeDisplayMinutes : function(min) {
			if (min > 9) {
				$("#minutes").html(min)
			} else {
				$("#minutes").html("0" + min)
			}
		},

		timeDisplaySeconds : function(sec) {
			if (sec > 9) {
				$("#seconds").html(sec);
			} else {
				$("#seconds").html("0" + sec);
			}
		},

		pause : function() {
			app.countClickPause++;
			if (app.countClickPause % 2 === 1) {
				clearInterval(app.intervalID);
				app.intervalID = null;
				$("#pause").html("Play ");		
			} else {
				app.start();
				$("#pause").html("Pause");
			}
		},

		reset : function() {
			app.time = $("#inputUser").val();
			app.timeDisplay();
			clearInterval(app.intervalID);
			app.intervalID = null;
		}

	}

	app.init();

})();