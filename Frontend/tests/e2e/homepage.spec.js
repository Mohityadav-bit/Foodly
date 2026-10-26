
import { test, expect } from "@playwright/test";

test("Foodly homepage displays its main content", async ({ page }) => {
  const pageErrors = [];

  page.on("pageerror", (error) => {
    pageErrors.push(error.message);
  });

  const response = await page.goto("/");

  // 1. Homepage should return HTTP 200
  expect(response).not.toBeNull();
  expect(response.status()).toBe(200);

  // 2. React app should render
  await expect(page.locator("#root")).not.toBeEmpty();

  // 3. Main homepage sections should be visible
  await expect(
    page.getByRole("heading", { name: "Top Restaurants Near You" })
  ).toBeVisible();

  await expect(
    page.getByRole("heading", { name: "What's on your mind?" })
  ).toBeVisible();

  // 4. All three restaurant cards should appear
  await expect(page.getByRole("heading", { name: "Spice Kitchen" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Burger Hub" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Biryani House" })).toBeVisible();
  await expect(page.getByRole("heading", { name: /Spice Kitchen|Burger Hub|Biryani House/ })).toHaveCount(3);

  // 5. Login and Sign Up links should be available
  await expect(page.getByRole("link", { name: "Login" })).toBeVisible();
  await expect(page.getByRole("link", { name: "Sign Up" })).toBeVisible();

  // 6. No unexpected JavaScript errors
  expect(pageErrors).toEqual([]);
});

test("Login and Sign Up links navigate to the correct pages", async ({ page }) => {
  await page.goto("/");

  // Click Login and verify the destination
  await page.getByRole("link", { name: "Login" }).click();
  await expect(page).toHaveURL(/\/signin$/);

  // Return to homepage
  await page.goto("/");

  // Click Sign Up and verify the destination
  await page.getByRole("link", { name: "Sign Up" }).click();
  await expect(page).toHaveURL(/\/signup$/);
});

