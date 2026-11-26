# Internal Assessment – Grade 9 – Branching Statement
## Setup guide (about 10 minutes, one time only)

You need two files: **index.html** (the test page) and **Code.gs** (the code that saves results to a Google Sheet).

---

### Part 1: Make the Google Sheet that stores results

1. Go to **sheets.google.com** and create a **Blank spreadsheet**. Name it, for example, *Grade 9 Branching – Results*.
2. In the menu, click **Extensions → Apps Script**.
3. Delete everything in the editor, then paste in all of **Code.gs**.
4. On line 6, change `SIS2026` to your own teacher PIN if you want a different one. Keep the quotes.
5. Click the **Save** (disk) icon.
6. Click **Deploy → New deployment**.
   - Click the gear icon next to "Select type" and choose **Web app**.
   - **Execute as:** Me
   - **Who has access:** Anyone
   - Click **Deploy**.
7. Google asks for permission. Click **Authorize access**, choose your account, then **Advanced → Go to (project name) → Allow**.
8. Copy the **Web app URL**. It starts with `https://script.google.com/macros/s/…/exec`.

### Part 2: Put the URL into the test page

1. Open **index.html** in Notepad (right-click → Open with → Notepad).
2. Press Ctrl+F and search for `PASTE_YOUR_WEB_APP_URL_HERE`.
3. Replace that text with the URL you copied. Keep the quotes:
   `const SHEET_URL='https://script.google.com/macros/s/AKfy…/exec';`
4. Save the file.

### Part 3: Publish on GitHub

1. Sign in at **github.com** and click **+ → New repository**.
   Name it, for example, `grade9-assessment`. Choose **Public**, then click **Create repository**.
2. Click **uploading an existing file**, drag in **index.html**, then click **Commit changes**.
   (Upload only index.html. Code.gs stays in Google.)
3. In the repository, go to **Settings → Pages**.
   Under "Branch", choose **main** and **/(root)**, then click **Save**.
4. Wait 1–2 minutes and refresh. GitHub shows your link, for example:
   `https://YOUR-USERNAME.github.io/grade9-assessment/`
   Give this link to your students.

---

### Using it

- **Students:** open the link, enter name, roll no and class, take the test, then press **Lock & Launch**. They see "✓ Saved to your teacher's record" when their result has reached your sheet.
- **You:** click **Teacher** at the bottom of the page and enter your PIN. You can:
  - choose a class to see its scores (with average, highest and lowest)
  - **Download this class** or **Download all classes** as a CSV file, which opens in Excel
  - see the answer key for Sets A, B and C
- All results are also in your Google Sheet, in the **Results** tab.
- Each class + roll number is saved **only once** (the first attempt). To allow a retake, delete that student's row in the Google Sheet. Then, on the student's computer, use **Teacher → Clear saved attempts on this computer**.

### Before the real test

Do a trial run yourself: take the test as any class and roll number, press **Lock & Launch**, and check that a row appears in the sheet. Then delete that row, and use **Teacher → Clear saved attempts on this computer**.

### If you change Code.gs later

Go to **Deploy → Manage deployments → ✏️ Edit → Version: New version → Deploy**. This keeps the same URL.
