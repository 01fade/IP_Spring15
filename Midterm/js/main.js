var vheight = window.innerHeight;
var vwidth = window.innerWidth;
var videoIdArray = [];
var inCart = [];

function getDataFromYT() {
	//http://stackoverflow.com/questions/29383394/i-want-the-total-amount-of-youtube-plays
	videoIdArray = [
	{videoId: "bsbTBgq5KDk", theme: "Lifestyle Lifestyle", start: 0, ytname: "Tyler" },
	{videoId: "zoA9WmJ-BTM", theme: "Merchandise", start: 0, ytname: "Smosh" },
	{videoId: "ckiQV_0RXyU", theme: "Lifestyle Products", start: 0, ytname: "Zoe" },
	{videoId: "yur1OmPly3k", theme: "Skin Products", start: 0, ytname: "Michelle" },
	{videoId: "0tM9OfLJU1M", theme: "Entertainment", start: 0, ytname: "Alfie" },
	{videoId: "VoMqWgqIiCo", theme: "Beauty Hauls", start: 0, ytname: "Zoe" }
	// {videoId: "X09MYZaizjk", theme: "Self Promotion", start: 0, ytname: "Tyler Oakley" }
	];

	for (var i = 0; i < videoIdArray.length; i++) {
	    var sURL = "https://gdata.youtube.com/feeds/api/videos/" + videoIdArray[i].videoId + "?v=2&alt=json";
	    getInfo(sURL, i);
	};
    console.log(videoIdArray);
    listenChannel(1);
}

function getInfo (_sURL, i) {
    $.getJSON( _sURL, function( data ) {
    	// data from the getJSON
		console.log(data);
	    videoIdArray[i].title = data.entry.media$group.media$title.$t;
	    videoIdArray[i].duration = data.entry.media$group.media$content[0].duration;
	    videoIdArray[i].count = data.entry.yt$statistics.viewCount;
	    videoIdArray[i].likes = data.entry.yt$rating.numLikes;
	    videoIdArray[i].dislikes = data.entry.yt$rating.numDislikes;
	    videoIdArray[i].rating = (parseFloat(data.entry.yt$rating.numLikes) / 
	    	(parseFloat(data.entry.yt$rating.numLikes) + 
	    	parseFloat(data.entry.yt$rating.numDislikes)) * 100).toFixed(2);
	});
}

function listenChannel (_activeChannel) {
	//show channel info and then fade out
	var index = _activeChannel - 1;
    $("#channel").html("CHANNEL 0"+ _activeChannel + "&nbsp; \t <span id='theme'>" + videoIdArray[index].theme + "</span>");
    $("#channel").fadeIn();
    setTimeout(function(){$("#channel").fadeOut();}, 8000);
    console.log("Active Channel: " + _activeChannel);


	setTimeout(function(){
	    if (videoIdArray[index].count != undefined) {
	    	var str = numberWithCommas(videoIdArray[index].count);
	    	var str2 = numberWithCommas(videoIdArray[index].likes);
	    	var str3 = numberWithCommas(videoIdArray[index].dislikes);
	    	$("#viewcount").html("<b>" + str + "</b> watched<br> <b>" + str2 + "</b> liked &nbsp; &nbsp;<b>" + str3 + "</b> disliked");
	    	setInterval(function () { 
	    		$("#viewcount").fadeToggle(2000, "swing");
			}, 1000);
	    };
	}, 2000);
}


function numberWithCommas(x) {
    var parts = x.toString().split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return parts.join(".");
}

function controls () {
	$("#plus").on('click', function(){
		var index = activeChannel - 1;
		//save the current pause time
		videoIdArray[index].start = Math.floor(player.getCurrentTime());

		if (activeChannel == 6) {
			activeChannel = 6;
			listenChannel(activeChannel);
		} else{
			activeChannel ++;
			listenChannel(activeChannel);
			var index = activeChannel - 1;

			player.loadVideoById({'videoId': videoIdArray[index].videoId, 'startSeconds': videoIdArray[index].start});
		};
		console.log(videoIdArray);
		$("#overlay").fadeOut();
	});
	$("#minus").on('click', function(){
		var index = activeChannel - 1;
		//save the current pause time
		videoIdArray[index].start = Math.floor(player.getCurrentTime());

		if (activeChannel == 1) {
			activeChannel = 1;
			listenChannel(activeChannel);
		} else{
			activeChannel --;
			listenChannel(activeChannel);
			var index = activeChannel - 1;

			player.loadVideoById({'videoId': videoIdArray[index].videoId, 'startSeconds': videoIdArray[index].start});
		};
		console.log(videoIdArray);
		$("#overlay").fadeOut();
	});
	$("#cart").on('click', function(){
    	$("#cart").removeClass("notify");
		$("#shoplist").html(" ");
		var total = 0;
		for (var i = inCart.length - 1; i >= 0; i--) {
			$("#shoplist").append("<li>" + inCart[i].img + "</li>").append("<p>- $" + inCart[i].price + " -</p><hr>");
			if ($.isNumeric(inCart[i].price) == true ){
				total = total + inCart[i].price;
			};
		};
		if (total != undefined) {
			$("#total").html("<b>TOTAL</b> &nbsp; $" + total);
			$("#buynow").fadeIn();
		} else {
			$("#shoplist").html("Your cart is empty.")
		};
		$("#overlay").fadeIn();
		// player.pauseVideo();
	});
	$("#close").on('click', function(){
		$("#overlay").fadeOut();
		// player.playVideo();
	});
	$("#buynow").on('click', function(){
		alert("Thank you for your interest in these awesome products! You'll be able to purchase them soon.");
	});

	$("#youtube").on('click', function(){ console.log("click");});

	// When the window is resized
	$(window).resize(function() {
		var newWidth = window.innerWidth;
		var newHeight = window.innerHeight;
		$('iframe').attr("width", newWidth).attr("height", newHeight);
	}).resize();
}

