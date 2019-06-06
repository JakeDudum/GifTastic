
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

renderButtons();