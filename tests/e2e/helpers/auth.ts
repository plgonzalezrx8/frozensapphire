/**
 * Shared Playwright helpers for logging in and out of admin sessions.
 */
import { expect, type Page } from "@playwright/test";

/**
 * Signs in using credentials configured in environment variables.
 * @param page - Browser page instance used for interactions.
 * @param email - User email for the login flow.
 * @param password - User password for the login flow.
 */
export async function signInWithCredentials(
  page: Page,
  email: string,
  password: string,
): Promise<void> {
  await page.goto("/login");
  await page.getByLabel("Email").fill(email);
  await page.getByLabel("Password").fill(password);
  await page.getByRole("button", { name: "Sign in" }).click();
  await expect(page).toHaveURL(/\/admin/);
}

/**
 * Signs the current session out using the admin shell control.
 * @param page - Browser page instance used for interactions.
 */
export async function signOutFromAdmin(page: Page): Promise<void> {
  await page.getByRole("button", { name: "Sign out" }).click();
  await expect(page).toHaveURL(/\/login/);
}
