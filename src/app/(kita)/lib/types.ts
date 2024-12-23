import { SelectMessage, SelectClass, SelectAssignment } from "@/app/db/schema";

export interface University {
  name: string;
  domains: string[];
  web_pages: string[];
  country: string;
  alpha_two_code: string;
  "state-province": string | null;
}

export interface UniversityResult {
  name: string;
  country: string;
  alphaTwoCode: string;
  stateProvince: string | null;
}

export interface ExtendedClass {
  id: string;
  universityId: string;
  className: string;
  description: string | null;
  code: number;
  semester: string;
  year: number;
  isActive: boolean;
  enrollmentCode?: string;

  professorFirstName: string;
  professorLastName: string;
  professorProfilePicture: string | null;
  professorName: string;
}


export interface Course {
  id: number;
  name: string;
  logicalName: string;
  prof: string;
  description: string;
}

export interface CoursesWidgetProps {
  courses: ExtendedClass[];
}

export interface Message {
  id: number;
  author: string;
  course: string;
  time: string;
  summary: string;
  profilePic?: string;
}

export type ExtendedSelectMessage = SelectMessage & {
  userFirstName: string;
  userLastName: string;
  userProfilePicture: string | null;
  className: string;
  createdAtRelative: string;
};

export interface TimeUntilDeadline {
  days: number;
  hours: number;
  minutes: number;
}

export type ExtendedSelectAssignment = SelectAssignment & {
  className: string;
  timeToDeadlineObject: TimeUntilDeadline;
};

export interface ExtendedMessage {
  id: string;
  classId: string;
  userId: string;
  parentMessageId: string | null;
  title: string | null;
  content: string;
  createdAt: Date;
  updatedAt: Date;

  firstName: string;
  lastName: string;
  profilePicture: string | null;

  className: string;
}

export interface MessageWidgetProps {
  messages: ExtendedSelectMessage[];
}

export interface ExtendedInstructor {
  firstName: string;
  lastName: string;
  email: string | null;
  profilePicture: string | null;
  className: string;
}

export interface ExtendedStudent {
  firstName: string;
  lastName: string;
  email: string | null;
  profilePicture: string | null;
}



