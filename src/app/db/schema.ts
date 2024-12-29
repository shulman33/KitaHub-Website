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
    enrollmentCode: varchar({ length: 6 }),
    code: integer(),
    courseCode: varchar({ length: 255 }),
    semester: semesterEnum().notNull(),
    year: integer().notNull(),
    isActive: boolean().default(true).notNull(),
  },
)

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

    uniqueIndex("class_enrollment_user_class_unique").on(
      table.userId,
      table.classId
    ),
  ]
)

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
  }
)

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
)

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
  
)

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
)

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
    foreignKey({
      columns: [table.parentMessageId],
      foreignColumns: [table.id],
      name: "parentMessageId",
    }),
  ]
)

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
