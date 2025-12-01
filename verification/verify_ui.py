from playwright.sync_api import sync_playwright
import os

def run():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()

        # Absolute path to dist/index.html
        cwd = os.getcwd()
        file_path = f"file://{cwd}/dist/index.html"

        print(f"Navigating to {file_path}")
        page.goto(file_path)

        # Wait for title or header
        page.wait_for_selector("text=FluentPDF")

        # Take screenshot of main page
        page.screenshot(path="verification/dashboard.png")
        print("Dashboard screenshot taken.")

        # Open Settings
        page.get_by_role("button", name="Settings").click()
        # Wait for modal to appear (it has transition, so wait a bit)
        page.wait_for_timeout(500)

        page.screenshot(path="verification/settings.png")
        print("Settings screenshot taken.")

        browser.close()

if __name__ == "__main__":
    run()
