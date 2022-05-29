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
    
    console.log("ASS")
    $("#login-page").css({
        "animation" : "moveit 1.5s linear forwards",
        // "animation-iteration-count":"1"
    });
    // setTimeout({
    //     $("#login-page").css({"display":"none"});
    //     $("#main-content").css({"display":"block"});
    // }, 2100);
    // set time out for 2s, then remove
}

export function addCard(data, i) {
    let cardData = {
        src: data.cover.source,
        title: data.name,
    };
    let newCard = card(cardData);
    $("#cards").append(newCard);
    $(".card").eq(i).on("click", () => {
        handleCardClick(data);
    });
}

function handleCardClick(data) {
    $("#cards").css({"display":"none"});
    $("#youtube-content").css({"display":"block"});
    let pointer = data.mostRecent;
    for (var i = 0; i < pointer.length; i++) {
        let ID = pointer[i].id;
        let videoData = {
            title: pointer[i].title,
            url: pointer[i].src,
            // link: `www.youtube.com/watch?v=${ID}`
        };
        $("#latest-videos").append(ytCard(videoData));
        $(".yt-card").eq(i).on("click", () => {
            window.location.replace(`https://www.youtube.com/watch?v=${ID}`);
        });
        
    }
    $(".yt-card").hover(function() {
        $(".yt-card").addClass(".hover").fadeIn(1000);
    }, function() {
        $(".yt-card").removeClass(".hover").fadeIn(1000);
    });
}

function hover(i) {

}