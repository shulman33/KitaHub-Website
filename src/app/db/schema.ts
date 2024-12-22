import {
  pgTable,
  pgEnum,
  uuid,
  varchar,
  integer,
  boolean,
  timestamp,
  doublePrecision,
  uniqueIndex,
  primaryKey,
  foreignKey,
  pgPolicy,
  pgRole,
} from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";

export const authenticatedRole = pgRole("authenticated").existing();
export const anonymousRole = pgRole("anonymous").existing();

// Enums
export const genderEnum = pgEnum("gender", ["MALE", "FEMALE", "OTHER"]);
export const resourceTypeEnum = pgEnum("resource_type", [
  "SLIDE_DECK",
  "ARTICLE",
  "VIDEO",
  "OTHER",
]);
export const roleEnum = pgEnum("role", ["STUDENT", "PROFESSOR"]);


export const semesterEnum = pgEnum("semester", [
  "FALL",
  "WINTER",
  "SPRING",
  "SUMMER",
]);

// University Table
export const university = pgTable(
  "university",
  {
    id: uuid().primaryKey().defaultRandom(),
    name: varchar({ length: 255 }).notNull(),
    country: varchar({ length: 255 }).notNull(),
    alphaTwoCode: varchar({ length: 2 }).notNull(),
    state: varchar({ length: 255 }),
  },
  (table) => {
    return {
      nameUnique: uniqueIndex().on(table.name),
    };
  }
);

// helper functions
const currentUserId = sql`
  (
    SELECT u.id
    FROM "user" u
    WHERE u."auth0UserId" = auth.user_id()
  )
`;

const currentUserRole = sql`
  (
    SELECT u.role
    FROM "user" u
    WHERE u."auth0UserId" = auth.user_id()
  )
`;

const isEnrolledInClass = (classIdColumn: string) => sql`
  EXISTS (
    SELECT 1
    FROM "class_enrollment" ce
    WHERE ce."classId" = ${classIdColumn}
      AND ce."userId" = ${currentUserId}
  )
`;

// User Table
export const user = pgTable(
  "user",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    auth0UserId: varchar({ length: 255 }).notNull(),
    universityId: uuid()
      .notNull()
      .references(() => university.id),
    firstName: varchar({ length: 255 }).notNull(),
    lastName: varchar({ length: 255 }).notNull(),
    bio: varchar({ length: 255 }),
    role: roleEnum().notNull(),
    prefix: varchar({ length: 255 }),
    profilePicture: varchar({ length: 255 }),
    phoneNumber: varchar({ length: 255 }),
    email: varchar({ length: 255 }),
    schoolEmail: varchar({ length: 255 }).notNull(),
    gender: genderEnum('gender'),
    createdAt: timestamp().defaultNow().notNull(),
    updatedAt: timestamp().defaultNow().notNull(),
    dataSharingOptIn: boolean().default(false).notNull(),
  },
  (table) => [
    pgPolicy("user_select_policy", {
      as: "permissive",
      to: "authenticated",
      for: "select",
      using: sql`
        select "user".id = ${currentUserId}
      `,
      withCheck: sql``,
    }),

    pgPolicy("user_update_policy", {
      as: "permissive",
      to: "authenticated",
      for: "update",
      using: sql`
        select "user".id = ${currentUserId}
      `,
      withCheck: sql`
        select "user".id = ${currentUserId}
      `,
    }),
    

    uniqueIndex("user_phone_number_unique").on(table.phoneNumber),
    uniqueIndex("user_email_unique").on(table.email),
    uniqueIndex("user_school_email_unique").on(table.schoolEmail),
  ]
);

// Class Table
export const classTable = pgTable(
  "class",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    universityId: uuid()
      .notNull()
      .references(() => university.id),
    className: varchar({ length: 255 }).notNull(),
    description: varchar({ length: 255 }),
    enrollmentCode: varchar({ length: 6 }).notNull(),
    code: integer().notNull(),
    semester: semesterEnum().notNull(),
    year: integer().notNull(),
    isActive: boolean().default(true).notNull(),
  },
  (table) => [
    pgPolicy("class_select_policy", {
      as: "permissive",
      to: "authenticated",
      for: "select",
      using: isEnrolledInClass(`"class".id`),
    }),

    pgPolicy("class_insert_policy", {
      as: "permissive",
      to: "authenticated",
      for: "insert",
      using: sql`
        ${currentUserRole} = 'PROFESSOR'
      `,
      withCheck: sql`${currentUserRole} = 'PROFESSOR'`,
    }),

    pgPolicy("class_update_policy", {
      as: "permissive",
      to: "authenticated",
      for: "update",
      using: sql`
        ${currentUserRole} = 'PROFESSOR'
      `,
      withCheck: sql`${currentUserRole} = 'PROFESSOR'`,
    }),

    pgPolicy("class_delete_policy", {
      as: "permissive",
      to: "authenticated",
      for: "delete",
      using: sql`
        ${currentUserRole} = 'PROFESSOR'
      `,
    }),
  ]
).enableRLS();

