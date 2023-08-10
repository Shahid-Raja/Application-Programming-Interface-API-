const express = require("express");
const path = require("path");
const { open } = require("sqlite");
const sqlite3 = require("sqlite3");
const app = express();
let db = null;
const dbPath = path.join(__dirname, "goodreads.db");

const initializeDBAndServer = async () => {
  try {
    db = await open({
      filename: dbPath,
      driver: sqlite3.Database,
    });

    app.listen(3000, () => {
      console.log("user running at this url");
    });
  } catch (e) {
    console.log(`DB Error: ${e.message}`);
    process.exit(1);
  }
};

initializeDBAndServer();

app.get("/books", async (request, response) => {
  const getBooksQuery = `
    SELECT *
    FROM book 
    ORDER BY book_id;`;

  const booksArray = await db.all(getBooksQuery);
  response.send(booksArray);
});
