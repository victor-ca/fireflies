import request from "supertest";
import { jest } from "@jest/globals";
import { app } from "../server.js"; // Assuming you export your Express app

describe("Express App", () => {
  it("should return welcome message on root route", async () => {
    const response = await request(app).get("/");
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ message: "Welcome to the MeetingBot API" });
  });

  it("should return 401 on unauthorized access", async () => {
    const response = await request(app).get("/api/meetings");
    expect(response.status).toBe(401);
  });

  it("should handle test error", async () => {
    // mute the console.error

    jest.spyOn(console, "error").mockImplementation(() => {});
    const response = await request(app).get("/die/any");
    expect(response.status).toBe(500);
    expect(response.body).toHaveProperty(
      "message",
      "An unexpected error occurred"
    );
  });

  // Add more tests for other routes and error scenarios
});
