"use strict";

const request = require("supertest");

const app = require("../app");
let db = require("../fakeDb");

let candy = { name: "candy", price: 0.69 };

beforeEach(function() {
  db.items.push(candy);
});

afterEach(function() {
  db.items = [];
});


/** GET /items - returns `{items: [{name, price}, ...]}` */
describe("GET /items", function() {
  it("Gets a list of items", async function() {
    const resp = await request(app).get(`/items`);

    expect(resp.body).toEqual({ items: [candy] });
  });
});

/** POST /items - create item from data; return `{added: {item}}` */
describe("POST /items", function() {
  it("Creates a new item", async function() {
    const resp = await request(app)
      .post(`/items`)
      .send({
        name: "popsicle",
        price: 4.20
      });
    expect(resp.statusCode).toEqual(201);
    expect(resp.body).toEqual({
      added: { name: "popsicle", price: 4.20 }
    });
  });
});


/** GET /items/:name - returns `{items: [{name, price}, ...]}` */
describe("GET /items/:name", function() {
  it("Gets a single item", async function() {
    const resp = await request(app).get(`/items/candy`);
    console.log(resp.body);
    expect(resp.body).toEqual(candy);
  });
});
