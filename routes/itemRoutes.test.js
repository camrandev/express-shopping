"use strict";

const request = require("supertest");

const app = require("../app");
let db = require("../fakeDb");

let candy = { name: "candy", price: 0.69 };

beforeEach(function () {
  db.items.push(candy);
});

afterEach(function () {
  db.items.length = 0;
});

/** GET /items - returns `{items: [{name, price}, ...]}` */
describe("GET /items", function () {
  it("Gets a list of items", async function () {
    const resp = await request(app).get(`/items`);

    expect(resp.body).toEqual({ items: [candy] });
  });
});

/** POST /items - create item from data; return `{added: {item}}` */
describe("POST /items", function () {
  it("Creates a new item", async function () {
    const resp = await request(app).post(`/items`).send({
      name: "popsicle",
      price: 4.2,
    });
    expect(resp.statusCode).toEqual(201);
    expect(resp.body).toEqual({
      added: { name: "popsicle", price: 4.2 },
    });
  });
});

/** GET /items/:name - returns `{items: [{name, price}, ...]}` */
describe("GET /items/:name", function () {
  it("Gets a single item", async function () {
    const resp = await request(app).get(`/items/candy`);
    expect(resp.body).toEqual(candy);
  });
});

/** PATCH /cats/[name] - update cat; return `{cat: cat}` */

describe("PATCH /items/:name", function () {
  it("Updates a single items", async function () {
    const resp = await request(app).patch(`/items/${candy.name}`).send({
      name: "chips",
      price: 6.9,
    });
    expect(resp.body).toEqual({
      updated: { name: "chips", price: 6.9 },
    });
  });

  //TODO: why would it fail in testing environment but not in real environment?
  it("Responds with 404 if name invalid", async function () {
    const resp = await request(app).patch(`/items/nothere`);
    expect(resp.statusCode).toEqual(404);
  });
});

/** DELETE /items/:name - delete item,
 *  return `{message: "Deleted"}` */
describe("DELETE /items/:name", function () {
  it("Deletes a single a item", async function () {
    const resp = await request(app).delete(`/items/${candy.name}`);
    expect(resp.body).toEqual({ message: "Deleted" });

    expect(db.items.length).toEqual(0);
  });

  it("Responds with 404 if name invalid", async function () {
    const resp = await request(app).delete(`/items/nothere`);
    expect(resp.statusCode).toEqual(404);
  });
});
