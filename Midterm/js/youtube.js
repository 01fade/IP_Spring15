// create youtube player
var player;
var activeChannel;

function onYouTubeIframeAPIReady() {
    activeChannel = Math.floor(Math.random()*6);
    var index = activeChannel - 1;
    player = new YT.Player('youtube', {
      height: vheight,
      width: vwidth,
      videoId: videoIdArray[index].videoId,
      playerVars: {
      	controls: 0,
        cc_load_policy: 0,
      	iv_load_policy: 3, // remove annotations
      	modestbranding: 1,
      	autohide: 1,
      	loop: 1,
      	showinfo: 0
      },
      events: {
        'onReady': onPlayerReady,
        'onStateChange': onPlayerStateChange
      }
    });
}

// autoplay video
function onPlayerReady(event) {
	event.target.playVideo();
  listenChannel(activeChannel);
}

// when video ends
function onPlayerStateChange(event) {
    //when video ended, play again    
    if(event.data === 0) {            
        player.playVideo();
    }
}

$(document).ready(function(){
	var tag = document.createElement('script');
	tag.src = "https://www.youtube.com/iframe_api";
	var firstScriptTag = document.getElementsByTagName('script')[0];
	firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
});