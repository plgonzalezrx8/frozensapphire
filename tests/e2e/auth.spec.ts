/**
 * End-to-end authentication checks for protected admin routes.
 */
import { expect, test } from "@playwright/test";
import { signInWithCredentials } from "./helpers/auth";

const adminEmail = process.env.E2E_ADMIN_EMAIL ?? "admin@frozensapphire.local";
const adminPassword = process.env.E2E_ADMIN_PASSWORD ?? "ChangeMe123!";

test("redirects unauthenticated visitors to login", async ({ page }) => {
  await page.goto("/admin");

  await expect(page).toHaveURL(/\/login/);
  await expect(page.getByRole("heading", { name: "Admin Sign In" })).toBeVisible();
});

test("allows seeded admin credentials to access the dashboard", async ({ page }) => {
  await signInWithCredentials(page, adminEmail, adminPassword);

  await expect(page.getByRole("heading", { name: "Dashboard" })).toBeVisible();
});