// ClassEnrollment Table (Join Table)
export const classEnrollment = pgTable(
  "class_enrollment",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    userId: uuid()
      .notNull()
      .references(() => user.id),
    classId: uuid()
      .notNull()
      .references(() => classTable.id),
    role: roleEnum().notNull(),
  },
  (table) => [
    pgPolicy("classEnrollment_select_policy", {
      as: "permissive",
      to: "authenticated",
      for: "select",
      using: sql`
        "class_enrollment"."userId" = ${currentUserId}
      `,
    }),

    pgPolicy("classEnrollment_insert_policy", {
      as: "permissive",
      to: "authenticated",
      for: "insert",
      using: sql`
        "class_enrollment"."userId" = ${currentUserId}
      `,
      withCheck: sql`"class_enrollment"."userId" = ${currentUserId}`,
    }),

    pgPolicy("classEnrollment_update_policy", {
      as: "permissive",
      to: "authenticated",
      for: "update",
      using: sql`
        "class_enrollment"."userId" = ${currentUserId}
      `,
      withCheck: sql`"class_enrollment"."userId" = ${currentUserId}`,
    }),

    pgPolicy("classEnrollment_delete_policy", {
      as: "permissive",
      to: "authenticated",
      for: "delete",
      using: sql`
        "class_enrollment"."userId" = ${currentUserId}
      `,
    }),

    uniqueIndex("class_enrollment_user_class_unique").on(
      table.userId,
      table.classId
    ),
  ]
).enableRLS();

// Assignment Table
export const assignment = pgTable(
  "assignment",
  {
    id: uuid().primaryKey().defaultRandom(),
    classId: uuid()
      .notNull()
      .references(() => classTable.id),
    title: varchar({ length: 255 }).notNull(),
    description: varchar({ length: 255 }),
    dueDate: timestamp().notNull(),
    totalPoints: doublePrecision().notNull(),
    isUploaded: boolean().default(false).notNull(),
    url: varchar({ length: 255 }),
    isGraded: boolean().default(false).notNull(),
    isPublished: boolean().default(false).notNull(),
  },
  (table) => [
    pgPolicy("assignment_select_policy", {
      as: "permissive",
      to: "authenticated",
      for: "select",
      using: isEnrolledInClass(`"assignment"."classId"`),
      withCheck: sql``,
    }),
    pgPolicy("assignment_insert_policy", {
      as: "permissive",
      to: "authenticated",
      for: "insert",
      using: sql`
        ${currentUserRole} = 'PROFESSOR' AND
        ${isEnrolledInClass(`"assignment"."classId"`)}
      `,
      withCheck: sql``,
    }),
    pgPolicy("assignment_update_policy", {
      as: "permissive",
      to: "authenticated",
      for: "update",
      using: sql`
        ${currentUserRole} = 'PROFESSOR' AND
        ${isEnrolledInClass(`"assignment"."classId"`)}
      `,
      withCheck: sql``,
    }),
    pgPolicy("assignment_delete_policy", {
      as: "permissive",
      to: "authenticated",
      for: "delete",
      using: sql`
        ${currentUserRole} = 'PROFESSOR' AND
        ${isEnrolledInClass(`"assignment"."classId"`)}
      `,
      withCheck: sql``,
    }),
  ]
).enableRLS();

