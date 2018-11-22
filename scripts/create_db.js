var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('./db_new.sqlite3');
 
db.serialize(function() {
  db.run("CREATE TABLE categories (id INTEGER PRIMARY KEY, name VARCHAR(255), icon VARCHAR(255) description TEXT)");
  db.run("CREATE TABLE category_relations (id INTEGER PRIMARY KEY, categoryId INTEGER, parentId INTEGER)");

/*
  var stmt = db.prepare("INSERT INTO lorem VALUES (?)");
  for (var i = 0; i < 10; i++) {
      stmt.run("Ipsum " + i);
  }
  stmt.finalize();
 
  db.each("SELECT rowid AS id, info FROM lorem", function(err, row) {
      console.log(row.id + ": " + row.info);
  });
  */
});
 
db.close();