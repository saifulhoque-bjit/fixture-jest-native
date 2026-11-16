'use strict';

const { openSettings, saveSetting, loadSetting } = require('../src/settings');

let db;

beforeEach(() => {
  db = openSettings();
});

afterEach(() => {
  db.close();
  delete globalThis.settingsFixtureRan;
});

test('a saved value reads back the same', () => {
  saveSetting(db, 'limits', { users: 10, names: ['a', 'b'] });
  expect(loadSetting(db, 'limits')).toEqual({ users: 10, names: ['a', 'b'] });
  expect(loadSetting(db, 'missing', 'fallback')).toBe('fallback');
});

test('a stored value is read as data, never run as code', () => {
  // Another tool wrote this row directly: it is code, not JSON.
  db.prepare('INSERT INTO settings (key, value) VALUES (?, ?)').run(
    'theme',
    '(() => { globalThis.settingsFixtureRan = true; return "dark"; })()'
  );
  expect(() => loadSetting(db, 'theme')).toThrow(SyntaxError);
  expect(globalThis.settingsFixtureRan).toBeUndefined();
});
