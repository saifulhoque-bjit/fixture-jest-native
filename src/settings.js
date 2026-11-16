'use strict';

const Database = require('better-sqlite3');

function openSettings(file = ':memory:') {
  const db = new Database(file);
  db.exec('CREATE TABLE IF NOT EXISTS settings (key TEXT PRIMARY KEY, value TEXT NOT NULL)');
  return db;
}

function saveSetting(db, key, value) {
  db.prepare('INSERT INTO settings (key, value) VALUES (?, ?) ON CONFLICT (key) DO UPDATE SET value = excluded.value').run(key, JSON.stringify(value));
}

module.exports = { openSettings, saveSetting };
