'use strict';

const { openSettings, saveSetting } = require('../src/settings');

test('a second save of a key replaces its value', () => {
  const db = openSettings();
  saveSetting(db, 'theme', 'light');
  saveSetting(db, 'theme', 'dark');
  const row = db.prepare('SELECT value FROM settings WHERE key = ?').get('theme');
  expect(JSON.parse(row.value)).toBe('dark');
  db.close();
});
