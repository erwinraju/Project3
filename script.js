jQuery(document).ready(function () { });

function createBookListTitle(book) {
    var $li = $('<li>');
    $li.addClass('list-group-item hover-invert');
    $li.html(book.title);
    $li.data('bookId', book.id);
    return $li;
}

var request = axios.get('https://csc225.mockable.io/books');
request.then(function (response) {
    $('#pagestitle').text('Information on Good Books');
    response.data.forEach(function (book) {
        $('#bookslist').append(createBookListTitle(book));
    });

    $('.list-group-item').click(function () {
        $('.list-group-item').removeClass('active');

        var bookId = $(this).data('bookId');
        $(this).addClass('active');
        $('#pagestitle').text('Loading The Book Information');

        axios.get('https://csc225.mockable.io/books/' + bookId).then(function (response) {
            $('#pagestitle').text(response.data.title);
            $('#click-title').remove();
            $('img').attr('src', response.data.cover).attr('alt', response.data.title);
            $('#bookstitle').text('Title: ' + response.data.title);
            $('#booksauthor').text('Author: ' + response.data.author);
            $('#bookscountry').text('Country: ' + response.data.country);
            $('#bookslanguage').text('Language: ' + response.data.language);
            $('#booksyear').text('Year: ' + response.data.year);
            $('#bookspages').text('Pages: ' + response.data.pages);
            $('#link').attr('href', response.data.link);
        });
    });
});
