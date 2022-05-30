import $, { data } from "jquery";
import card from "./templates/card.handlebars";
import ytCard from "./templates/video.handlebars";

export function stopSpinner() {
    $("#spinner").css({
        "animation": "none",
        "display": "none"
    });
}

export function startSpinner() {
    $("#login").css({"display":"none"});
    $("#spinner").css({
        "animation": "spinner 1.2s linear infinite",
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
    $("#login-page").css({
        "animation" : "moveit 1s linear forwards",
    });
}

export function addCard(data, i) {
    let cardData = {
        src: data.cover.source,
        title: data.name,
    };
    let newCard = card(cardData);
    $("#cards").append(newCard);
    $(".card").eq(i).on("click", () => {
        handleCardClick(data.mostRecent, "#latest-videos");
        handleCardClick(data.mostPopular, "#popular-videos")
    });
}

function handleCardClick(pointer, divID) {
    $("#cards").css({"display":"none"});
    $("#youtube-content").css({"display":"block"});
    for (var i = 0; i < pointer.length; i++) {
        let ID = pointer[i].id;
        let videoData = {
            title: pointer[i].title,
            url: pointer[i].src,
            // link: `www.youtube.com/watch?v=${ID}`
        };
        $(divID).append(ytCard(videoData));
        $(divID+">.yt-card").eq(i).on("click", () => {
            window.location.replace(`https://www.youtube.com/watch?v=${ID}`);
        });
        // $(".yt-card > .hover").eq(i).on("hover",
        //     function() {
        //         $(this).fadeIn(1000).css({"display":"block"});
        //     }, function() {
        //         $(this).fadeOut(1000);
        //     }
        // );
    }
}
