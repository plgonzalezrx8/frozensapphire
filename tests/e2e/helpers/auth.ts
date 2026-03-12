/**
 * Shared Playwright helpers for auth-driven admin tests.
 */
import { expect, type Page } from "@playwright/test";

/**
 * Signs in using the local credentials flow.
 * @param page - Browser page used for the interactions.
 * @param email - User email to submit.
 * @param password - User password to submit.
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
 * Signs the current admin session out.
 * @param page - Browser page used for the interactions.
 */
export async function signOutFromAdmin(page: Page): Promise<void> {
  await page.getByRole("button", { name: "Sign out" }).click();
  await expect(page).toHaveURL(/\/login/);
}
