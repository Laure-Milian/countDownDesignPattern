(function(){
	var app = {

		time : null,
		intervalID: null,
		default: 6,
		timeMax: 6,
		
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
					} else {
						app.videoLaunch();
					}
				}, 1000);
			}
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
			app.displayProgressBar();
		},

		timeDisplay : function(timeElement, selector) {
			if (timeElement > 9) {
				$(selector).html(timeElement)
			} else {
				$(selector).html("0" + timeElement)
			}
		},

		displayProgressBar : function() {
			var progressPercent = Math.floor(100 - ((app.time / app.timeMax) * 100));
			$("#progress").css("width", progressPercent + "%");
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
		},

		videoLaunch : function() {
			app.stop();
			$("#video").html('<iframe width="560" height="315" src="https://www.youtube.com/embed/7jWYUtQZhK0?autoplay=1" frameborder="0" allowfullscreen></iframe>');
		}

	}

	app.init();

})();