// Grade Table
export const grade = pgTable(
  "grade",
  {
    id: uuid().primaryKey().defaultRandom(),
    assignmentId: uuid()
      .notNull()
      .references(() => assignment.id),
    studentId: uuid()
      .notNull()
      .references(() => user.id),
    score: doublePrecision().notNull(),
    gradedAt: timestamp().defaultNow().notNull(),
    feedback: varchar({ length: 255 }),
  },
  (t) => [
    pgPolicy("grade_select_policy", {
      as: "permissive",
      to: "authenticated",
      for: "select",
      using: sql`
        "Grade"."studentId" = ${currentUserId} AND
        EXISTS (
          SELECT 1
          FROM "assignment"
          WHERE "assignment".id = "grade"."assignmentId" AND
                ${isEnrolledInClass(`"assignment"."classId"`)}
        )
      `,
      withCheck: sql``,
    }),
    pgPolicy("grade_insert_policy", {
      as: "permissive",
      to: "authenticated",
      for: "insert",
      using: sql`
        ${currentUserRole} = 'PROFESSOR' AND
        EXISTS (
          SELECT 1
          FROM "assignment"
          WHERE "assignment".id = "grade"."assignmentId" AND
                ${isEnrolledInClass(`"assignment"."classId"`)}
        )
      `,
      withCheck: sql``,
    }),
    // Update Policy
    pgPolicy("grade_update_policy", {
      as: "permissive",
      to: "authenticated",
      for: "update",
      using: sql`
        ${currentUserRole} = 'PROFESSOR' AND
        EXISTS (
          SELECT 1
          FROM "assignment"
          WHERE "assignment".id = "grade"."assignmentId" AND
                ${isEnrolledInClass(`"assignment"."classId"`)}
        )
      `,
      withCheck: sql``,
    }),
    pgPolicy("grade_delete_policy", {
      as: "permissive",
      to: "authenticated",
      for: "delete",
      using: sql`
        ${currentUserRole} = 'PROFESSOR' AND
        EXISTS (
          SELECT 1
          FROM "assignment"
          WHERE "assignment".id = "grade"."assignmentId" AND
                ${isEnrolledInClass(`"assignment"."classId"`)}
        )
      `,
      withCheck: sql``,
    }),
  ]
).enableRLS();

// Resource Table
export const resource = pgTable(
  "resource",
  {
    id: uuid().primaryKey().defaultRandom(),
    classId: uuid().references(() => classTable.id),
    assignmentId: uuid().references(() => assignment.id),
    userId: uuid().references(() => user.id),
    title: varchar({ length: 255 }).notNull(),
    type: resourceTypeEnum().notNull(),
    url: varchar({ length: 255 }).notNull(),
    uploadedAt: timestamp().defaultNow().notNull(),
  },
  (t) => [
    pgPolicy("resource_select_policy", {
      as: "permissive",
      to: "authenticated",
      for: "select",
      using: sql`
        ${isEnrolledInClass(`"resource"."classId"`)}
      `,
      withCheck: sql``,
    }),
    pgPolicy("resource_insert_policy", {
      as: "permissive",
      to: "authenticated",
      for: "insert",
      using: sql`
        ${currentUserRole} = 'PROFESSOR' AND
        ${isEnrolledInClass(`"resource"."classId"`)}
      `,
      withCheck: sql`
        ${currentUserRole} = 'PROFESSOR' AND
        ${isEnrolledInClass(`"resource"."classId"`)}
      `,
    }),
    pgPolicy("resource_update_policy", {
      as: "permissive",
      to: "authenticated",
      for: "update",
      using: sql`
        ${currentUserRole} = 'PROFESSOR' AND
        ${isEnrolledInClass(`"resource"."classId"`)}
      `,
      withCheck: sql`
        ${currentUserRole} = 'PROFESSOR' AND
        ${isEnrolledInClass(`"resource"."classId"`)}
      `,
    }),
    pgPolicy("resource_delete_policy", {
      as: "permissive",
      to: "authenticated",
      for: "delete",
      using: sql`
        ${currentUserRole} = 'PROFESSOR' AND
        ${isEnrolledInClass(`"resource"."classId"`)}
      `,
      withCheck: sql`
        ${currentUserRole} = 'PROFESSOR' AND
        ${isEnrolledInClass(`"resource"."classId"`)}
      `,
    }),
  ]
).enableRLS();

export const announcement = pgTable(
  "announcement",
  {
    id: uuid().primaryKey().defaultRandom(),
    classId: uuid()
      .notNull()
      .references(() => classTable.id),
    userId: uuid()
      .notNull()
      .references(() => user.id),
    title: varchar({ length: 255 }).notNull(),
    content: varchar({ length: 255 }).notNull(),
    createdAt: timestamp().defaultNow().notNull(),
    updatedAt: timestamp().defaultNow().notNull(),
  },
  (t) => [
    pgPolicy("announcement_select_policy", {
      as: "permissive",
      to: "authenticated",
      for: "select",
      using: sql`
        ${isEnrolledInClass(`"announcement"."classId"`)}
      `,
      withCheck: sql``,
    }),
    pgPolicy("announcement_insert_policy", {
      as: "permissive",
      to: "authenticated",
      for: "insert",
      using: sql`
        "Announcement"."userId" = ${currentUserId} AND
        ${isEnrolledInClass(`"announcement"."classId"`)}
      `,
      withCheck: sql``,
    }),
    // Update Policy
    pgPolicy("announcement_update_policy", {
      as: "permissive",
      to: "authenticated",
      for: "update",
      using: sql`
        "Announcement"."userId" = ${currentUserId} AND
        ${isEnrolledInClass(`"announcement"."classId"`)}
      `,
      withCheck: sql``,
    }),
    // Delete Policy
    pgPolicy("announcement_delete_policy", {
      as: "permissive",
      to: "authenticated",
      for: "delete",
      using: sql`
        "Announcement"."userId" = ${currentUserId} AND
        ${isEnrolledInClass(`"announcement"."classId"`)}
      `,
      withCheck: sql``,
    }),
  ]
).enableRLS();

