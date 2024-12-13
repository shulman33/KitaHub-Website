-- CreateTable
CREATE TABLE "University" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "country" VARCHAR(255) NOT NULL,
    "state" VARCHAR(255) NOT NULL,
    "city" VARCHAR(255) NOT NULL,

    CONSTRAINT "University_pkey" PRIMARY KEY ("id")
);
