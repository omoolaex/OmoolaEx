// lib/audit-db.js

if (!global.auditDB) {
  global.auditDB = {}; // shared memory across routes
}

export const auditDB = global.auditDB;
