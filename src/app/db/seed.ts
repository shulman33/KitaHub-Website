import { drizzle } from "drizzle-orm/node-postgres";
import { reset } from "drizzle-seed";
import * as schema from "./schema";
import { faker } from "@faker-js/faker";
import { config } from "dotenv";

config({ path: ".env.local" });

async function getAuth0Token(): Promise<string> {
  const response = await fetch(
    `${process.env.AUTH0_ISSUER_BASE_URL}/oauth/token`,
    {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        client_id: process.env.M2M_CLIENT_ID,
        client_secret:
          process.env.M2M_CLIENT_SECRET,
        audience: `${process.env.AUTH0_ISSUER_BASE_URL}/api/v2/`,
        grant_type: "client_credentials",
      }),
    }
  );

  const data = await response.json();
  if (!data.access_token) {
    throw new Error("Failed to obtain Auth0 Management API token");
  }
  return data.access_token;
}

async function deleteAuth0Users(token: string) {
  const response = await fetch(
    `${process.env.AUTH0_ISSUER_BASE_URL}/api/v2/users`,
    {
      method: "GET",
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${token}`,
      },
    }
  );

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Failed to fetch Auth0 users: ${errorText}`);
  }

  const users = await response.json();
  for (const user of users) {
    await fetch(
      `${process.env.AUTH0_ISSUER_BASE_URL}/api/v2/users/${user.user_id}`,
      {
        method: "DELETE",
        headers: {
          "content-type": "application/json",
          authorization: `Bearer ${token}`,
        },
      }
    );
  }
}

