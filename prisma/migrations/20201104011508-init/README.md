# Migration `20201104011508-init`

This migration has been generated by Mateus Machado at 11/3/2020, 10:15:08 PM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
CREATE TABLE "public"."Bubble" (
"id" SERIAL,
"createdAt" timestamp(3)   NOT NULL DEFAULT CURRENT_TIMESTAMP,
"title" text   NOT NULL ,
"description" text   NOT NULL ,
"content" text   ,
"authorId" integer   NOT NULL ,
PRIMARY KEY ("id")
)

CREATE TABLE "public"."User" (
"id" SERIAL,
"email" text   NOT NULL ,
"name" text   ,
"avatarUrl" text   NOT NULL ,
PRIMARY KEY ("id")
)

CREATE UNIQUE INDEX "User.email_unique" ON "public"."User"("email")

ALTER TABLE "public"."Bubble" ADD FOREIGN KEY("authorId")REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration ..20201104011508-init
--- datamodel.dml
+++ datamodel.dml
@@ -1,0 +1,29 @@
+// This is your Prisma schema file,
+// learn more about it in the docs: https://pris.ly/d/prisma-schema
+
+datasource db {
+  provider = "postgresql"
+  url = "***"
+}
+
+generator client {
+  provider = "prisma-client-js"
+}
+
+model Bubble {
+  id          Int      @default(autoincrement()) @id
+  createdAt   DateTime @default(now())
+  title       String
+  description String
+  content     String?
+  author      User     @relation(fields: [authorId], references: [id])
+  authorId    Int
+}
+
+model User {
+  id        Int      @default(autoincrement()) @id
+  email     String   @unique
+  name      String?
+  avatarUrl String
+  bubbles   Bubble[]
+}
```


