/*
  Warnings:

  - Added the required column `unidade` to the `Produtos` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `preco` on the `Produtos` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Produtos" ADD COLUMN     "unidade" TEXT NOT NULL,
DROP COLUMN "preco",
ADD COLUMN     "preco" DOUBLE PRECISION NOT NULL;
