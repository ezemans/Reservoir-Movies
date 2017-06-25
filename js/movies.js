$(document).ready(function () {

    $.ajax({
        url: "http://api.tvmaze.com/shows",
        method: "GET",
        dataType: "json"
    })
        .done(function (json) {
            var moviesObject = json;
            console.log(moviesObject);
            displayMovies(moviesObject);
        })
        .fail(function (xhr, status, errorTrown) {
            console.log("xhr: " + xhr);
            console.log("status: " + status);
            console.log("Error: " + errorTrown)
        })
        .always(function () {
            console.log("se ejecuto el ajax")
        });

    function returnArrayToString(genre) {
        var genero = genre;
        if (genero != undefined) {
            $.map(genero, function (el) {
                return el
            })
        } else {
            return "Sin descripcion"
        }
    }

    function displayMovies(moviesObject) {
        var template = '<div class="tile is-ancestor">' +
            '<div class="tile is-1 is-vertical is-parent">' +
            '<div class="tile is-child box">' +
            '<p class="title">:rating:</p>' +
            '</div>' +
            '</div>' +
            '<div class="tile is-horizontal is-parent">' +
            '<div class="tile is-3 is-child box">' +
            '<img src=":image:">' +
            '</div>' +
            '<div class="tile is-5 is-child box">' +
            '<p class="title">:name:</p>' +
            '<p>:summary:</p>' +
            '</div>' +
            '<div class="tile is-4 is-child box">' +
            '<ul><li>:genre:</li><li>:premiered:</li></li>:language:</li><li>:weight:</li><li><a href=":officialSite:">Sitio Oficial</a></li></ul>' +

            '</div>' +
            '</div>' +
            '</div>';

        var groupTemplate = "";

        $.each(moviesObject, function (index, movie) {
            groupTemplate += template.replace(":rating:", movie.rating.average)
                .replace(":image:", movie.image.medium)
                .replace(":name:", movie.name)
                .replace(":summary:", movie.summary)
                .replace(":genre:", returnArrayToString(movie.genre))
                .replace(":premiered:", movie.premiered)
                .replace(":language:", movie.language)
                .replace(":weight:", movie.weight)
                .replace(":officialSite:", movie.officialSite)
        })
        $(".spinner").remove();
        var groupToObject = $(groupTemplate);
        groupToObject.hide();
        $("#content").append(groupToObject.fadeIn(4000));
    }
})



