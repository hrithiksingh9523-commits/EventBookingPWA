import fs from 'node:fs';

const reports = [
  { browser: 'Chromium', file: 'test-results/chromium.json' },
  { browser: 'WebKit', file: 'test-results/webkit.json' },
  { browser: 'Firefox', file: 'test-results/firefox.json' }
];

const folders = {
  login: { total: 0, passed: 0, failed: 0, skipped: 0 },
  registration: { total: 0, passed: 0, failed: 0, skipped: 0 }
};

const browserFolders = Object.fromEntries(
  reports.map(({ browser }) => [browser, {
    login: { total: 0, passed: 0, failed: 0, skipped: 0 },
    registration: { total: 0, passed: 0, failed: 0, skipped: 0 }
  }])
);

function getFolder(file) {
  const normalized = file.replaceAll('\\\\', '/').toLowerCase();
  if (/(^|\/)login\//.test(normalized)) return 'login';
  if (/(^|\/)registration\//.test(normalized)) return 'registration';
  return null;
}

function visitSuite(suite, browser, browserTotals) {
  for (const spec of suite.specs ?? []) {
    const folder = getFolder(spec.file ?? '');

    if (!folder) continue;

    for (const test of spec.tests ?? []) {
      folders[folder].total++;
      browserFolders[browser][folder].total++;
      browserTotals.total++;

      const result = test.results?.at(-1);
      const status = result?.status;

      if (status === 'passed') {
        folders[folder].passed++;
        browserFolders[browser][folder].passed++;
        browserTotals.passed++;
      } else if (status === 'skipped') {
        folders[folder].skipped++;
        browserFolders[browser][folder].skipped++;
        browserTotals.skipped++;
      } else {
        folders[folder].failed++;
        browserFolders[browser][folder].failed++;
        browserTotals.failed++;
      }
    }
  }

  for (const child of suite.suites ?? []) {
    visitSuite(child, browser, browserTotals);
  }
}

const browserRows = [];

for (const report of reports) {
  const browserTotals = { total: 0, passed: 0, failed: 0, skipped: 0 };

  if (fs.existsSync(report.file)) {
    const data = JSON.parse(fs.readFileSync(report.file, 'utf8'));
    for (const suite of data.suites ?? []) {
      visitSuite(suite, report.browser, browserTotals);
    }
  }

  for (const folder of ['login', 'registration']) {
    const counts = browserFolders[report.browser][folder];
    browserRows.push(
      `| ${folder[0].toUpperCase()}${folder.slice(1)} | ${report.browser} | ${counts.total} | ${counts.passed} | ${counts.failed} | ${counts.skipped} |`
    );
  }
}

const total = Object.values(folders).reduce(
  (result, counts) => ({
    total: result.total + counts.total,
    passed: result.passed + counts.passed,
    failed: result.failed + counts.failed,
    skipped: result.skipped + counts.skipped
  }),
  { total: 0, passed: 0, failed: 0, skipped: 0 }
);

const markdown = `## Playwright Test Dashboard

| Folder | Browser | Total | Passed | Failed | Skipped |
|---|---|---:|---:|---:|---:|
${browserRows.join('\n')}
| Login | All browsers | ${folders.login.total} | ${folders.login.passed} | ${folders.login.failed} | ${folders.login.skipped} |
| Registration | All browsers | ${folders.registration.total} | ${folders.registration.passed} | ${folders.registration.failed} | ${folders.registration.skipped} |
| **Total** | **All browsers** | **${total.total}** | **${total.passed}** | **${total.failed}** | **${total.skipped}** |
`;

if (process.env.GITHUB_STEP_SUMMARY) {
  fs.appendFileSync(process.env.GITHUB_STEP_SUMMARY, markdown);
}
console.log(markdown);