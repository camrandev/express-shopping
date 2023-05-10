"use strict";


const express = require("express");

const db = require("./fakeDb");
const router = new express.Router();


/** GET /items: return list list of shopping items*/
router.get("/", function (req, res) {
  return res.json({ items: db.items });
});


/** POST /items: accept JSON body, add item, and return it */
router.post("/", function (req, res) {
  const data = req.body;

  db.items.push(data);

  return res.json({ added: data });
});


module.exports = router;