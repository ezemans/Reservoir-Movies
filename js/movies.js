$(document).ready(function () {

    if (!localStorage.movies) {
        $.ajax('http://api.tvmaze.com/shows')
            .then(function (movies) {
                $(".spinner").remove();
                localStorage.movies = JSON.stringify(movies);
                displayMovies(movies);
            })
    } else {
        displayMovies(JSON.parse(localStorage.movies));
    }

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

    function nullImage(image) {
        var imagen = image;
        if (imagen != null) {
            return imagen
        } else {
            return "No Image"
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
                .replace(":image:", movie.image ? movie.image.medium : '')
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

    $("#searchTemplate").submit(function (e) {
        e.preventDefault();
        var searchWord = $(this).find("#searchContent").val();
        searchMovie(searchWord);
    })
    function searchMovie(searchWord) {
        $.ajax({
            url: "http://api.tvmaze.com/search/shows",
            method: "GET",
            data: { q: searchWord },
        })
            .done(function (res, textStatus, xhr) {
                $("#content").html("");
                var movies = res.map(function (el) {
                    return el.show;
                })
                displayMovies(movies);
            })
    }
})



