import { describe, it, expect, vi, afterEach } from "vitest";
import jwt from "jsonwebtoken";
import isAuth from "../middleware/isAuth.js";

describe("Authentication middleware", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("rejects requests without a token", async () => {
    const req = { cookies: {} };
    const res = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn().mockReturnThis(),
    };
    const next = vi.fn();

    await isAuth(req, res, next);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({
      message: "Authentication required",
    });
    expect(next).not.toHaveBeenCalled();
  });

  it("rejects an invalid token", async () => {
    vi.stubEnv("JWT_SECRET", "test-secret");

    const req = { cookies: { token: "invalid-token" } };
    const res = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn().mockReturnThis(),
    };
    const next = vi.fn();

    await isAuth(req, res, next);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({
      message: "Invalid or expired token",
    });
    expect(next).not.toHaveBeenCalled();
  });

  it("accepts a valid token and sets req.userId", () => {
    vi.stubEnv("JWT_SECRET", "test-secret");

    const token = jwt.sign({ userId: "test-user-123" }, "test-secret");
    const req = { cookies: { token } };
    const res = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn().mockReturnThis(),
    };
    const next = vi.fn();

    isAuth(req, res, next);

    expect(req.userId).toBe("test-user-123");
    expect(next).toHaveBeenCalledOnce();
    expect(res.status).not.toHaveBeenCalled();
  });
});
