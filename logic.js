$(document).ready(function() {

    var sciFis = [];

    

    $("#find-sciFi").on("click", function(event) {
        event.preventDefault();

        var sciFi = $("#sciFi-input").val().trim();
        $("#sciFi-input").val("");
        sciFis.push(sciFi);
        sciFiButton();

        
        var queryURL = "https://api.giphy.com/v1/gifs/search" + "?q="+ sciFi +"&api_key=TbCijZ0qbVBCiUNY5fSMjdDXdBJn1fMO" + "&limit=10"

        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(giphyGet)
        
       
    });

    function sciFiButton() {
        $("#button-area").empty();

        for (var i = 0; i < sciFis.length; i++) {
            var button = $("<button>");
                button.addClass("btn btn-sm btn-info mx-3 my-1 sciFi");
                button.data("sciFi", sciFis[i]);
                button.text(sciFis[i]);
                $("#button-area").append(button);       
        }
    }

    function giphyGet(data) {
        $("#giphy-view").empty();

        var results = data.data;
        console.log(results);
        for (var i = 0; i < results.length; i++) {

            $sciFiDiv = $("<div>");
            $sciFiDiv.addClass("d-inline-block mb-1 mt-2 mx-2");

            $sciFiP = $("<p>");
            $sciFiP.text("Rating: " + results[i].rating);
            $sciFiDiv.prepend($sciFiP);
            
            $sciFiImg = $("<img>");
            $sciFiImg.addClass("img-thumbnail");
            $sciFiImg.attr("data-state", "still");
            $sciFiImg.attr("src", results[i].images.fixed_height_still.url);
            $sciFiImg.attr("data-still", results[i].images.fixed_height_still.url);
            $sciFiImg.attr("data-animate", results[i].images.fixed_height.url);
            
            $sciFiDiv.append($sciFiImg);
            $("#giphy-view").append($sciFiDiv);

            $($sciFiImg).on("click", state);

        }
        
    }
    
    function state() {
        if ($(this).attr("data-state") === "still") {
            $(this).attr("src", $(this).attr("data-animate"));
            $(this).attr("data-state", "animate");
        } else {
            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-state", "still");
        }
    }

    $(document.body).on("click", ".sciFi", function() {
        var sciFiButton = $(this).data("sciFi");
        var queryURL = "https://api.giphy.com/v1/gifs/search" + "?q="+ sciFiButton +"&api_key=TbCijZ0qbVBCiUNY5fSMjdDXdBJn1fMO" + "&limit=10"

        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(giphyGet)
    });












});