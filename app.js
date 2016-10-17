(function(){
	var app = {

		time : null,
		intervalID: null,
		
		init : function() {
			app.listeners();
		},

		listeners : function() {
			$("#btnstart").on("click", app.start);
			$("#btnstop").on("click", app.stop);
			$("#btnpause").on("click", app.pause);
			$("#btnreset").on("click", app.reset);
			$("#inputUser").on("input", app.inputUser);
		},

		inputUser : function() {
			app.time = $("#inputUser").val();
			app.timeSeparation();
		},

		start : function() {
			if (app.intervalID === null) {
				app.intervalID = setInterval(function() {
					if (app.time > 0) {
						app.time--;
						app.timeSeparation();
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