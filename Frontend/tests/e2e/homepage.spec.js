import { test, expect } from "@playwright/test";

test("Foodly homepage loads successfully", async ({ page }) => {
  const pageErrors = [];
  const consoleErrors = [];
  const failedRequests = [];

  page.on("pageerror", (error) => {
    pageErrors.push(error.message);
  });

  page.on("console", (message) => {
    if (message.type() === "error") {
      consoleErrors.push(message.text());
    }
  });

  page.on("requestfailed", (request) => {
    failedRequests.push(
      `${request.method()} ${request.url()} — ${
        request.failure()?.errorText ?? "unknown error"
      }`,
    );
  });

  const response = await page.goto("/");

  expect(response, "Homepage should return a response").not.toBeNull();
  expect(response.status(), "Homepage should return HTTP 200").toBe(200);

  await expect(page.locator("body")).toBeVisible();

  try {
    await expect(page.locator("#root")).not.toBeEmpty({
      timeout: 10000,
    });
  } catch {
    throw new Error(
      [
        "React app did not render.",
        `JavaScript errors: ${JSON.stringify(pageErrors, null, 2)}`,
        `Console errors: ${JSON.stringify(consoleErrors, null, 2)}`,
        `Failed requests: ${JSON.stringify(failedRequests, null, 2)}`,
      ].join("\n"),
    );
  }

  expect(pageErrors, "Unexpected JavaScript errors").toEqual([]);
});