async function createAuth0Users(count: number, token: string) {
  const users = [];

  for (let i = 0; i < count; i++) {
    const givenName = faker.person.firstName();
    const familyName = faker.person.lastName();
    const email = faker.internet.email({
      firstName: givenName,
      lastName: familyName,
    });
    const nickname = `${givenName.toLowerCase()}_${faker.number.int({
      min: 1000,
      max: 9999,
    })}`;
    const picture = faker.image.avatar();

    const response = await fetch(
      `${process.env.AUTH0_ISSUER_BASE_URL}/api/v2/users`,
      {
        method: "POST",
        headers: {
          "content-type": "application/json",
          authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          email: email,
          password: "Password123!",
          connection: "Username-Password-Authentication",
          given_name: givenName,
          family_name: familyName,
          name: `${givenName} ${familyName}`,
          nickname: nickname,
          picture: picture,
          verify_email: true,
          email_verified: false,
        }),
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Failed to create Auth0 user: ${errorText}`);
    }

    const userData = await response.json();
    users.push({
      email: userData.email,
      auth0UserId: userData.user_id,
      given_name: userData.given_name,
      family_name: userData.family_name,
      name: userData.name,
      nickname: userData.nickname,
      picture: userData.picture,
    });

    await new Promise((resolve) => setTimeout(resolve, 500));
  }

  return users;
}

// Initialize Drizzle
const db = drizzle(process.env.DATABASE_URL!);

/**
 * Helper functions
 */
const roleValues = ["STUDENT", "PROFESSOR"] as const;
const resourceTypeValues = ["SLIDE_DECK", "ARTICLE", "VIDEO", "OTHER"] as const;
const genderValues = ["MALE", "FEMALE", "OTHER"] as const;
const semesterValues = ["FALL", "WINTER", "SPRING", "SUMMER"] as const;
function randomEnum<T extends string>(arr: readonly T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function randomYear(): number {
  const currentYear = new Date().getFullYear();
  return currentYear;
}

function randomScore(): number {
  return parseFloat((Math.random() * 100).toFixed(2));
}

async function main() {
  const token = await getAuth0Token();
  // reset Auth0 users
  await deleteAuth0Users(token);
  // reset database
  await reset(db, schema);

  const auth0Users = await createAuth0Users(20, token);

  const universityInserts = [];
  for (let i = 0; i < 3; i++) {
    universityInserts.push({
      name: faker.company.name() + " University",
      country: faker.location.country(),
      alphaTwoCode: faker.location.countryCode("alpha-2"),
      state: faker.location.state(),
    });
  }

  const insertedUniversities = await db
    .insert(schema.university)
    .values(universityInserts)
    .returning();
  console.log("seeded universities");
  const universityIds = insertedUniversities.map((u) => u.id);

  const userInserts = auth0Users.map((auth0User) => ({
    auth0UserId: auth0User.auth0UserId,
    universityId:
      universityIds[Math.floor(Math.random() * universityIds.length)],
    firstName: auth0User.given_name,
    lastName: auth0User.family_name,
    bio: faker.person.bio(),
    role: randomEnum(roleValues),
    prefix: faker.person.prefix(),
    profilePicture: auth0User.picture,
    phoneNumber: faker.phone.number(),
    email: auth0User.email,
    schoolEmail: auth0User.email,
    gender: randomEnum(genderValues),
    dataSharingOptIn: faker.datatype.boolean(),
  }));

  const insertedUsers = await db
    .insert(schema.user)
    .values(userInserts)
    .returning();
  console.log("seeded users");
  const userIds = insertedUsers.map((u) => u.id);

  const classInserts = [];
  for (let i = 0; i < 5; i++) {
    classInserts.push({
      universityId:
        universityIds[Math.floor(Math.random() * universityIds.length)],
      className: faker.company.buzzNoun() + " Studies",
      description: faker.lorem.sentence(),
      code: faker.number.int({ min: 100, max: 999 }),
      semester: randomEnum(semesterValues),
      year: randomYear(),
      isActive: true,
    });
  }

  const insertedClasses = await db
    .insert(schema.classTable)
    .values(classInserts)
    .returning();
  console.log("seeded classes");
  const classIds = insertedClasses.map((c) => c.id);

  const classEnrollmentInserts = [];
  for (const userId of userIds) {
    classEnrollmentInserts.push({
      userId,
      classId: classIds[Math.floor(Math.random() * classIds.length)],
      role: "STUDENT" as const,
    });
  }

  await db.insert(schema.classEnrollment).values(classEnrollmentInserts);
  console.log("seeded classEnrollment");

  const assignmentInserts = [];
  for (let i = 0; i < 10; i++) {
    assignmentInserts.push({
      classId: classIds[Math.floor(Math.random() * classIds.length)],
      title: faker.lorem.words(3),
      description: faker.lorem.sentence(),
      dueDate: faker.date.future(),
      totalPoints: 100,
      isUploaded: faker.datatype.boolean(),
      url: faker.internet.url(),
      isGraded: faker.datatype.boolean(),
      isPublished: faker.datatype.boolean(),
    });
  }

  const insertedAssignments = await db
    .insert(schema.assignment)
    .values(assignmentInserts)
    .returning();
  console.log("seeded assignments");
  const assignmentIds = insertedAssignments.map((a) => a.id);

  const gradeInserts = [];
  for (let i = 0; i < 20; i++) {
    gradeInserts.push({
      assignmentId:
        assignmentIds[Math.floor(Math.random() * assignmentIds.length)],
      studentId: userIds[Math.floor(Math.random() * userIds.length)],
      score: randomScore(),
      feedback: faker.lorem.sentence(),
    });
  }

  await db.insert(schema.grade).values(gradeInserts);
  console.log("seeded grades");

  const resourceInserts = [];
  for (let i = 0; i < 15; i++) {
    resourceInserts.push({
      classId: classIds[Math.floor(Math.random() * classIds.length)],
      assignmentId:
        Math.random() > 0.5
          ? assignmentIds[Math.floor(Math.random() * assignmentIds.length)]
          : null,
      userId: userIds[Math.floor(Math.random() * userIds.length)],
      title: faker.lorem.words(2),
      type: randomEnum(resourceTypeValues),
      url: faker.internet.url(),
    });
  }

  const insertedResources = await db
    .insert(schema.resource)
    .values(resourceInserts)
    .returning();
  console.log("seeded resources");
  const resourceIds = insertedResources.map((r) => r.id);

  const announcementInserts = [];
  for (let i = 0; i < 5; i++) {
    announcementInserts.push({
      classId: classIds[Math.floor(Math.random() * classIds.length)],
      userId: userIds[Math.floor(Math.random() * userIds.length)],
      title: faker.lorem.words(3),
      content: faker.lorem.paragraph(),
    });
  }

  await db.insert(schema.announcement).values(announcementInserts);
  console.log("seeded announcements");

  const messageInserts = [];
  for (let i = 0; i < 10; i++) {
    messageInserts.push({
      classId: classIds[Math.floor(Math.random() * classIds.length)],
      userId: userIds[Math.floor(Math.random() * userIds.length)],
      parentMessageId: null,
      title: faker.lorem.words(2),
      content: faker.lorem.sentence(),
    });
  }

  const insertedMessages = await db
    .insert(schema.message)
    .values(messageInserts)
    .returning();
  console.log("seeded messages");
  const messageIds = insertedMessages.map((m) => m.id);

  // 10. Insert Tags
  const tagInserts = [];
  for (let i = 0; i < 10; i++) {
    tagInserts.push({
      name: faker.word.noun(),
    });
  }

  const insertedTags = await db
    .insert(schema.tag)
    .values(tagInserts)
    .returning();
  console.log("seeded tags");
  const tagIds = insertedTags.map((t) => t.id);

  // 11. Insert MessageTags
  const messageTagsPairs = new Set<string>();
  const messageTagsInserts = [];

  for (let i = 0; i < 20; i++) {
    let pair: string;
    let chosenMessageId: string;
    let chosenTagId: string;

    do {
      chosenMessageId =
        messageIds[Math.floor(Math.random() * messageIds.length)];
      chosenTagId = tagIds[Math.floor(Math.random() * tagIds.length)];
      pair = `${chosenMessageId}-${chosenTagId}`;
    } while (messageTagsPairs.has(pair));

    messageTagsPairs.add(pair);

    messageTagsInserts.push({
      messageId: chosenMessageId,
      tagId: chosenTagId,
    });
  }

  await db.insert(schema.messageTags).values(messageTagsInserts);
  console.log("seeded messageTags");

  // 12. Insert ResourceTags
  const resourceTagsPairs = new Set<string>();
  const resourceTagsInserts = [];

  for (let i = 0; i < 20; i++) {
    let pair: string;
    let chosenResourceId: string;
    let chosenTagId: string;

    do {
      chosenResourceId =
        resourceIds[Math.floor(Math.random() * resourceIds.length)];
      chosenTagId = tagIds[Math.floor(Math.random() * tagIds.length)];
      pair = `${chosenResourceId}-${chosenTagId}`;
    } while (resourceTagsPairs.has(pair));

    resourceTagsPairs.add(pair);

    resourceTagsInserts.push({
      resourceId: chosenResourceId,
      tagId: chosenTagId,
    });
  }

  await db.insert(schema.resourceTags).values(resourceTagsInserts);

  console.log("seeded resourceTags");

  console.log("Seeding completed successfully!");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("Error during seeding:", error);
    process.exit(1);
  });
