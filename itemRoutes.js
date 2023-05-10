"use strict";
const express = require("express");
const { NotFoundError } = require("./expressError");

let { items } = require("./fakeDb");
const router = new express.Router();

/** GET /items: return list list of shopping items*/
router.get("/", function (req, res) {
  return res.json({ items });
});

/** POST /items: accept JSON body, add item, and return it */
router.post("/", function (req, res) {
  //TODO: validate request middleware?
  items.push(req.body);

  return res.json({ added: req.body });
});

/** GET /items/:name: return single item: */
router.get("/:name", function (req, res) {
  for (const item of items) {
    if (item.name === req.params.name) {
      return res.json(item);
    }
  }
});

/**PATCH /items/:name: accept JSON body, modify item, return it: */
router.patch("/:name", function (req, res) {
  const { name, price } = req.body;

  //TODO: do we need the or logic what exactly are
  for (const item of items) {
    if (item.name === req.params.name) {
      item.name = name;
      item.price = price;

      console.log(items);

      return res.json({ updated: item });
    }
  }

  throw new NotFoundError(`${req.params.name} does not exist`);
});

router.delete("/:name", function (req, res) {
  items = items.filter((item) => {
    item.name != req.params.name;
  });

  console.log(items);

  return res.json({ message: "deleted" });
});

module.exports = router;
