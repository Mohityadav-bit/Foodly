import { describe, it, expect, vi, afterEach } from "vitest";

const { mockFindOne, mockFindById, mockCompare, mockGenToken } = vi.hoisted(
  () => ({
    mockFindOne: vi.fn(),
    mockFindById: vi.fn(),
    mockCompare: vi.fn(),
    mockGenToken: vi.fn(),
  }),
);

vi.mock("../models/user.model.js", () => ({
  default: {
    findOne: mockFindOne,
    findById: mockFindById,
  },
}));

vi.mock("bcryptjs", () => ({
  default: { compare: mockCompare },
}));

vi.mock("../utils/token.js", () => ({
  default: mockGenToken,
}));

import { signIn } from "../controllers/auth.controller.js";

function createResponse() {
  return {
    status: vi.fn().mockReturnThis(),
    json: vi.fn().mockReturnThis(),
    cookie: vi.fn(),
  };
}

describe("Signin controller security", () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it("rejects signin when the user does not exist", async () => {
    mockFindOne.mockResolvedValue(null);

    const req = {
      body: { email: "missing@example.com", password: "password123" },
    };
    const res = createResponse();

    await signIn(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      message: "User does not exist",
    });
    expect(res.cookie).not.toHaveBeenCalled();
    expect(mockCompare).not.toHaveBeenCalled();
  });

  it("rejects signin when the password is incorrect", async () => {
    mockFindOne.mockResolvedValue({
      _id: "user-123",
      password: "hashed-password",
    });
    mockCompare.mockResolvedValue(false);

    const req = {
      body: { email: "test@example.com", password: "wrong-password" },
    };
    const res = createResponse();

    await signIn(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      message: "Incorrect Password",
    });
    expect(res.cookie).not.toHaveBeenCalled();
    expect(mockGenToken).not.toHaveBeenCalled();
  });

  it("returns user data without sensitive fields after successful signin", async () => {
    const user = {
      _id: "user-123",
      fullName: "Test User",
      email: "test@example.com",
      mobile: "9876543210",
      role: "user",
      password: "hashed-password",
      resetOtp: "1234",
      isOtpVerified: true,
      otpExpires: new Date(),
    };

    mockFindOne.mockResolvedValue(user);
    mockCompare.mockResolvedValue(true);
    mockGenToken.mockResolvedValue("test-token");

    mockFindById.mockReturnValue({
      select: vi.fn().mockResolvedValue({
        _id: "user-123",
        fullName: "Test User",
        email: "test@example.com",
        mobile: "9876543210",
        role: "user",
      }),
    });

    const req = {
      body: { email: "test@example.com", password: "password123" },
    };
    const res = createResponse();

    await signIn(req, res);
    expect(mockFindById).toHaveBeenCalledWith("user-123");
    expect(mockFindById.mock.results[0].value.select).toHaveBeenCalledWith(
      "-password -resetOtp -isOtpVerified -otpExpires",
    );

    expect(res.status).toHaveBeenCalledWith(200);

    const responseBody = res.json.mock.calls[0][0];

    expect(responseBody).toHaveProperty("fullName", "Test User");
    expect(responseBody).not.toHaveProperty("password");
    expect(responseBody).not.toHaveProperty("resetOtp");
    expect(responseBody).not.toHaveProperty("isOtpVerified");
    expect(responseBody).not.toHaveProperty("otpExpires");
  });
});
