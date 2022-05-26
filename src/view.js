import $ from "jquery";

export function stopSpinner() {
    $("#spinner").css({
        "animation": "none",
        "display": "none"
    });
}

export function startSpinner() {
    $("#spinner").css({
        "animation": "spinner 2.2s linear infinite",
        "display": "block"
    });
}

export function logout() {
    $("#login-page").css({"display":"block"});
    $("#main-content").css({"display":"none"});
}

export function unsuccessfulLogin() {
    $("#warning-msg").html("User cancelled login or did not fully authorize.");
}

export function successfulLogin() {
    $("#login-page").css({"display":"none"});
    $("#main-content").css({"display":"block"});
}