function advertising() {
	var index = activeChannel - 1;
	    if (activeChannel == 1) {
	    	if (player.getCurrentTime() > 10 && player.getCurrentTime() < 11) {
		    	$("#forsale").html("<div id='added'>"+ videoIdArray[index].ytname +" recommends this.</button><img src='img/"+ activeChannel +".jpg'>");
		    	$("#forsale").slideDown(1000, "linear");
		    	setTimeout(function(){$("#forsale").slideUp(1000, "linear");}, 8000);
		    	inCart.push({price: 40, img: "<img src='img/"+ activeChannel +".jpg'>"});
		    	$("#cartCount").html(" ( " + inCart.length + " )");
		    	$("#cart").addClass("notify");
		    };
	    	if (player.getCurrentTime() > 105 && player.getCurrentTime() < 106) {
		    	$("#forsale").html("<div id='added'>"+ videoIdArray[index].ytname +" recommends this.</button><img src='img/"+ activeChannel +"2.jpg'>");
		    	$("#forsale").slideDown(1000, "linear");
		    	setTimeout(function(){$("#forsale").slideUp(1000, "linear");}, 8000);
		    	inCart.push({price: " (Signup)", img: "<img src='img/"+ activeChannel +"2.jpg'>"});
		    	$("#cartCount").html(" ( " + inCart.length + " )");
		    	$("#cart").addClass("notify");
		    };
	    	if (player.getCurrentTime() > 200 && player.getCurrentTime() < 201) {
		    	$("#forsale").html("<div id='added'>"+ videoIdArray[index].ytname +" recommends this.</button><img src='img/"+ activeChannel +"3.jpg'></img><img src='img/"+ activeChannel +"4.jpg'></img>");
		    	$("#forsale").slideDown(1000, "linear");
		    	setTimeout(function(){$("#forsale").slideUp(1000, "linear");}, 8000);
		    	inCart.push({price: 25, img: "<img src='img/"+ activeChannel +"3.jpg'>"},{price: 15, img: "<img src='img/"+ activeChannel +"4.jpg'>"});
		    	$("#cartCount").html(" ( " + inCart.length + " )");
		    	$("#cart").addClass("notify");
		    };
	    } else if (activeChannel == 2) {
	    	if (player.getCurrentTime() > 133 && player.getCurrentTime() < 134) {
		    	$("#forsale").html("<div id='added'>"+ videoIdArray[index].ytname +" recommend this.</button><img src='img/"+ activeChannel +".jpg'></img>");
		    	$("#forsale").slideDown(1000, "linear");
		    	setTimeout(function(){$("#forsale").slideUp(1000, "linear");}, 8000);
		    	inCart.push({price: 20, img: "<img src='img/"+ activeChannel +".jpg'>"});
		    	$("#cartCount").html(" ( " + inCart.length + " )");
		    	$("#cart").addClass("notify");
		    };
	    	if (player.getCurrentTime() > 160 && player.getCurrentTime() < 161) {
		    	$("#forsale").html("<div id='added'>"+ videoIdArray[index].ytname +" recommend this.</button><img src='img/"+ activeChannel +"2.jpg'></img>");
		    	$("#forsale").slideDown(1000, "linear");
		    	setTimeout(function(){$("#forsale").slideUp(1000, "linear");}, 8000);
		    	inCart.push({price: 20, img: "<img src='img/"+ activeChannel +"2.jpg'>"});
		    	$("#cartCount").html(" ( " + inCart.length + " )");
		    	$("#cart").addClass("notify");
		    };
	    } else if (activeChannel == 3) {
		    if (player.getCurrentTime() > 55 && player.getCurrentTime() < 56) {
		    	$("#forsale").html("<div id='added'>"+ videoIdArray[index].ytname +" recommends this.</button><img src='img/"+ activeChannel +".jpg'></img>");
		    	$("#forsale").slideDown(1000, "linear");
		    	setTimeout(function(){$("#forsale").slideUp(1000, "linear");}, 8000);
		    	inCart.push({price: 424, img: "<img src='img/"+ activeChannel +".jpg'>"});
		    	$("#cartCount").html(" ( " + inCart.length + " )");
		    	$("#cart").addClass("notify");
		    };
		    if (player.getCurrentTime() > 160 && player.getCurrentTime() < 161) {
		    	$("#forsale").html("<div id='added'>"+ videoIdArray[index].ytname +" recommends this.</button><img src='img/"+ activeChannel +"2.jpg'></img>");
		    	$("#forsale").slideDown(1000, "linear");
		    	setTimeout(function(){$("#forsale").slideUp(1000, "linear");}, 8000);
		    	inCart.push({price: 237, img: "<img src='img/"+ activeChannel +"2.jpg'>"});
		    	$("#cartCount").html(" ( " + inCart.length + " )");
		    	$("#cart").addClass("notify");
		    };
	    } else if (activeChannel == 4) {
		    if (player.getCurrentTime() > 10 && player.getCurrentTime() < 11) {
		    	$("#forsale").html("<div id='added'>"+ videoIdArray[index].ytname +" recommends this.</button><img src='img/"+ activeChannel +".jpg'></img>");
		    	$("#forsale").slideDown(1000, "linear");
		    	setTimeout(function(){$("#forsale").slideUp(1000, "linear");}, 8000);
		    	inCart.push({price: 16, img: "<img src='img/"+ activeChannel +".jpg'>"});
		    	$("#cartCount").html(" ( " + inCart.length + " )");
		    	$("#cart").addClass("notify");
		    };
		    if (player.getCurrentTime() > 100 && player.getCurrentTime() < 101) {
		    	$("#forsale").html("<div id='added'>"+ videoIdArray[index].ytname +" recommends this.</button><img src='img/"+ activeChannel +"2.jpg'></img>");
		    	$("#forsale").slideDown(1000, "linear");
		    	setTimeout(function(){$("#forsale").slideUp(1000, "linear");}, 8000);
		    	inCart.push({price: 38, img: "<img src='img/"+ activeChannel +"2.jpg'>"});
		    	$("#cartCount").html(" ( " + inCart.length + " )");
		    	$("#cart").addClass("notify");
		    };
	    } else if (activeChannel == 5) {
		    if (player.getCurrentTime() > 30 && player.getCurrentTime() < 31) {
		    	$("#forsale").html("<div id='added'>"+ videoIdArray[index].ytname +" recommends this.</button><img src='img/"+ activeChannel +".jpg'></img>");
		    	$("#forsale").slideDown(1000, "linear");
		    	setTimeout(function(){$("#forsale").slideUp(1000, "linear");}, 8000);
		    	inCart.push({price: 10, img: "<img src='img/"+ activeChannel +".jpg'>"});
		    	$("#cartCount").html(" ( " + inCart.length + " )");
		    	$("#cart").addClass("notify");
		    };

	    } else {
		    if (player.getCurrentTime() > 260 && player.getCurrentTime() < 261) {
		    	$("#forsale").html("<div id='added'>"+ videoIdArray[index].ytname +" recommends this.</button><img src='img/"+ activeChannel +".jpg'></img>");
		    	$("#forsale").slideDown(1000, "linear");
		    	setTimeout(function(){$("#forsale").slideUp(1000, "linear");}, 8000);
		    	inCart.push({price: 45, img: "<img src='img/"+ activeChannel +".jpg'>"});
		    	$("#cartCount").html(" ( " + inCart.length + " )");
		    	$("#cart").addClass("notify");
		    };
		    if (player.getCurrentTime() > 380 && player.getCurrentTime() < 381) {
		    	$("#forsale").html("<div id='added'>"+ videoIdArray[index].ytname +" recommends this.</button><img src='img/"+ activeChannel +"2.jpg'></img>");
		    	$("#forsale").slideDown(1000, "linear");
		    	setTimeout(function(){$("#forsale").slideUp(1000, "linear");}, 8000);
		    	inCart.push({price: 49, img: "<img src='img/"+ activeChannel +"2.jpg'>"});
		    	$("#cartCount").html(" ( " + inCart.length + " )");
		    	$("#cart").addClass("notify");
		    };
	    };

}

$(document).ready(function(){
	setInterval(function () { 
		// timer++;
		advertising();
		// console.log("time: " + timer);
	}, 1000);

	controls();
	getDataFromYT();
});


//http://stackoverflow.com/questions/57555/detecting-idle-time-in-javascript-elegant5y