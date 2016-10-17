(function(){
	var app = {

		time : null,
		intervalID: null,
		default: 1500,
		timeMax: 1500,
		
		init : function() {
			app.listeners();
			app.time = app.default;
			app.timeSeparation();
		},

		listeners : function() {
			$("#btnstart").on("click", app.start);
			$("#btnstop").on("click", app.stop);
			$("#btnpause").on("click", app.pause);
			$("#btnreset").on("click", app.reset);
			$("#inputUser").on("input", app.inputUser);
		},

		inputUser : function() {
			app.time = app.timeMax = $("#inputUser").val();
			if (app.time >= 0) {
				app.timeSeparation();
			}
		},

		start : function() {
			if (app.intervalID === null) {
				app.intervalID = setInterval(function() {
					if (app.time > 0) {
						app.time--;
						app.timeSeparation();
						app.displayProgressBar();
					}
				}, 1000);
			}
		},

		displayProgressBar : function() {
			console.log(app.timeMax);
			var progressPercent = Math.floor(100 - ((app.time / app.timeMax) * 100));
			$("#progress").css("width", progressPercent + "%");
			console.log(progressPercent);
		},

		stop : function() {
			clearInterval(app.intervalID);
			app.intervalID = null;
		},

		timeSeparation : function() {
			var minutes = Math.floor(app.time / 60);
			var seconds = Math.floor(app.time % 60);
			app.timeDisplay(minutes, "#minutes");
			app.timeDisplay(seconds, "#seconds");
		},

		timeDisplay : function(timeElement, selector) {
			if (timeElement > 9) {
				$(selector).html(timeElement)
			} else {
				$(selector).html("0" + timeElement)
			}
		},

		pause : function() {
			if (app.intervalID !== null) {
				app.stop();
				$("#btnpause").html("Play ");		
			} else {
				app.start();
				$("#btnpause").html("Pause");
			}
		},

		reset : function() {
			app.time = $("#inputUser").val();
			app.timeSeparation();
			app.stop();
		}

	}

	app.init();

})();