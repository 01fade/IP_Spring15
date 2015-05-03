#include "inputManager.h"



/*
<app>

	<!-- mode, input 0 = live, 1 = video -->
	<mode>1</mode>

	<!-- some per mode settings -->
	<videoFile>inputTestVideos/test1.mov</videoFile>
 
	<videoGrabber>
		<width>640</width>
		<height>480</height>
		
		<!-- this is optional -->
		<deviceId></deviceId>
	</videoGrabber>


</app>
*/

//--------------------------------------------------------------
void inputManager::setup(){
	
	ofxXmlSettings XML;
	XML.loadFile("settings/globalSettings.xml");
	mode = XML.getValue("app:input:mode", 0);
		
	if (mode == INPUT_VIDEO){
		//cout << "input manager: loading video file" << endl;
		string movieToLoad = XML.getValue("app:input:videoFile", "");
		vidPlayer.loadMovie(movieToLoad);
		vidPlayer.play();
		width	= vidPlayer.width;
		height	= vidPlayer.height;
	}
	
	if (mode == INPUT_LIVE_VIDEO){
		//cout << "input manager: grabbing video" << endl;
		width = XML.getValue("app:input:videoGrabber:width", 640);
		height = XML.getValue("app:input:videoGrabber:height", 480);
		int device = XML.getValue("app:input:videoGrabber:deviceId", 0);
		
		if (device != 0){
			vidGrabber.setDeviceID(device);
		}
        
        //ps eye vid grabber
//        vidGrabber.setGrabber(ofPtr<ofxPS3EyeGrabber>(new ofxPS3EyeGrabber()));
        
		vidGrabber.initGrabber(width, height);	// false = no texture. faster...

//		width = vidGrabber.getWidth();
//		height = vidGrabber.getHeight();		// in case we are different then what we request... ;)
	}
	
	if (width != 0 || height != 0){
        
        vidGrabber.setAutogain(false);
        vidGrabber.setAutoWhiteBalance(false);
        
        //allocate = save some space for the texture and pixels before adding sth
        videoTexture.allocate(width,height, GL_RGB);
        
		colorImg.setUseTexture(false);
		grayImage.setUseTexture(false);
		colorImg.allocate(width,height);
		grayImage.allocate(width,height);
	}

	bIsFrameNew = false;

}

//--------------------------------------------------------------
void inputManager::update(){
	
	
	
	if (mode == INPUT_LIVE_VIDEO){
		vidGrabber.update();
		bIsFrameNew = vidGrabber.isFrameNew();
	} else {
		vidPlayer.update();
		bIsFrameNew = vidPlayer.isFrameNew();
	}
	
	if (bIsFrameNew){

		if (mode == INPUT_LIVE_VIDEO){
            videoTexture.loadData(vidGrabber.getPixelsRef());
            ofPixels pix;
            //push the pixels from the texture to pix
            videoTexture.readToPixels(pix);
            //load the pix into colorImg
            colorImg.setFromPixels(pix);
            
		} else {
			colorImg.setFromPixels(vidPlayer.getPixels(), width,height);
		}
		
        grayImage = colorImg;		// TODO: this color to gray conversion is *slow*, since it's using the CV cvt color, we can make this faster !
				
	}	
}
