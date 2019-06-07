
var topics = ["anime", "rainbow six siege", "iron man", "pizza", "memes", "world of warcraft", "the simpsons", "video games", "pc master race", "pewdiepie",];

function renderButtons() {
    $("#buttons-view").empty();
    for (var i = 0; i < topics.length; i++) {

        var newButton = $("<button>");
        newButton.addClass("button btn btn-primary btn-lg");
        newButton.attr("data-name", topics[i]);
        newButton.text(topics[i]);
        $("#buttons-view").append(newButton);
    }
}

$("#submit").on("click", function (event) {
    event.preventDefault();

    var topic = $("#search").val().trim();
    topics.push(topic);

    renderButtons();

    $("#search").val("");
});

$(document).on("click", '.gif', function () {
    var state = $(this).attr("data-state");

    if (state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
    } else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
    }
});

$(document).on("click", '.button', function () {

    $("#gifs1").empty();
    $("#gifs2").empty();

    var searchTerm = $(this).attr("data-name");

    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        searchTerm + "&api_key=H4jeniUwGmYUKDr5HOc3imPyMjABQoWG&limit=10";

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        console.log(queryURL);

        console.log(response);

        var results = response.data;

        for (var i = 0; i < results.length; i++) {

            var newGif = $("<div>");

            var p = $("<p>").text("Rating: " + results[i].rating);
            p.addClass("rating");

            var gifImage = $("<img>");
            gifImage.attr("src", results[i].images.fixed_height_still.url);
            gifImage.attr('data-still', results[i].images.fixed_height_still.url);
            gifImage.attr('data-animate', results[i].images.fixed_height.url);
            gifImage.attr('data-state', "still");
            gifImage.addClass("gif");

            newGif.append(p);
            newGif.append(gifImage);

            if (i < 5) {
                $("#gifs1").prepend(newGif);
            } else {
                $("#gifs2").prepend(newGif);
            }
        }
    });
});

renderButtons();