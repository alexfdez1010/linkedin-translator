-- CreateTable
CREATE TABLE "SharedTranslation" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "originalText" TEXT NOT NULL,
    "translatedText" TEXT NOT NULL,
    "locale" TEXT NOT NULL DEFAULT 'en',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "SharedTranslation_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "SharedTranslation_slug_key" ON "SharedTranslation"("slug");

-- CreateIndex
CREATE INDEX "SharedTranslation_slug_idx" ON "SharedTranslation"("slug");
