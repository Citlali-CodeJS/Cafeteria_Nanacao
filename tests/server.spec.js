const request = require("supertest");
const server = require("../index"); 

describe("Operaciones CRUD de cafes", () => {
  it("GET /cafes debe retornar status 200 y un arreglo con al menos 1 café", async () => {
    const response = await request(server).get("/cafes").send();
    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
    expect(response.body.length).toBeGreaterThan(0);
  });

  it("DELETE /cafes/:id con id inexistente debe retornar 404", async () => {
    const idInexistente = 9999;
    const response = await request(server)
      .delete(`/cafes/${idInexistente}`)
      .set("Authorization", "tokenDePrueba") 
      .send();
    expect(response.status).toBe(404);
  });

  it("POST /cafes debe agregar un nuevo café y retornar status 201", async () => {
    const nuevoCafe = { id: Math.floor(Math.random() * 10000), nombre: "Café de prueba" };
    const response = await request(server).post("/cafes").send(nuevoCafe);
    expect(response.status).toBe(201);
    expect(response.body).toContainEqual(nuevoCafe);
  });

  it("PUT /cafes/:id con id distinto al del body debe retornar 400", async () => {
    const idParam = 1;
    const cafe = { id: 2, nombre: "Café conflicto" };
    const response = await request(server).put(`/cafes/${idParam}`).send(cafe);
    expect(response.status).toBe(400);
  });
});