// Message Table
export const message = pgTable(
  "message",
  {
    id: uuid().primaryKey().defaultRandom(),
    classId: uuid()
      .notNull()
      .references(() => classTable.id),
    userId: uuid()
      .notNull()
      .references(() => user.id),
    parentMessageId: uuid(),
    title: varchar({ length: 255 }),
    content: varchar({ length: 255 }).notNull(),
    createdAt: timestamp().defaultNow().notNull(),
    updatedAt: timestamp().defaultNow().notNull(),
  },
  (table) => [
    pgPolicy("message_select_policy", {
      as: "permissive",
      to: "authenticated",
      for: "select",
      using: sql`
        ${isEnrolledInClass(`"message"."classId"`)}
      `,
      withCheck: sql``,
    }),
    pgPolicy("message_insert_policy", {
      as: "permissive",
      to: "authenticated",
      for: "insert",
      using: sql`
        "message"."userId" = ${currentUserId} AND
        ${isEnrolledInClass(`"message"."classId"`)}
      `,
      withCheck: sql``,
    }),
    pgPolicy("message_update_policy", {
      as: "permissive",
      to: "authenticated",
      for: "update",
      using: sql`
        "message"."userId" = ${currentUserId} AND
        ${isEnrolledInClass(`"message"."classId"`)}
      `,
      withCheck: sql``,
    }),
    pgPolicy("message_delete_policy", {
      as: "permissive",
      to: "authenticated",
      for: "delete",
      using: sql`
        "message"."userId" = ${currentUserId} AND
        ${isEnrolledInClass(`"message"."classId"`)}
      `,
      withCheck: sql``,
    }),
    foreignKey({
      columns: [table.parentMessageId],
      foreignColumns: [table.id],
      name: "parentMessageId",
    }),
  ]
).enableRLS();

// Tag Table
export const tag = pgTable(
  "tag",
  {
    id: uuid().primaryKey().defaultRandom(),
    name: varchar({ length: 255 }).notNull(),
  },
  (table) => {
    return {
      nameUnique: uniqueIndex("tag_name_unique").on(table.name),
    };
  }
);

// MessageTags Join Table (Many-to-Many between Message and Tag)
export const messageTags = pgTable(
  "message_tags",
  {
    messageId: uuid()
      .notNull()
      .references(() => message.id),
    tagId: uuid()
      .notNull()
      .references(() => tag.id),
  },
  (table) => [primaryKey(table.messageId, table.tagId)]
);

// ResourceTags Join Table (Many-to-Many between Resource and Tag)
export const resourceTags = pgTable(
  "resource_tags",
  {
    resourceId: uuid()
      .notNull()
      .references(() => resource.id),
    tagId: uuid()
      .notNull()
      .references(() => tag.id),
  },
  (table) => {
    return {
      pk: primaryKey(table.resourceId, table.tagId),
    };
  }
);

// Types
export type SelectUniversity = typeof university.$inferSelect;
export type InsertUniversity = typeof university.$inferInsert;
export type SelectUser = typeof user.$inferSelect;
export type InsertUser = typeof user.$inferInsert;
export type SelectClass = typeof classTable.$inferSelect;
export type InsertClass = typeof classTable.$inferInsert;
export type SelectClassEnrollment = typeof classEnrollment.$inferSelect;
export type InsertClassEnrollment = typeof classEnrollment.$inferInsert;
export type SelectAssignment = typeof assignment.$inferSelect;
export type InsertAssignment = typeof assignment.$inferInsert;
export type SelectGrade = typeof grade.$inferSelect;
export type InsertGrade = typeof grade.$inferInsert;
export type SelectResource = typeof resource.$inferSelect;
export type InsertResource = typeof resource.$inferInsert;
export type SelectAnnouncement = typeof announcement.$inferSelect;
export type InsertAnnouncement = typeof announcement.$inferInsert;
export type SelectMessage = typeof message.$inferSelect;
export type InsertMessage = typeof message.$inferInsert;
export type SelectTag = typeof tag.$inferSelect;
export type InsertTag = typeof tag.$inferInsert;
export type SelectMessageTags = typeof messageTags.$inferSelect;
export type InsertMessageTags = typeof messageTags.$inferInsert;
export type SelectResourceTags = typeof resourceTags.$inferSelect;
export type InsertResourceTags = typeof resourceTags.$inferInsert;
