var vheight = window.innerHeight;
var vwidth = window.innerWidth;
var videoIdArray = [];
var adTime;
var d = new Date();
var timer = 0;
var inCart = [];

function getDataFromYT() {
	//http://stackoverflow.com/questions/29383394/i-want-the-total-amount-of-youtube-plays
	videoIdArray = [
	{videoId: "bsbTBgq5KDk", theme: "Miscellaneous Promotion" },
	{videoId: "zoA9WmJ-BTM", theme: "Look Our Merch" },
	{videoId: "ckiQV_0RXyU", theme: "Buy My Faves" },
	{videoId: "yur1OmPly3k", theme: "Beauty Products" },
	{videoId: "VoMqWgqIiCo", theme: "More Beauty Products" },
	{videoId: "X09MYZaizjk", theme: "Self Promotion" }
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
	    videoIdArray[i].rating = (parseFloat(data.entry.yt$rating.numLikes) / 
	    	(parseFloat(data.entry.yt$rating.numLikes) + 
	    	parseFloat(data.entry.yt$rating.numDislikes)) * 100).toFixed(2);
	});
}

function listenChannel (_activeChannel) {
	//show channel info and then fade out
	var index = _activeChannel - 1;
    $("#channel").html("CH0"+ _activeChannel + "&nbsp; &nbsp; \t <span id='theme'>" + videoIdArray[index].theme + "</span>");
    $("#channel").fadeIn();
    setTimeout(function(){$("#channel").fadeOut();}, 8000);
    // console.log("Active Channel: " + activeChannel);


	setTimeout(function(){
	    if (videoIdArray[index].count != undefined) {
	    	var str = numberWithCommas(videoIdArray[index].count);
	    	$("#viewcount").html("<b>" + str + "</b> teenagers watched");
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

		// var videoTime = player.getCurrentTime(); //when the video paused
		// videoIdArray[index].videoTime = videoTime;

		if (activeChannel == 6) {
			activeChannel = 6;
			listenChannel(activeChannel);
		} else{
			activeChannel ++;
			listenChannel(activeChannel);
			var index = activeChannel - 1;
			var placeholder = timer;
			if (timer > videoIdArray[index].duration) {
				placeholder = timer - parseFloat(videoIdArray[index].duration);
			};
			player.loadVideoById({'videoId': videoIdArray[index].videoId, 'startSeconds': placeholder});
			advertising();			
		};
		console.log(videoIdArray);
		$("#overlay").fadeOut();
	});
	$("#minus").on('click', function(){
		var index = activeChannel - 1;

		if (activeChannel == 1) {
			activeChannel = 1;
			listenChannel(activeChannel);
		} else{
			activeChannel --;
			listenChannel(activeChannel);
			var index = activeChannel - 1;
			var placeholder = timer;
			if (timer > videoIdArray[index].duration) {
				placeholder = timer - parseFloat(videoIdArray[index].duration);
			};
			player.loadVideoById({'videoId': videoIdArray[index].videoId, 'startSeconds': placeholder});
			advertising();			
		};
		console.log(videoIdArray);
		$("#overlay").fadeOut();
	});
	$("#cart").on('click', function(){
		$("#shoplist").html(" ");
		var total = 0;
		for (var i = inCart.length - 1; i >= 0; i--) {
			$("#shoplist").append("<li>" + inCart[i].img + "</li>").append("<p>- $" + inCart[i].price + " -</p><hr>");
			// if (inCart[i].price != '??'){
				total = total + inCart[i].price;
			// };
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

	$("#youtube").on('click', function(){ console.log("click");});

	// When the window is resized
	$(window).resize(function() {
		var newWidth = window.innerWidth;
		var newHeight = window.innerHeight;
		$('iframe').attr("width", newWidth).attr("height", newHeight);
	}).resize();
}

function advertising() {
	if (timer == 50){
	    if (activeChannel == 1) {
	    	$("#forsale").html("<div id='added'>This was added to your cart.</button><img src='img/"+ activeChannel +".jpg'></img><img src='img/"+ activeChannel +"2.jpg'></img>");
	    	$("#forsale").slideDown("slow", "linear");
	    	setTimeout(function(){$("#forsale").slideUp("slow", "linear");}, 5000);
	    	inCart.push({price: 25, img: "<img src='img/"+ activeChannel +".jpg'>"},{price: 15, img: "<img src='img/"+ activeChannel +"2.jpg'>"});
	    	$("#cartCount").html(" ( " + inCart.length + " )");
	    } else if (activeChannel == 2) {
	    	$("#forsale").html("<div id='added'>This was added to your cart.</button><img src='img/"+ activeChannel +".jpg'></img>");
	    	$("#forsale").slideDown("slow", "linear");
	    	setTimeout(function(){$("#forsale").slideUp("slow", "linear");}, 5000);
	    	inCart.push({price: 20, img: "<img src='img/"+ activeChannel +".jpg'>"});
	    	$("#cartCount").html(" ( " + inCart.length + " )");
	    } else if (activeChannel == 3) {
	    	$("#forsale").html("<div id='added'>This was added to your cart.</button><img src='img/"+ activeChannel +".jpg'></img>");
	    	$("#forsale").slideDown("slow", "linear");
	    	setTimeout(function(){$("#forsale").slideUp("slow", "linear");}, 5000);
	    	inCart.push({price: 237, img: "<img src='img/"+ activeChannel +".jpg'>"});
	    	$("#cartCount").html(" ( " + inCart.length + " )");
	    } else if (activeChannel == 4) {
	    	$("#forsale").html("<div id='added'>This was added to your cart.</button><img src='img/"+ activeChannel +".jpg'></img>");
	    	$("#forsale").slideDown("slow", "linear");
	    	setTimeout(function(){$("#forsale").slideUp("slow", "linear");}, 5000);
	    	inCart.push({price: 16, img: "<img src='img/"+ activeChannel +".jpg'>"});
	    	$("#cartCount").html(" ( " + inCart.length + " )");
	    } else if (activeChannel == 5) {
	    	$("#forsale").html("<div id='added'>This was added to your cart.</button><img src='img/"+ activeChannel +".jpg'></img>");
	    	$("#forsale").slideDown("slow", "linear");
	    	setTimeout(function(){$("#forsale").slideUp("slow", "linear");}, 5000);
	    	inCart.push({price: 48, img: "<img src='img/"+ activeChannel +".jpg'>"});
	    	$("#cartCount").html(" ( " + inCart.length + " )");
	    } else {
	    	$("#forsale").html("<div id='added'>This was added to your cart.</button><img src='img/"+ activeChannel +".jpg'></img>");
	    	$("#forsale").slideDown("slow", "linear");
	    	setTimeout(function(){$("#forsale").slideUp("slow", "linear");}, 5000);
	    	inCart.push({price: "??", img: "<img src='img/"+ activeChannel +".jpg'>"});
	    	$("#cartCount").html(" ( " + inCart.length + " )");
	    };
	console.log(inCart);
	};

	// if (timer == 20){
	//     if (activeChannel == 1) {

	//     } else if (activeChannel == 2) {

	//     } else if (activeChannel == 3) {

	//     } else if (activeChannel == 4) {

	//     } else if (activeChannel == 5) {

	//     } else {

	//     };
	// };



}

$(document).ready(function(){
	setInterval(function () { 
		timer++;
		advertising();
		// console.log("time: " + timer);
	}, 1000);

	controls();
	getDataFromYT();
	listenChannel(1);
});


//http://stackoverflow.com/questions/667555/detecting-idle-time-in-javascript-elegantly