const notes = require("express").Router();
const fs = require("fs");

const { v4: uuidv4 } = require("uuid");
const { readFromFile, readAndAppend, writeToFile } = require("../db/fsUtil");

notes.get("/", (req, res) => {
  readFromFile("db/db.json").then((data) => {
    res.json(JSON.parse(data));
  });
});


notes.post("/", (req, res) => {
  console.log(req.body);
  const { title, text } = req.body;
  if (req.body) {
    const note = {
      title,
      text,
      id: uuidv4(),
    };

    readAndAppend(note, "db/db.json");
    res.json(`Your note has been added!`);
  } else {
    res.error("Sorry, we couldn't add your note.");
  }
});

notes.delete("/:id", (req, res) => {
  readFromFile("db/db.json").then((data) => {
    let parsedData = JSON.parse(data);
    let newData = parsedData.filter((note) => note.id != req.params.id);
    writeToFile("db/db.json", newData);
    res.json({});
  });
});

module.exports = notes;