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
			$("#btnInputUser").on("click", app.inputUser);
			$("#reset").on("click", app.reset);
		},

		inputUser : function() {
			app.time = $("#inputUser").val();
			app.timeDisplay();
		},

		start : function() {
			intervalID = setInterval(function() {
				if (app.time > 0) {
					app.time--;
					app.timeDisplay();
				}
			}, 1000);
		},

		stop : function() {
			clearInterval(intervalID);
		},

		timeDisplay : function() {
			var minutes = Math.floor(app.time / 60);
			var seconds = Math.floor(app.time % 60);
			$("#minutes").html(minutes);
			$("#seconds").html(seconds);
		},

		pause : function() {
			app.countClickPause++;
			if (app.countClickPause % 2 === 1) {
				clearInterval(intervalID);
				$("#pause").html("Play ");		
			} else {
				app.start();
				$("#pause").html("Pause");
			}
		},

		reset : function() {
			app.time = 0;
			app.timeDisplay();
		}



	}

	app.init();

})();