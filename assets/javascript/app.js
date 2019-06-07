
var buttons = ["Anime", "Rainbow Six Siege", "Iron Man", "Pizza"];

function renderButtons() {
    $("#buttons-view").empty();
    for (var i = 0; i < buttons.length; i++) {

        var newButton = $("<button>");
        newButton.addClass("button btn btn-primary");
        newButton.attr("data-name", buttons[i]);
        newButton.text(buttons[i]);
        $("#buttons-view").append(newButton);
    }
}

$("#submit").on("click", function (event) {
    event.preventDefault();

    var button = $("#search").val().trim();
    buttons.push(button);

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

            var gifImage = $("<img>");
            gifImage.attr("src", results[i].images.fixed_height_still.url);
            gifImage.attr('data-still', results[i].images.fixed_height_still.url);
            gifImage.attr('data-animate', results[i].images.fixed_height.url);
            gifImage.attr('data-state', "still");
            gifImage.addClass("gif");

            newGif.append(p);
            newGif.append(gifImage);

            $("#gifs").prepend(newGif);
        }
    });
});

renderButtons();