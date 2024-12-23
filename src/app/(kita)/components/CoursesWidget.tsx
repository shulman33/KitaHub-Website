"use client";

import React, { useState } from "react";
import EmptyState from "@/app/(marketing)/components/empty-state";
import { ExtendedClass } from "../lib/types";
import Link from "next/link";
import { createClass, getClassByEnrollmentCode } from "../server/actions/classActions";
import { createEnrollment } from "../server/actions/classEnrollmentActions";
import { db } from "@/app/db/drizzle";
import { classTable } from "@/app/db/schema";
import { eq } from "drizzle-orm";
import { getUserByAuthId } from "../server/actions/userActions";

interface Course {
  id: string;
  courseName: string;
  instructor: string;
  enrollmentCode?: string;
  isStudent: boolean;
}

interface CoursesWidgetProps {
  courses: ExtendedClass[];
  isStudent: boolean;
  auth0UserId: string;
}

const BlankPaperIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="mx-auto h-12 w-12 text-gray-400"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z"
      />
    </svg>
  );
};

const CourseCard: React.FC<Course> = ({
  courseName,
  instructor,
  id,
  enrollmentCode,
  isStudent,
}) => (
  <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
    <Link
      href={`/dashboard/${id}`}
      className="text-[16px] font-semibold text-gray-900 mb-2 block"
    >
      {`📚 ${courseName}`}
    </Link>
    <p className="text-sm text-gray-500">{`Prof. ${instructor}`}</p>
    {!isStudent && enrollmentCode && (
      <div className="mt-2 text-sm bg-gray-50 p-2 rounded">
        <span className="font-medium">Enrollment Code: </span>
        <span className="font-mono">{enrollmentCode}</span>
      </div>
    )}
  </div>
);

const semesterOptions = ["FALL", "SPRING", "SUMMER", "WINTER"] as const;
type Semester = (typeof semesterOptions)[number];

interface JoinClassData {
  enrollmentCode: string;

}

interface CreateClassData {
  className: string;
  description?: string;
  code: number;
  semester: Semester;
  year: number;
}

// Update Modal props to use a discriminated union
interface ModalBaseProps {
  isOpen: boolean;
  onClose: () => void;
  isStudent: boolean;
}

interface StudentModalProps extends ModalBaseProps {
  isStudent: true;
  onSubmit: (data: JoinClassData) => Promise<void>;
}

interface ProfessorModalProps extends ModalBaseProps {
  isStudent: false;
  onSubmit: (data: CreateClassData) => Promise<void>;
}

type ModalProps = StudentModalProps | ProfessorModalProps;

const Modal = ({ isOpen, onClose, isStudent, onSubmit }: ModalProps) => {
  const [formData, setFormData] = useState<CreateClassData>({
    className: "",
    description: "",
    code: 0,
    semester: "FALL",
    year: new Date().getFullYear(),
  });

  const [enrollmentCode, setEnrollmentCode] = useState("");

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted", { isStudent, enrollmentCode });

    if (isStudent) {
      (onSubmit as StudentModalProps["onSubmit"])({ enrollmentCode });
    } else {
      (onSubmit as ProfessorModalProps["onSubmit"])(formData);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "code" ? parseInt(value) || 0 : value,
    }));
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">
            {isStudent ? "Join a Course" : "Create a New Course"}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {isStudent ? (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Enrollment Code
              </label>
              <input
                type="text"
                value={enrollmentCode}
                onChange={(e) => setEnrollmentCode(e.target.value)}
                className="w-full p-2 border rounded-md"
                placeholder="Enter code"
                required
              />
            </div>
          ) : (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Course Name
                </label>
                <input
                  type="text"
                  name="className"
                  value={formData.className}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded-md"
                  placeholder="Enter course name"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Course Code
                </label>
                <input
                  type="number"
                  name="code"
                  value={formData.code}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded-md"
                  placeholder="Enter course code (e.g., 101)"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Semester
                  </label>
                  <select
                    name="semester"
                    value={formData.semester}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded-md"
                    required
                  >
                    {semesterOptions.map((sem) => (
                      <option key={sem} value={sem}>
                        {sem}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Year
                  </label>
                  <input
                    type="number"
                    name="year"
                    value={formData.year}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded-md"
                    min={new Date().getFullYear()}
                    max={new Date().getFullYear() + 1}
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description (Optional)
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded-md"
                  placeholder="Enter course description"
                  rows={3}
                />
              </div>
            </>
          )}
          <div className="flex justify-end gap-2 mt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm text-white bg-blue-600 rounded-md hover:bg-blue-700"
            >
              {isStudent ? "Join Course" : "Create Course"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const CoursesWidget: React.FC<CoursesWidgetProps> = ({
  courses,
  isStudent,
  auth0UserId,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCreateClass = async (data: CreateClassData) => {
    try {
      await createClass(data, auth0UserId);
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error creating class:", error);
    }
  };

  const handleJoinClass = async (data: JoinClassData) => {
    console.log("handleJoinClass called with:", data);
    try {
      const classResult = await getClassByEnrollmentCode(data.enrollmentCode);
      console.log("Class result:", classResult);

      if (!classResult) {
        throw new Error("Invalid enrollment code");
      }

      const user = await getUserByAuthId(auth0UserId);
      console.log("User result:", user);
      if (!user) {
        throw new Error("User not found");
      }

      const enrollmentData = {
        userId: user.id,
        classId: classResult.id,
        role: "STUDENT" as const,
      };

      await createEnrollment(enrollmentData);
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error joining class:", error);
      alert("Failed to join class: " + (error as Error).message);
      // You might want to show an error message to the user here
    }
  };

  return (
    <div className="bg-white max-w-full p-[16px] sm:p-[24px] rounded-[16px] max-h-[600px] overflow-y-auto">
      <div className="flex justify-between items-center mb-6">
        <p className="text-[16px] leading-[19.5px] font-bold">📚 My Courses</p>
        <button
          onClick={() => setIsModalOpen(true)}
          className="text-[14px] leading-[17px] text-[#74759A] font-semibold hover:text-blue-600"
        >
          {isStudent ? "Join a Course" : "Create Course"}
        </button>
      </div>

      {courses.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {courses.map((course) => (
            <CourseCard
              key={course.id}
              id={course.id}
              courseName={course.className}
              instructor={course.professorName}
              enrollmentCode={course.enrollmentCode}
              isStudent={isStudent}
            />
          ))}
        </div>
      ) : (
        <EmptyState
          icon={<BlankPaperIcon />}
          title="No Courses Available"
          text={
            isStudent
              ? "Get started by enrolling in a new course"
              : "Get started by creating your first course"
          }
          buttonText={isStudent ? "Join Course" : "Create Course"}
          // onClick={() => setIsModalOpen(true)}
        />
      )}

      {isStudent ? (
        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          isStudent={true}
          onSubmit={handleJoinClass}
        />
      ) : (
        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          isStudent={false}
          onSubmit={handleCreateClass}
        />
      )}
    </div>
  );
};

export default CoursesWidget;
