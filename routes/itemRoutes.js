"use strict";
const express = require("express");
const { NotFoundError } = require("../expressError");

let { items } = require("../fakeDb");
const router = new express.Router();

/** GET /items: return list of shopping items */
router.get("/", function (req, res) {
  return res.json({ items });
});


/** POST /items: accept JSON body, add item, and return it */
router.post("/", function (req, res) {
  //TODO: validate request middleware?
  items.push(req.body);

  return res.status(201).json({ added: req.body });
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


/** DELETE /items/:name: delete item */
router.delete("/:name", function (req, res) {
  for (let i = 0; i < items.length; i++) {
    if (items[i].name === req.params.name) {
      items.splice(i, 1);
    }
    return res.json({ message: "deleted" });
  }

  throw new NotFoundError(`${req.params.name} does not exist`);
});


module.exports = router;
