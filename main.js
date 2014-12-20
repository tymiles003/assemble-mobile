/*
    ASSEMBLE Main Window Operator Module

    v0.0.2
    r.w. 2014

    Usage is subject to local regulations.

*/




// Do when the window has been successfully loaded
var pointer = {
    x: 0,
    y: 0
}

// Declare map object
var map;

$(window).on('load',function(){
    if ($("#loginWhich").hasClass("show")) {
        $("#loginWhich").removeClass("show");
    } else {
        $("#loginWhich").addClass("show");

    }

    // Process device status
    //document.addEventListener("deviceready", onDeviceReady(), false);

    // Add pointer locator
    document.addEventListener("mousemove", function(e){
        pointer.x = e.x;
        pointer.y = e.y;
    });

    // Initialise Google Maps object
    // var div = document.getElementById("worldMap");
    // map = plugin.google.maps.Map.getMap(div);


    // Set page heights
    





    toggleLoginUI()


});

// Process device status
function onDeviceReady(){
    //var deviceInfo = document.getElementById('deviceInfo');
    //deviceInfo.innerHTML = 'Device Model: '    + device.model    + '<br />' +
    //                'Device Cordova: '  + device.cordova  + '<br />' +
    //                'Device Platform: ' + device.platform + '<br />' +
    //               'Device UUID: '     + device.uuid     + '<br />' +
    //               'Device Version: '  + device.version  + '<br />';
    var deviceModel = device.model;
    var deviceOS = device.version;
    //alert("This is a " + deviceModel + ", running " + deviceOS);

    //socket.emit('debug','Hello from ' + deviceModel + ', Android v' + deviceOS);



}


// Back button override function
$(document).on('backbutton', function () {
    backHandler();
});

// Process back button behavior

function backHandler(){

}

// Process login UI
var toggledLogin = false;
function toggleLoginUI(){
    if (toggledLogin) {
        $("#loginLoading").removeClass("show");
        setTimeout(function(){
            $("#loginLoading").addClass("hideAll");
            $("#loginBtn").removeClass("hideAll");
            toggledLogin = false;
        }, 300);
        setTimeout(function(){
            //
            $("#loginLoading").addClass("hideAll");
            $("#loginBtn").addClass("show");
            toggledLogin = false;
        }, 605);
    } else {
        $("#loginBtn").removeClass("show");
        setTimeout(function(){
            $("#loginBtn").addClass("hideAll");
            $("#loginLoading").removeClass("hideAll");
            toggledLogin = true;
        }, 300);
        setTimeout(function(){
            $("#loginBtn").addClass("hideAll");
            $("#loginLoading").addClass("show");
            toggledLogin = true;
        }, 605);
    }
}



// Notification functions
var ongoingNotification = false;
var notificationTimeout;
function notify(type,msg){
    switch (type) {
        case 'e':    // Errors
            $("#notification").css("background","#911919");
            break;
        case 'w':    // Warnings
            $("#notification").css("background","#bd9600");
            break;
        case 'i':    // Information
            $("#notification").css("background","#558f55");
            break;
    }
    if (ongoingNotification) { // If notification is open
        clearTimeout(notificationTimeout);
        $("#notification").text(msg);
        notificationTimeout = setTimeout(function(){
            $("#notification").removeClass("show");
            ongoingNotification = false;
        }, 2500);
    } else {
        $("#notification").addClass("show");
        $("#notification").text(msg);
        ongoingNotification = true;
        notificationTimeout = setTimeout(function(){
            $("#notification").removeClass("show");
            ongoingNotification = false;
        }, 2500);

    }
}

// Login Animations
function showWorld(){
    $("#loginBg").css("opacity","0.0");
    setTimeout(function(){
        $("#loginBg").remove();
        $("#worldWindow").removeClass("hideAll");
    }, 350);


    /*
    map.setOptions({'backgroundColor': '#3d4647','controls': {
        'compass': true,
        'myLocationButton': true,
        'indoorPicker': false,
        'zoom': true // Only for Android
    },
    'gestures': {
        'scroll': true,
        'tilt': true,
        'rotate': true,
        'zoom': true
    }});
    var lel = new plugin.google.maps.LatLng(25.043916, 121.519544);
    map.moveCamera({
        'target': lel,
        'zoom' : 17
    });

    */



}

// Process pages

function pageToggle(arg){
    // Move the highlighter
    var i = (window.innerWidth / 5);
    $("#worldFooterSelection").css("-webkit-transform", "translate3d(" + (arg * i) + "px, 0,0)");
    $("#worldPages").css("-webkit-transform", "translate3d(-" + (arg * window.innerWidth) + "px, 0,0)");
    // Move the page
}



// Process menu
var menuToggled = false;
function menuToggle(){
    if (menuToggled){
        $("#worldMenu").css("-webkit-transform", "translate3d(0px, 0,0)");
        menuToggled = false;
    } else {
        $("#worldMenu").css("-webkit-transform", "translate3d(104%, 0,0)");
        menuToggled = true;
    }
}

// Process DOM nodes

function newMenuElement(){
    // Fetch the parent element first
    var q = document.getElementById("worldMenu");
    // and then create an empty element for operation
    var i = document.createElement("div");
    // now, append the necessary stuff into the new, empty element
    i.id = "iii";
    q.appendChild(i);

}
