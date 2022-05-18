/*
  Warnings:

  - A unique constraint covering the columns `[tool_id]` on the table `using` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "using_tool_id_key" ON "using"("tool_id");
