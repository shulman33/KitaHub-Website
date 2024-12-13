import { ResourceRepository } from "@/app/(kita)/repositories/ResourceRepository";
import prismaMock, {
  mockPrisma,
} from "../../src/app/(kita)/lib/testing/mockClient";
import { Resource, ResourceType } from "@prisma/client";

describe("ResourceRepository", () => {
  let repository: ResourceRepository;

  beforeAll(() => {
    repository = new ResourceRepository(prismaMock);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  const mockResources: Resource[] = [
    {
      id: "r1",
      classId: "class1",
      assignmentId: "a1",
      userId: "user1",
      title: "Resource 1",
      type: ResourceType.SLIDE_DECK, 
      url: "https://example.com/resource1",
      uploaedAt: new Date(),
    },
    {
      id: "r2",
      classId: "class1",
      assignmentId: null,
      userId: "user2",
      title: "Resource 2",
      type: ResourceType.VIDEO,
      url: "https://example.com/resource2",
      uploaedAt: new Date(),
    },
    {
      id: "r3",
      classId: "class2",
      assignmentId: "a2",
      userId: "user1",
      title: "Resource 3",
      type: ResourceType.ARTICLE,
      url: "https://example.com/resource3",
      uploaedAt: new Date(),
    },
  ];

  describe("getResourceById", () => {
    it("should return a resource when found", async () => {
      const mockResource = mockResources[0];
      mockPrisma.resource.findUnique.mockResolvedValue(mockResource);

      const result = await repository.getResourceById(mockResource.id);

      expect(mockPrisma.resource.findUnique).toHaveBeenCalledWith({
        where: { id: mockResource.id },
        include: {
          class: true,
          assignment: true,
          user: true,
          tags: true,
        },
      });
      expect(result).toEqual(mockResource);
    });

    it("should return null when resource is not found", async () => {
      mockPrisma.resource.findUnique.mockResolvedValue(null);

      const result = await repository.getResourceById("non-existent-id");

      expect(mockPrisma.resource.findUnique).toHaveBeenCalledWith({
        where: { id: "non-existent-id" },
        include: {
          class: true,
          assignment: true,
          user: true,
          tags: true,
        },
      });
      expect(result).toBeNull();
    });
  });

  describe("getResourcesByClassId", () => {
    it("should return resources for a specific class", async () => {
      const classResources = mockResources.filter(
        (res) => res.classId === "class1"
      );
      mockPrisma.resource.findMany.mockResolvedValue(classResources);

      const result = await repository.getResourcesByClassId("class1");

      expect(mockPrisma.resource.findMany).toHaveBeenCalledWith({
        where: { classId: "class1" },
        include: {
          assignment: true,
          user: true,
          tags: true,
        },
      });
      expect(result).toEqual(classResources);
    });
  });

  describe("createResource", () => {
    it("should create and return a new resource", async () => {
      const createData =  {
        title: "New Resource",
        type: ResourceType.SLIDE_DECK,
        url: "https://example.com/new-resource",
        class: { connect: { id: "class1" } },
        user: { connect: { id: "user1" } },
        assignment: { connect: { id: "a1" } },
      };

      const createdResource: Resource = {
        id: "r4",
        classId: "class1",
        assignmentId: "a1",
        userId: "user1",
        title: createData.title,
        type: createData.type,
        url: createData.url,
        uploaedAt: new Date(),
      };

      mockPrisma.resource.create.mockResolvedValue(createdResource);

      const result = await repository.createResource(createData);

      expect(mockPrisma.resource.create).toHaveBeenCalledWith({
        data: createData,
        include: {
          class: true,
          assignment: true,
          user: true,
          tags: true,
        },
      });
      expect(result).toEqual(createdResource);
    });
  });

});
