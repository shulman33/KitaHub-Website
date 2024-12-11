CREATE TYPE "public"."gender" AS ENUM('MALE', 'FEMALE', 'OTHER');--> statement-breakpoint
CREATE TYPE "public"."resource_type" AS ENUM('SLIDE_DECK', 'ARTICLE', 'VIDEO', 'OTHER');--> statement-breakpoint
CREATE TYPE "public"."role" AS ENUM('STUDENT', 'PROFESSOR');--> statement-breakpoint
CREATE TYPE "public"."semester" AS ENUM('FALL', 'WINTER', 'SPRING', 'SUMMER');--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "Announcement" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"classId" uuid NOT NULL,
	"userId" uuid NOT NULL,
	"title" varchar(255) NOT NULL,
	"content" varchar(255) NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "Announcement" ENABLE ROW LEVEL SECURITY;--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "Assignment" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"classId" uuid NOT NULL,
	"title" varchar(255) NOT NULL,
	"description" varchar(255),
	"dueDate" timestamp NOT NULL,
	"totalPoints" double precision NOT NULL,
	"isUploaded" boolean DEFAULT false NOT NULL,
	"url" varchar(255),
	"isGraded" boolean DEFAULT false NOT NULL,
	"isPublished" boolean DEFAULT false NOT NULL
);
--> statement-breakpoint
ALTER TABLE "Assignment" ENABLE ROW LEVEL SECURITY;--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "ClassEnrollment" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"userId" uuid NOT NULL,
	"classId" uuid NOT NULL,
	"role" "role" NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "Class" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"universityId" uuid NOT NULL,
	"className" varchar(255) NOT NULL,
	"description" varchar(255),
	"code" integer NOT NULL,
	"semester" "semester" NOT NULL,
	"year" integer NOT NULL,
	"isActive" boolean DEFAULT true NOT NULL
);
--> statement-breakpoint
ALTER TABLE "Class" ENABLE ROW LEVEL SECURITY;--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "Grade" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"assignmentId" uuid NOT NULL,
	"studentId" uuid NOT NULL,
	"score" double precision NOT NULL,
	"gradedAt" timestamp DEFAULT now() NOT NULL,
	"feedback" varchar(255)
);
--> statement-breakpoint
ALTER TABLE "Grade" ENABLE ROW LEVEL SECURITY;--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "message" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"classId" uuid NOT NULL,
	"userId" uuid NOT NULL,
	"parentMessageId" uuid,
	"title" varchar(255),
	"content" varchar(255) NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "MessageTags" (
	"messageId" uuid NOT NULL,
	"tagId" uuid NOT NULL,
	CONSTRAINT "MessageTags_messageId_tagId_pk" PRIMARY KEY("messageId","tagId")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "Resource" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"classId" uuid,
	"assignmentId" uuid,
	"userId" uuid,
	"title" varchar(255) NOT NULL,
	"type" "resource_type" NOT NULL,
	"url" varchar(255) NOT NULL,
	"uploadedAt" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "Resource" ENABLE ROW LEVEL SECURITY;--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "ResourceTags" (
	"resourceId" uuid NOT NULL,
	"tagId" uuid NOT NULL,
	CONSTRAINT "ResourceTags_resourceId_tagId_pk" PRIMARY KEY("resourceId","tagId")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "Tag" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar(255) NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "University" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar(255) NOT NULL,
	"country" varchar(255) NOT NULL,
	"alphaTwoCode" varchar(2) NOT NULL,
	"state" varchar(255)
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "User" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"auth0UserId" varchar(255) NOT NULL,
	"universityId" uuid NOT NULL,
	"firstName" varchar(255) NOT NULL,
	"lastName" varchar(255) NOT NULL,
	"bio" varchar(255),
	"role" "role" NOT NULL,
	"prefix" varchar(255),
	"profilePicture" varchar(255),
	"phoneNumber" varchar(255),
	"email" varchar(255),
	"schoolEmail" varchar(255) NOT NULL,
	"gender" "gender",
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL,
	"dataSharingOptIn" boolean DEFAULT false NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "Announcement" ADD CONSTRAINT "Announcement_classId_Class_id_fk" FOREIGN KEY ("classId") REFERENCES "public"."Class"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "Announcement" ADD CONSTRAINT "Announcement_userId_User_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "Assignment" ADD CONSTRAINT "Assignment_classId_Class_id_fk" FOREIGN KEY ("classId") REFERENCES "public"."Class"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "ClassEnrollment" ADD CONSTRAINT "ClassEnrollment_userId_User_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "ClassEnrollment" ADD CONSTRAINT "ClassEnrollment_classId_Class_id_fk" FOREIGN KEY ("classId") REFERENCES "public"."Class"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "Class" ADD CONSTRAINT "Class_universityId_University_id_fk" FOREIGN KEY ("universityId") REFERENCES "public"."University"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "Grade" ADD CONSTRAINT "Grade_assignmentId_Assignment_id_fk" FOREIGN KEY ("assignmentId") REFERENCES "public"."Assignment"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "Grade" ADD CONSTRAINT "Grade_studentId_User_id_fk" FOREIGN KEY ("studentId") REFERENCES "public"."User"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "message" ADD CONSTRAINT "message_classId_Class_id_fk" FOREIGN KEY ("classId") REFERENCES "public"."Class"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "message" ADD CONSTRAINT "message_userId_User_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "message" ADD CONSTRAINT "parentMessageId" FOREIGN KEY ("parentMessageId") REFERENCES "public"."message"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "MessageTags" ADD CONSTRAINT "MessageTags_messageId_message_id_fk" FOREIGN KEY ("messageId") REFERENCES "public"."message"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "MessageTags" ADD CONSTRAINT "MessageTags_tagId_Tag_id_fk" FOREIGN KEY ("tagId") REFERENCES "public"."Tag"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "Resource" ADD CONSTRAINT "Resource_classId_Class_id_fk" FOREIGN KEY ("classId") REFERENCES "public"."Class"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "Resource" ADD CONSTRAINT "Resource_assignmentId_Assignment_id_fk" FOREIGN KEY ("assignmentId") REFERENCES "public"."Assignment"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "Resource" ADD CONSTRAINT "Resource_userId_User_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "ResourceTags" ADD CONSTRAINT "ResourceTags_resourceId_Resource_id_fk" FOREIGN KEY ("resourceId") REFERENCES "public"."Resource"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "ResourceTags" ADD CONSTRAINT "ResourceTags_tagId_Tag_id_fk" FOREIGN KEY ("tagId") REFERENCES "public"."Tag"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "User" ADD CONSTRAINT "User_universityId_University_id_fk" FOREIGN KEY ("universityId") REFERENCES "public"."University"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "class_enrollment_user_class_unique" ON "ClassEnrollment" USING btree ("userId","classId");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "tag_name_unique" ON "Tag" USING btree ("name");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "University_name_index" ON "University" USING btree ("name");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "user_phone_number_unique" ON "User" USING btree ("phoneNumber");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "user_email_unique" ON "User" USING btree ("email");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "user_school_email_unique" ON "User" USING btree ("schoolEmail");--> statement-breakpoint
CREATE POLICY "announcement_select_policy" ON "Announcement" AS PERMISSIVE FOR SELECT TO "authenticated" USING (
        "Announcement"."userId" = (
          SELECT u.id
          FROM "User" u
          WHERE u."auth0UserId" = auth.user_id()
        )
        AND EXISTS (
          SELECT 1
          FROM "ClassEnrollment" ce
          WHERE ce."userId" = "Announcement"."userId"
            AND ce."classId" = "Announcement"."classId"
        )
      );--> statement-breakpoint
CREATE POLICY "announcement_insert_policy" ON "Announcement" AS PERMISSIVE FOR INSERT TO "authenticated" USING (
        "Announcement"."userId" = (
          SELECT u.id
          FROM "User" u
          WHERE u."auth0UserId" = auth.user_id()
        )
        AND EXISTS (
          SELECT 1
          FROM "ClassEnrollment" ce
          WHERE ce."userId" = "Announcement"."userId"
            AND ce."classId" = "Announcement"."classId"
        )
      );--> statement-breakpoint
CREATE POLICY "announcement_update_policy" ON "Announcement" AS PERMISSIVE FOR UPDATE TO "authenticated" USING (
        "Announcement"."userId" = (
          SELECT u.id
          FROM "User" u
          WHERE u."auth0UserId" = auth.user_id()
        )
        AND EXISTS (
          SELECT 1
          FROM "ClassEnrollment" ce
          WHERE ce."userId" = "Announcement"."userId"
            AND ce."classId" = "Announcement"."classId"
        )
      );--> statement-breakpoint
CREATE POLICY "announcement_delete_policy" ON "Announcement" AS PERMISSIVE FOR DELETE TO "authenticated" USING (
        "Announcement"."userId" = (
          SELECT u.id
          FROM "User" u
          WHERE u."auth0UserId" = auth.user_id()
        )
        AND EXISTS (
          SELECT 1
          FROM "ClassEnrollment" ce
          WHERE ce."userId" = "Announcement"."userId"
            AND ce."classId" = "Announcement"."classId"
        )
      );--> statement-breakpoint
CREATE POLICY "assignment_select_policy" ON "Assignment" AS PERMISSIVE FOR SELECT TO "authenticated" USING (
        EXISTS (
          SELECT 1
          FROM "ClassEnrollment" ce
          JOIN "User" u ON ce."userId" = u.id
          WHERE ce."classId" = "Assignment".classId
            AND u."auth0UserId" = auth.user_id()
        )
      );--> statement-breakpoint
CREATE POLICY "assignment_insert_policy" ON "Assignment" AS PERMISSIVE FOR INSERT TO "authenticated" USING (
        EXISTS (
          SELECT 1
          FROM "ClassEnrollment" ce
          JOIN "User" u ON ce."userId" = u.id
          WHERE ce."classId" = "Assignment".classId
            AND u."auth0UserId" = auth.user_id()
            AND u."role" = 'PROFESSOR'
        )
      );--> statement-breakpoint
CREATE POLICY "assignment_update_policy" ON "Assignment" AS PERMISSIVE FOR UPDATE TO "authenticated" USING (
        EXISTS (
          SELECT 1
          FROM "ClassEnrollment" ce
          JOIN "User" u ON ce."userId" = u.id
          WHERE ce."classId" = "Assignment".classId
            AND u."auth0UserId" = auth.user_id()
            AND u."role" = 'PROFESSOR'
        )
      );--> statement-breakpoint
CREATE POLICY "assignment_delete_policy" ON "Assignment" AS PERMISSIVE FOR DELETE TO "authenticated" USING (
        EXISTS (
          SELECT 1
          FROM "ClassEnrollment" ce
          JOIN "User" u ON ce."userId" = u.id
          WHERE ce."classId" = "Assignment".classId
            AND u."auth0UserId" = auth.user_id()
            AND u."role" = 'PROFESSOR'
        )
      );--> statement-breakpoint
CREATE POLICY "class_select_policy" ON "Class" AS PERMISSIVE FOR SELECT TO "authenticated" USING (
        EXISTS (
          SELECT 1
          FROM "ClassEnrollment" ce
          JOIN "User" u ON ce."userId" = u.id
          WHERE ce."classId" = "Class".id
            AND u."auth0UserId" = auth.user_id()
        )
      );--> statement-breakpoint
CREATE POLICY "class_insert_policy" ON "Class" AS PERMISSIVE FOR INSERT TO "authenticated" USING (
        EXISTS (
          SELECT 1
          FROM "ClassEnrollment" ce
          JOIN "User" u ON ce."userId" = u.id
          WHERE ce."classId" = "Class".id
            AND u."auth0UserId" = auth.user_id() AND u."role" = 'PROFESSOR'
        )
      );--> statement-breakpoint
CREATE POLICY "class_update_policy" ON "Class" AS PERMISSIVE FOR UPDATE TO "authenticated" USING (
        EXISTS (
          SELECT 1
          FROM "ClassEnrollment" ce
          JOIN "User" u ON ce."userId" = u.id
          WHERE ce."classId" = "Class".id
            AND u."auth0UserId" = auth.user_id() AND u."role" = 'PROFESSOR'
        )
      );--> statement-breakpoint
CREATE POLICY "class_delete_policy" ON "Class" AS PERMISSIVE FOR DELETE TO "authenticated" USING (
        EXISTS (
          SELECT 1
          FROM "ClassEnrollment" ce
          JOIN "User" u ON ce."userId" = u.id
          WHERE ce."classId" = "Class".id
            AND u."auth0UserId" = auth.user_id() AND u."role" = 'PROFESSOR'
        )
      );--> statement-breakpoint
CREATE POLICY "grade_select_policy" ON "Grade" AS PERMISSIVE FOR SELECT TO "authenticated" USING (
        "Grade"."studentId" = (
          SELECT u.id
          FROM "User" u
          WHERE u."auth0UserId" = auth.user_id()
        )
        AND EXISTS (
          SELECT 1
          FROM "ClassEnrollment" ce
          WHERE ce."userId" = "Grade"."studentId"
            AND ce."classId" = (
              SELECT "classId"
              FROM "Assignment"
              WHERE "Assignment".id = "Grade"."assignmentId"
            )
        )
      );--> statement-breakpoint
CREATE POLICY "grade_insert_policy" ON "Grade" AS PERMISSIVE FOR INSERT TO "authenticated" USING (
        EXISTS (
          SELECT 1
          FROM "ClassEnrollment" ce
          JOIN "User" u ON ce."userId" = u.id
          JOIN "Assignment" a ON ce."classId" = a."classId"
          WHERE a.id = "Grade"."assignmentId"
            AND u."auth0UserId" = auth.user_id()
            AND u."role" = 'PROFESSOR'
        )
      );--> statement-breakpoint
CREATE POLICY "grade_update_policy" ON "Grade" AS PERMISSIVE FOR UPDATE TO "authenticated" USING (
        EXISTS (
          SELECT 1
          FROM "ClassEnrollment" ce
          JOIN "User" u ON ce."userId" = u.id
          JOIN "Assignment" a ON ce."classId" = a."classId"
          WHERE a.id = "Grade"."assignmentId"
            AND u."auth0UserId" = auth.user_id()
            AND u."role" = 'PROFESSOR'
        )
      );--> statement-breakpoint
CREATE POLICY "grade_delete_policy" ON "Grade" AS PERMISSIVE FOR DELETE TO "authenticated" USING (
        EXISTS (
          SELECT 1
          FROM "ClassEnrollment" ce
          JOIN "User" u ON ce."userId" = u.id
          JOIN "Assignment" a ON ce."classId" = a."classId"
          WHERE a.id = "Grade"."assignmentId"
            AND u."auth0UserId" = auth.user_id()
            AND u."role" = 'PROFESSOR'
        )
      );--> statement-breakpoint
CREATE POLICY "resource_select_policy" ON "Resource" AS PERMISSIVE FOR SELECT TO "authenticated" USING (
        EXISTS (
          SELECT 1
          FROM "ClassEnrollment" ce
          JOIN "User" u ON ce."userId" = u.id
          WHERE ce."classId" = "Resource".classId
            AND u."auth0UserId" = auth.user_id()
        )
      );--> statement-breakpoint
CREATE POLICY "resource_insert_policy" ON "Resource" AS PERMISSIVE FOR INSERT TO "authenticated" USING (
        EXISTS (
          SELECT 1
          FROM "ClassEnrollment" ce
          JOIN "User" u ON ce."userId" = u.id
          WHERE ce."classId" = "Resource".classId
            AND u."auth0UserId" = auth.user_id()
            AND u."role" = 'PROFESSOR'
        )
      );--> statement-breakpoint
CREATE POLICY "resource_update_policy" ON "Resource" AS PERMISSIVE FOR UPDATE TO "authenticated" USING (
        EXISTS (
          SELECT 1
          FROM "ClassEnrollment" ce
          JOIN "User" u ON ce."userId" = u.id
          WHERE ce."classId" = "Resource".classId
            AND u."auth0UserId" = auth.user_id()
            AND u."role" = 'PROFESSOR'
        )
      );--> statement-breakpoint
CREATE POLICY "resource_delete_policy" ON "Resource" AS PERMISSIVE FOR DELETE TO "authenticated" USING (
        EXISTS (
          SELECT 1
          FROM "ClassEnrollment" ce
          JOIN "User" u ON ce."userId" = u.id
          WHERE ce."classId" = "Resource".classId
            AND u."auth0UserId" = auth.user_id()
            AND u."role" = 'PROFESSOR'
        )
      );