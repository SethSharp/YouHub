import $ from "jquery"
import styles from "./css/styles.css";
import * as view from "./view";
import * as fb from "./APIS/facebook";
import * as yt from "./APIS/youtube";

$(function() {
    let faceBookLikes = [];

    $.ajaxSetup({ cache: true });
    fb.initSDK(fbInit_cb);

    function fbInit_cb() {
        $(".fb-login").on("click", () => {
            view.startSpinner();
            fb.login(view.unsuccessfulLogin, view.successfulLogin,view.stopSpinner, fbLikes_cb);
        });
        $(".fb-logout").on("click", () => {
            fb.logout(view.logout);
        });
    }

    let categories = ["Public Figure", "Personal blog", "Sport & recreation", "Recreational & sport website", "Video creator", "Photography and videography"]
    function fbLikes_cb(data) {
        function isIn(cat) {
            for (var i = 0; i < categories.length; i++) {
                if (cat == categories[i]) return true;
            }
            return false;
        }
        let pointer = data.likes.data;
        for (var i = 0; i < pointer.length; i++) {
            if (isIn(pointer[i].category)) {
                faceBookLikes.push(pointer[i]);  
            }
        }
        addCards();
        yt.test();
    }
    function addCards() {
        for (var i = 0; i < faceBookLikes.length; i++) {
            view.addCard(faceBookLikes[i].cover.source, faceBookLikes[i].name);
        }
    }
});

