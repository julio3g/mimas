/*
  Warnings:

  - A unique constraint covering the columns `[tool_id]` on the table `comments` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "comments_user_id_key";

-- CreateIndex
CREATE UNIQUE INDEX "comments_tool_id_key" ON "comments"("tool_id");
