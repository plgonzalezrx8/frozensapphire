/**
 * End-to-end checks for content creation and cross-author authorization denial.
 */
import { expect, test } from "@playwright/test";
import { signInWithCredentials, signOutFromAdmin } from "./helpers/auth";

const authorOneEmail = process.env.E2E_AUTHOR_ONE_EMAIL ?? "author@frozensapphire.local";
const authorTwoEmail = process.env.E2E_AUTHOR_TWO_EMAIL ?? "author2@frozensapphire.local";
const authorPassword = process.env.E2E_AUTHOR_PASSWORD ?? "ChangeMe123!";

test("denies a second author from publishing another author's draft", async ({ page }) => {
  const contentTitle = `E2E Ownership ${Date.now()}`;

  await signInWithCredentials(page, authorOneEmail, authorPassword);
  await page.goto("/admin/content");
  await page.getByPlaceholder("Content title").fill(contentTitle);
  await page.getByRole("button", { name: "Create" }).click();
  await expect(page.getByText(contentTitle)).toBeVisible();

  await signOutFromAdmin(page);
  await signInWithCredentials(page, authorTwoEmail, authorPassword);
  await page.goto("/admin/content");

  const row = page.locator("li", {
    has: page.getByText(contentTitle),
  });
  await row.getByRole("button", { name: "Publish" }).click();

  await expect(page.getByText("User cannot modify this content item.")).toBeVisible();
});
