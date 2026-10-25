
import { test, expect } from "@playwright/test";

test("Foodly homepage loads successfully", async ({ page }) => {
  const pageErrors = [];

  page.on("pageerror", (error) => {
    pageErrors.push(error.message);
  });

  const response = await page.goto("/");

  expect(response, "Homepage should return a response").not.toBeNull();
  expect(response.status(), "Homepage should return HTTP 200").toBe(200);

  await expect(page.locator("body")).toBeVisible();

  // Wait for the React application to render actual page content.
  await expect(page.locator("#root")).not.toBeEmpty();

  expect(pageErrors, "Homepage should not throw JavaScript errors").toEqual([]);
});
