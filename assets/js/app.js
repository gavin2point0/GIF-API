var topics = ['back to the future', 'breakfast club', 'ferris buellers day off', 'ghostbusters', 'raiders of the lost ark', 'empire strikes back'];
function createButtons() {
    $('#button-row').text('');
    for (var i = 0; i < topics.length; i++) {
        var newButton = $('<button type="button" class="btn btn-primary">');
        newButton.text(topics[i]);
        $('#button-row').append(newButton);
    }
}
$(".btn-secondary").on('click', function () {
    topics.push($('#input-box').val());
    $('#input-box').val('');
    createButtons();
})

$("#button-row").on('click', '.btn-primary', function () {
    var movie = $(this).text().replace(/ /g, "+")
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        movie + "&api_key=XsZ4z7hLYXZsi9ILEGTO5EIoJBl5douw&limit=8";

    $('#gifs').text('');

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        for (var j = 0; j < response.data.length; j++) {

            var still = JSON.stringify(response.data[j].images.original_still.url).replace(/"/g, '');
            var animated = JSON.stringify(response.data[j].images.original.url).replace(/"/g, '');

            var rating = JSON.stringify(response.data[j].rating);

            var gifDiv = $('<div class="gif-element">')
            var newGif = $('<img width="200px" height="200px" data-state="still">');
            newGif.attr('src', still).attr('data-still', still).attr('data-animate', animated).attr('id', 'gif');


            $(gifDiv).append(newGif).append('<p class="rating"> Rating: ' + rating + '</p>');
            $('#gifs').append(gifDiv);




        }
    })
});
$("#gifs").on('click', '#gif', function () {
    var dataState = $(this).attr('data-state');
    var dataStill = $(this).data('still');
    var dataAnimated = $(this).data('animate');
    console.log(dataState)

    if (dataState === 'still') {
        $(this).attr('src', dataAnimated);
        $(this).attr('data-state', 'animated');
    }
    if (dataState === 'animated') {
        $(this).attr('src', dataStill);
        $(this).attr('data-state', 'still');

    }

})
createButtons();