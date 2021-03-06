var express = require('express');
var router = express.Router();

var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var sqlite3 = require('sqlite3'); //.verbose();

/* GET users listing. */
router.post('/', function(req, res, next) {
    var result;
    url = req.body.parseUrl;

    request(url, function(error, response, html){
        if(!error){
            var $ = cheerio.load(html);

            var href, release, rating;
            var json = [];

            $('td').each(function(idx, el){
                debugger;
                var a = $(this).children('a').length ? $(this).children('a').has('img') : $(this).children('div').find('a').has('img'),
                    href = a.attr('href'),
                    imgSrc = a.find('img').attr('src'),
                    title = $(el).children('p').find('a').text(),
                    res = {
                        link: href,
                        image: imgSrc,
                        title: title
                    };

                if (!!$(el).has('a').length && !!href && $(el).children('p').find('a').attr('href') === href) {
                    json.push(res);
                }
            });

            result = json;
        } else {
            result = "Error while getting " + url;
        }

        var db = new sqlite3.Database('./db/db.sqlite3');
         
        db.serialize(function() {

          var stmt = db.prepare("INSERT INTO categories (name, icon) VALUES (?,?)");
          for (var i = 0; i < result.length; i++) {
              var category = result[i];
              stmt.run(category.title, category.image);
          }
          stmt.finalize();

          db.each("SELECT rowid AS id, name, description FROM categories", function(err, row) {
              console.log(row.id + ": " + row.name + ";     " + row.description);
          });

          res.send({ result: result });
        });
 
        db.close();

    });

    // To write to the system we will use the built in 'fs' library.
    // In this example we will pass 3 parameters to the writeFile function
    // Parameter 1 :  output.json - this is what the created filename will be called
    // Parameter 2 :  JSON.stringify(json, null, 4) - the data to write, here we do an extra step by calling JSON.stringify to make our JSON easier to read
    // Parameter 3 :  callback function - a callback function to let us know the status of our function

    /*
    fs.writeFile('output.json', JSON.stringify(json, null, 4), function(err){

        console.log('File successfully written! - Check your project directory for the output.json file');

    })
    */

    console.log('response send');
});

function downloadImage(baseUrl, imageUrl) {
    
}

module.exports = router;