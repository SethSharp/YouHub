import $ from "jquery";

export function initSDK(cb) {
    $.getScript('https://connect.facebook.net/en_US/sdk.js', function(){
        FB.init({
            appId: '527134588895337',
            version: 'v13.0'
        });
        cb();
    });
}
export function login(badLogin_cb, login_cb, startSpin_cb, stopSpin_cb) {
    startSpin_cb();
    FB.login(function(response) {
        
        if (response.authResponse) {
            FB.api('/me?fields=name,likes{name,category}', function(response) {
                console.log(response);
                stopSpin_cb();
                login_cb();
            });
        } else {
            badLogin_cb();
        }
    });
}

export function logout(cb) {
    FB.logout(function(response) {
        cb();
    })
}