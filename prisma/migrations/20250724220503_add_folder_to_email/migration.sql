-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Email" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "subject" TEXT NOT NULL,
    "sender" TEXT NOT NULL,
    "to" TEXT NOT NULL,
    "date" DATETIME NOT NULL,
    "body" TEXT NOT NULL,
    "folder" TEXT NOT NULL DEFAULT 'INBOX',
    "userId" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Email_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Email" ("body", "createdAt", "date", "id", "sender", "subject", "to", "userId") SELECT "body", "createdAt", "date", "id", "sender", "subject", "to", "userId" FROM "Email";
DROP TABLE "Email";
ALTER TABLE "new_Email" RENAME TO "Email";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
