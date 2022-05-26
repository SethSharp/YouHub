import $ from "jquery"
import styles from "./css/styles.css";
import * as view from "./view";
import * as fb from "./APIS/facebook";


$(function() {
    $.ajaxSetup({ cache: true });
    fb.initSDK(fbInit_cb);

    function fbInit_cb() {
        $(".fb-login").on("click", () => {
            fb.login(view.unsuccessfulLogin, view.successfulLogin,view.startSpinner,view.stopSpinner);
        });
        $(".fb-logout").on("click", () => {
            fb.logout(view.logout);
        });
    }
});

