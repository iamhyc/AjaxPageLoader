Ajax Page Loader

###Intro

	jQury/Zepto dependent cross-platform webApp Library

	This project is to provide js description of common APP interactions on Phone.
	KIDDING. Actually, it's used to provide general function for webApp via CORDOVA
	for cross-platform App.

	styleFunc.js: Main function set of this project.providing page-load, using sliding-effect of two pages(#body1 & # body2), using Ajax tech(ignoring xml) to do cross-origin file access(supported by Chrome&Safari).

	scrollEvent.js: A scroll container to subtitute the default scrolling.
		modified&corrected version from a wide-spread code on Internet.
 
	touchEvent.js: Try to collabrate all useful and common gesture respose on Phone.
		TODO

	imageView.js: A image view plugin, support double-click-magnify, drag, two-point-magnify.

###插件简介
	基于Jquery/Zepto库的跨平台webApp库，可用于Adobe Cordova（原phoneGap）搭建的应用。

	styleFunc.js:使用ajax提供页面切换功能，ajax访问本地文件以实现模块化；
	scrollEvent.js:一份在网上流传很广的滑动模拟模块，然而错误很多；我将它改成基于Jquery的模式之后做了修正；
	touchEvent.js：一个想要集成所有手机应用的交互功能的模块
		TODO
	imageView.js：图像预览模块，App.js上也有；这个模块提供了双击放大/还原，拖拽，两指缩放；


本项目来源于做一个webApp过程中，按照自己的逻辑创造的轮子，如需使用，请联系我附加comment/API doc， thx~
