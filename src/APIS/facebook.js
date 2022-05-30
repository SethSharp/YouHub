import $ from "jquery";

let proxyURL = 'https://s5220864.elf.ict.griffith.edu.au:3001/';

export function initSDK(cb, login_cb, stopSpin_cb, startSpin_cb, fbLikes_cb) {
    $.getScript('https://connect.facebook.net/en_US/sdk.js', function() {
        FB.init({
            appId: '527134588895337',
            version: 'v13.0'
        });
        FB.getLoginStatus(function(response) {
            if (response.status === "connected") {
                startSpin_cb();
                var accessToken = response.authResponse.accessToken;
                getFBLikes(login_cb, stopSpin_cb, fbLikes_cb, accessToken);
            }
        });
        cb();
    });
}

export function login(badLogin_cb, login_cb, stopSpin_cb, fbLikes_cb) {
    // fetch(proxyURL+"?api=2").then(res => res.json()).then(response => {
    //     // console.log(response.authResponse);
    //     if (response.authResponse) {
    //         getFBLikes(login_cb, stopSpin_cb, fbLikes_cb, response.authResponse.accessToken)
    //     } else {
    //         badLogin_cb();
    //     }
    // });
    // let login_FB = `https://www.facebook.com/v14.0/dialog/oauth?client_id=527134588895337&display=popup&redirect_uri=https://s5220864.elf.ict.griffith.edu.au/Assignment2/dist/&state=987654321`;
    // console.log(login_FB);
    // window.location.replace(login_FB);
    // console.log(window.location.href);

    FB.getLoginStatus(function(response) {
        if (response.status === "connected") {
            
            var accessToken = response.authResponse.accessToken;
            getFBLikes(login_cb, stopSpin_cb, fbLikes_cb, accessToken);
        } else {
            FB.login(function(response) {
                if (response.authResponse) {
                    getFBLikes(login_cb, stopSpin_cb, fbLikes_cb, response.authResponse.accessToken)
                } else {
                    badLogin_cb();
                }
            });
        }
    });
    
}

export function logout(cb) {
    FB.logout(function(response) {
        cb();
    })
}

function getFBLikes(login_cb, stopSpin_cb, fbLikes_cb, authToken) {
    fetch(proxyURL+"?api=1000&token="+authToken).then(res => res.json()).then(data => {
        
        fbLikes_cb(data);
    });
}
