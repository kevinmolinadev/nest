-- CreateTable
CREATE TABLE "order_items" (
    "id" TEXT NOT NULL,
    "idProduct" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL,
    "idOrder" TEXT NOT NULL,

    CONSTRAINT "order_items_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "order_items" ADD CONSTRAINT "order_items_idOrder_fkey" FOREIGN KEY ("idOrder") REFERENCES "orders"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
