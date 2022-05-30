import $ from "jquery"
import styles from "./css/styles.css";
import * as view from "./view";
import * as fb from "./APIS/facebook";
import * as yt from "./APIS/youtube";

$(function() {

    let creatorData = [];

    $.ajaxSetup({ cache: true });
    fb.initSDK(fbInit_cb, view.successfulLogin, view.stopSpinner, view.startSpinner, fbLikes_cb);

    function fbInit_cb() {
        $(".fb-login").on("click", () => {
            view.startSpinner();
            fb.login(view.unsuccessfulLogin, view.successfulLogin,view.stopSpinner, fbLikes_cb);
        });
        $(".fb-logout").on("click", () => {
            fb.logout(view.logout);
        });
    }

    let categories = ["Public figure", "Personal blog", "Sport & recreation", "Recreation & sport website", "Video creator", "Photography and videography"]
    function fbLikes_cb(data) {
        function isIn(cat) {
            for (var i = 0; i < categories.length; i++) {
                if (cat == categories[i]) return true;
            }
            return false;
        }
        let pointer = data.likes.data;
        let searchQs = [];
        for (var i = 0; i < pointer.length; i++) {
            if (isIn(pointer[i].category)) {
                creatorData.push(pointer[i]);
                searchQs.push(pointer[i].name);
            }
        }
        yt.getChannelIDs(searchQs, addYTData);
    }
    function addYTData(data, channelIDs) {
        // Index 1 is the home page of yt site (Use in some way)
        for (var i = 0; i < data.length; i++) {
            // each iteration take the video id, snippet content {thumbnails, title}
            creatorData[i].channelID = channelIDs[i];
            // maybe use profile photo(From YT), in the main card, when click will
            // take to yt content...
            creatorData[i].mostRecent = [];
            for (var j = 0; j < data[i].items.length; j++) {
                let videoObj = {
                    id: data[i].items[j].id.videoId,
                    title: data[i].items[j].snippet.title,
                    src: data[i].items[j].snippet.thumbnails.high.url
                }
                creatorData[i].mostRecent.push(videoObj);
            }
        }
        yt.getMostPopular(creatorData, addMostPop);
    }

    function addMostPop(data) {
        for (var i = 0; i < data.length; i++) {
            creatorData[i].mostPopular = [];
            for (var j = 0; j < data[i].items.length; j++) {
                let videoObj = {
                    id: data[i].items[j].id.videoId,
                    title: data[i].items[j].snippet.title,
                    src: data[i].items[j].snippet.thumbnails.medium.url
                }
                creatorData[i].mostPopular.push(videoObj);
            }
        }
        addCards();
    }

    function addCards() {
        for (var i = 0; i < creatorData.length; i++) {
            view.addCard(creatorData[i], i);
        }
        view.stopSpinner();
        view.successfulLogin();
    }
});

