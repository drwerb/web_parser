function scrapPage() {
    console.log(document.getElementById('pageUrl').value);
    $.ajax({
        method: 'POST',
        url: '/parse',
        data: {
            parseUrl: document.getElementById('pageUrl').value
        }
    })
    .done(function(data) {
        $('#result').html(JSON.stringify(data.result, null, 4));
    })
}