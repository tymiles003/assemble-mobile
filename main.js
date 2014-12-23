/*
    ASSEMBLE Main Window Operator Module

    v0.2.1
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

// Added over 0.2
var alertToggled = false;


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



/*  API start  */


/*  API end   */

// Cell operations
function newCell(){
    // check available slot, request
    alertToggled = true;
    swal({
        title: "建立小隊代號",
        text: "選一個大寫英文字母，然後加上兩位數字作為代號\ne.g. B13",
        type: "info",
        showCancelButton: true,
        confirmButtonColor: "#DD6B55",
        confirmButtonText: "輸入代號",
        cancelButtonText: "取消",
        closeOnConfirm: false,
        closeOnCancel: true
    },
    function(isConfirm){
        if (isConfirm) {
            //swal("Deleted!", "Your imaginary file has been deleted.", "success");
            var desiredCellId = prompt('請輸入英文以及數字代號');
            if (desiredCellId) {
                notify("i","小隊" + desiredCellId + "建立成功");
                swal("建立成功", "小隊" + desiredCellId, "success");
                alertToggled = false;

            } else {

            }

        } else {
            //swal("Cancelled", "Your imaginary file is safe :)", "info");
            alertToggled = false;
        }
    });
    // pick a slot, emit and callback
}
function addUser(){
    // bounce the request to the target userId
    var q = prompt("請輸入對方使用者編號(ID)");
    // use callback to determine response

}








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

    // Handling UI long press
    var pressTimer;

    $("#worldFooterMap").mouseup(function(){
        clearTimeout(pressTimer);
        // Clear timeout
        return false;
    }).mousedown(function(){
        // Set timeout
        pressTimer = window.setTimeout(function() {
            notify("i", "Long press detected.");
        },1000)
        return false;
    });



    toggleLoginUI()


});

// Process device status
function onDeviceReady(){
    deviceModel = device.model;
    deviceOS = device.version;
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
    // see if alert is open or not
    if (alertToggled) {
        closeswal();
        alertToggled = false;
        return false;
    }
    // determine if it's at level 0
    if (toggledPage == 0 && (menuToggled == false)) {
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
            $("#loginCircle").css("opacity", "1.0");
            $("#loginCircle").addClass("showPopOut");
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

// Pseudo window input function
var popupToggled = false;
function popupInput(arg){
    if (popupToggled) {
        $("#popupInput").css("-webkit-transform","translate3d(0,0,0)")
        $("#worldInput").css("pointer-events", "none");
        $("#worldMenuDimmer").css("background", "rgba(0,0,0,0)");
        $("#worldMenuDimmer").css("pointer-events", "none");
        popupToggled = false;
    } else {
        $("#popupInput").css("-webkit-transform","translate3d(0,-100%,0)")
        $("#worldInput").css("pointer-events", "auto");
        $("#worldMenuDimmer").css("background", "rgba(22,22,22,0.73)");
        $("#worldMenuDimmer").css("pointer-events", "auto");
        popupToggled = true;
    }

}


// Login Animations
function showWorld(){
    $("#loginBg").css("opacity","0.0");
    setTimeout(function(){
        $("#loginBg").remove();
        swal("Welcome", "Login success", "success");
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
