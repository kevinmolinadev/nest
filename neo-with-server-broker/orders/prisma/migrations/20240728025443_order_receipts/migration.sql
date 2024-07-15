-- CreateTable
CREATE TABLE "order_receipts" (
    "id" TEXT NOT NULL,
    "idOrder" TEXT NOT NULL,
    "receipt" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "order_receipts_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "order_receipts_idOrder_key" ON "order_receipts"("idOrder");

-- AddForeignKey
ALTER TABLE "order_receipts" ADD CONSTRAINT "order_receipts_idOrder_fkey" FOREIGN KEY ("idOrder") REFERENCES "orders"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
