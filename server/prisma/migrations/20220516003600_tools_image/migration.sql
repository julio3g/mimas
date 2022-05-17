/*
  Warnings:

  - You are about to drop the `tools_images` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "tools_images" DROP CONSTRAINT "tools_images_tool_id_fkey";

-- DropTable
DROP TABLE "tools_images";

-- CreateTable
CREATE TABLE "tools_image" (
    "id" TEXT NOT NULL,
    "image_name" TEXT NOT NULL,
    "tool_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "tools_image_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "tools_image" ADD CONSTRAINT "tools_image_tool_id_fkey" FOREIGN KEY ("tool_id") REFERENCES "tools"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
