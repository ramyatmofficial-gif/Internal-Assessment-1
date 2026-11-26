/**
 * Internal Assessment – Grade 9 – Branching Statement
 * Google Apps Script that stores each student's result in this Google Sheet.
 * Change TEACHER_PIN below to your own PIN before deploying.
 */
const TEACHER_PIN = 'SIS2026';
const SHEET_NAME = 'Results';
const HEAD = ['Submitted', 'Section', 'Roll', 'Name', 'Set', 'Q1 (5)', 'Q2 (5)', 'Q3 (15)', 'Total (25)', 'Tab switches', 'Ended by', 'Code'];

function sheet_() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sh = ss.getSheetByName(SHEET_NAME);
  if (!sh) {
    sh = ss.insertSheet(SHEET_NAME);
    sh.appendRow(HEAD);
    sh.getRange(1, 1, 1, HEAD.length).setFontWeight('bold');
    sh.setFrozenRows(1);
  }
  return sh;
}

function out_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}

const clean_ = (v, n) => String(v == null ? '' : v).replace(/^[=+\-@]/, "'$&").slice(0, n || 60);
const num_ = (v, max) => Math.max(0, Math.min(max, Number(v) || 0));

// Students' results arrive here
function doPost(e) {
  const lock = LockService.getScriptLock();
  lock.waitLock(20000);
  try {
    const d = JSON.parse(e.postData.contents);
    const section = clean_(d.section, 10), roll = Math.round(num_(d.roll, 99));
    if (!section || !roll) return out_({ ok: false, error: 'missing section or roll' });
    const sh = sheet_();
    const data = sh.getDataRange().getValues();
    for (let i = 1; i < data.length; i++) {
      if (String(data[i][1]) === section && Number(data[i][2]) === roll) return out_({ ok: true, duplicate: true });
    }
    sh.appendRow([new Date(), section, roll, clean_(d.name), clean_(d.set, 2),
      num_(d.q1, 5), num_(d.q2, 5), num_(d.q3, 15), num_(d.total, 25), num_(d.blurs, 999),
      d.auto ? 'Time up' : 'Student', clean_(d.code, 10)]);
    return out_({ ok: true });
  } catch (err) {
    return out_({ ok: false, error: String(err) });
  } finally {
    lock.releaseLock();
  }
}

// Teacher's class-wise view reads from here (needs the PIN)
function doGet(e) {
  if (!e || !e.parameter || e.parameter.key !== TEACHER_PIN) return out_({ ok: false, error: 'wrong pin' });
  const tz = Session.getScriptTimeZone();
  const rows = sheet_().getDataRange().getValues().slice(1).map(r => ({
    time: r[0] instanceof Date ? Utilities.formatDate(r[0], tz, 'dd-MM-yyyy HH:mm') : String(r[0]),
    section: String(r[1]), roll: Number(r[2]), name: String(r[3]).replace(/^'/, ''), set: String(r[4]),
    q1: r[5], q2: r[6], q3: r[7], total: r[8], blurs: r[9], ended: r[10], code: r[11]
  }));
  return out_({ ok: true, rows: rows });
}
