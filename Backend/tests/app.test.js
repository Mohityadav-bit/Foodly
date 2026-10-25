import { describe, it, expect } from "vitest";
import request from "supertest";
import app from "../app.js";

describe("Health check API", () => {
  it("returns 200 and the expected message", async () => {
    const response = await request(app).get("/");

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      message: "Foodly backend is running!",
    });
  });
});
