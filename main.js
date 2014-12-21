/*
    ASSEMBLE Main Window Operator Module

    v0.0.2
    r.w. 2014

    Usage is subject to local regulations.

*/

// Declare operational variables
var toggledMenuName;
var toggleMenuLayer = 0;
var ifMenuToggled = 0;
var toggledFunctionMenu;
var loginEnabled = 1;
var chatUpdated = 0;
var fbLoginUrl;
var summaryToggled = 0;
var ifJoinedOp = 0;
var intelToggled = 0;
var newIntelToggled = 0;

var deviceModel, deviceOS;

var chatAllowed = 1;

var d = new Date;

var serverHostName = 'assemble.roger.rmstudio.tw';
var userName, userEmail, userPhotoUrl;
var motd;
//var currentUserObject = new UserObj('','','b01102019@ntu.edu.tw','','','');


// Do when the window has been successfully loaded
var pointer = {
    x: 0,
    y: 0
}

// Declare map object
var map;


// Socket.IO connection start


// INIT: Server connection
var socket = io.connect('https://' + serverHostName + ':6593/world');


// SOCKET.IO Processing

socket.on('connect', function() {


    // check if no session
    if (localStorage.token) {
        socket.emit('continue', localStorage.token, function(ret){
            if (ret) {
                switch (ret) {
                    case 0:
                        World_show();
                        break;
                    case 1:
                        alert('與伺服器失去連線，請重新登入！')
                        break;
                    default:
                        alert('未知錯誤，請重新登入！');
                        break;
                    }
                    // kick the motherfucker out
                    navigator.app.exitApp();
            }

        });
    }




        socket.on('disconnect', function(){



        });
});


// Socket.IO connection end







$(window).on('load',function(){
    if ($("#loginWhich").hasClass("show")) {
        $("#loginWhich").removeClass("show");
    } else {
        $("#loginWhich").addClass("show");

    }

    // Process device status
    document.addEventListener("deviceready", onDeviceReady, false);

    // Add pointer locator
    document.addEventListener("mousemove", function(e){
        pointer.x = e.x;
        pointer.y = e.y;
    });


    var i = window.innerHeight - 96;
    var j = window.innerWidth;
    $("#worldMap").css("height", i+"px");
    $("#worldMap").css("width", j+"px");


    // OSM
    map = L.map('worldMap').setView([25.044045,121.519902], 17);
    L.tileLayer('http://{s}.tiles.wmflabs.org/bw-mapnik/{z}/{x}/{y}.png', {
        attribution: 'with &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
        maxZoom: 18
    }).addTo(map);





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
    deviceModel = device.model;
    deviceOS = device.version;
    alert("device ready.");




    //alert("This is a " + deviceModel + ", running " + deviceOS);

    //socket.emit('debug','Hello from ' + deviceModel + ', Android v' + deviceOS);



}


// Back button override function
$(document).on('backbutton', function () {
    backHandler();
});

// Process exit decision
function tryQuit(){
    if (confirm("你確定要結束程式嗎？")){
        navigator.app.exitApp();
    }
}

// Process back button behavior

function backHandler(){
    // determine if it's at level 0
    if (toggledPage == 0) {
        tryQuit();
        return false;
    }

    // close menu first
    if (menuToggled){
        $("#worldMenu").css("-webkit-transform", "translate3d(0px, 0,0)");
        $("#worldMenuDimmer").css("background", "rgba(0,0,0,0)");
        $("#worldMenuDimmer").css("pointer-events", "none");
        menuToggled = false;
    } else {
        // switch to map page
        pageToggle(0);


    }


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

        // INIT: Bind map object to GMaps
        /*
        map = new GMaps({
            div: "#worldMap",
            lat: 25.044045,
            lng: 121.519902,
            zoom: 17,
            zoomControl: true,

            zoomControlOptions: {
                style: google.maps.ZoomControlStyle.SMALL
            },
            disableDoubleClickZoom: true,
            mapTypeControl: false,
            scaleControl: true,
            scrollwheel: true,
            panControl: false,
            streetViewControl: false,
            draggable : true,
            overviewMapControl: false,
            overviewMapControlOptions: {
                opened: false,
            },
            mapTypeId: google.maps.MapTypeId.ROADMAP
        });
        // INIT: Map styling
        map.addStyle({
            styledMapName:"Ground Zeroes",
            styles: mapOptions,
            mapTypeId: "map_gz"  });

            map.setStyle("map_gz");
            alert("map loaded"); */


    }, 350);

}

// Process pages
var toggledPage = 0;
function pageToggle(arg){
    // defocus
    document.getElementById('worldChatInput').blur();
    // Move the highlighter
    var i = (window.innerWidth / 5);
    $("#worldFooterSelection").css("-webkit-transform", "translate3d(" + (arg * i) + "px, 0,0)");
    // Move the page
    $("#worldPages").css("-webkit-transform", "translate3d(-" + (arg * window.innerWidth) + "px, 0,0)");
    // Change the title
    switch (arg) {
        case 0:
            $("#worldBannerTitle").text("地圖總覽");
            toggledPage = 0;
            break;
        case 1:
            $("#worldBannerTitle").text("作戰行動");
            toggledPage = 1;
            break;
        case 2:
            $("#worldBannerTitle").text("我的小隊");
            toggledPage = 2;
            break;
        case 3:
            $("#worldBannerTitle").text("情報");
            toggledPage = 3;
            break;
        case 4:
            $("#worldBannerTitle").text("即時通訊");
            toggledPage = 4;
            break;
    }
}



// Process menu
var menuToggled = false;
function menuToggle(){
    if (menuToggled){
        $("#worldMenu").css("-webkit-transform", "translate3d(0px, 0,0)");
        $("#worldMenuDimmer").css("background", "rgba(0,0,0,0)");
        $("#worldMenuDimmer").css("pointer-events", "none");
        menuToggled = false;
    } else {
        $("#worldMenu").css("-webkit-transform", "translate3d(104%, 0,0)");
        $("#worldMenuDimmer").css("background", "rgba(22,22,22,0.73)");
        $("#worldMenuDimmer").css("pointer-events", "auto");
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
