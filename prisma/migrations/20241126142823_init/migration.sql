/*
  Warnings:

  - You are about to drop the column `paymenteDate` on the `Job` table. All the data in the column will be lost.
  - Added the required column `paymentDate` to the `Job` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Job" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "contractId" INTEGER NOT NULL,
    "description" TEXT NOT NULL,
    "operationDate" DATETIME NOT NULL,
    "paymentDate" DATETIME NOT NULL,
    "price" REAL NOT NULL,
    "paid" INTEGER NOT NULL,
    CONSTRAINT "Job_contractId_fkey" FOREIGN KEY ("contractId") REFERENCES "Contract" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Job" ("contractId", "description", "id", "operationDate", "paid", "price") SELECT "contractId", "description", "id", "operationDate", "paid", "price" FROM "Job";
DROP TABLE "Job";
ALTER TABLE "new_Job" RENAME TO "Job";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
