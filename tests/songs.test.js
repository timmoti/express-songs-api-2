const app = require("../app");
const request = require("supertest");

describe("routes/songs", () => {

  it("POST /songs should return a new song object", () => {
    requestBody = { name: "test song", artist: "rhianna"};
    
    return request(app)
    .post("/songs")
    .send(requestBody)
    
    .then(response => {
      expect(response.status).toEqual(201);
      expect(response.body).toMatchObject(requestBody);
    });
  });
  
  it("GET /songs should return a non empty array", () => {
    return request(app)
    .get("/songs")
    
    .then(response => {
      expect(response.status).toEqual(200);
      expect(Array.isArray(response.body)).toEqual(true);
      expect(response.body.length).toBeGreaterThan(0);
    });
  });
  
  it("PUT /songs should return the updated song", () => {
    requestBody = {
      name: "updated song",
      artist: "rhianna"
    };
    
    return request(app)
    .put("/songs/1")
    .send(requestBody)
    
    .then(response => {
      expect(response.status).toEqual(200);
      expect(response.body).toMatchObject(requestBody);
    });
  });

  it("DELETE /songs/:id should return the deleted song", () => {
    const ID = 1;
    expected = {
      name: "updated song",
      artist: "rhianna"
    };

    return request(app)
    .delete("/songs/1")

    .then(response => {
      expect(response.status).toEqual(200);
      expect(response.body).toMatchObject(expected);
    })
  });
  
  it("GET /songs should return an empty array", () => {
    return request(app)
    .get("/songs")
    
    .then(response => {
      expect(response.status).toEqual(200);
      expect(Array.isArray(response.body)).toBe(true);
      expect(response.body.length).toEqual(0);
    });
  });

});
