import PusherServer from "pusher";
import PusherClient from "pusher-js";

export const pusherServer = new PusherServer({
  appId: process.env.PUSHER_APP_ID!,
  key: process.env.NEXT_PUBLIC_PUSHER_KEY!,
  secret: process.env.PUSHER_SECRET!,
  cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER!,
  useTLS: true,
});

export const getChannelNames = {
  class: (classId: string) => `class-${classId}`,

  assignment: (assignmentId: string) => `assignment-${assignmentId}`,

  userNotifications: (userId: string) => `private-user-${userId}`,

  messageThread: (messageId: string) => `message-thread-${messageId}`,

  classDiscussion: (classId: string) => `class-discussion-${classId}`,
};

export const EVENT_TYPES = {
  // Class Events
  CLASS_ANNOUNCEMENT: "class-announcement",
  CLASS_RESOURCE_ADDED: "class-resource-added",
  CLASS_ASSIGNMENT_ADDED: "class-assignment-added",

  // Assignment Events
  ASSIGNMENT_UPDATED: "assignment-updated",
  GRADE_POSTED: "grade-posted",

  // Message Events
  NEW_MESSAGE: "new-message",
  MESSAGE_UPDATED: "message-updated",
  MESSAGE_DELETED: "message-deleted",

  // Resource Events
  RESOURCE_UPDATED: "resource-updated",

  // User Notifications
  NOTIFICATION: "notification",
} as const;

export const pusherClient = new PusherClient(process.env.NEXT_PUBLIC_PUSHER_KEY!, {
  cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER!,
});


// Example subscription functions
export const subscribeToClass = (classId: string, callbacks: {
  onAnnouncement?: (data: any) => void;
  onResourceAdded?: (data: any) => void;
  onAssignmentAdded?: (data: any) => void;
}) => {
  const channel = pusherClient.subscribe(getChannelNames.class(classId));
  
  if (callbacks.onAnnouncement) {
    channel.bind(EVENT_TYPES.CLASS_ANNOUNCEMENT, callbacks.onAnnouncement);
  }
  if (callbacks.onResourceAdded) {
    channel.bind(EVENT_TYPES.CLASS_RESOURCE_ADDED, callbacks.onResourceAdded);
  }
  if (callbacks.onAssignmentAdded) {
    channel.bind(EVENT_TYPES.CLASS_ASSIGNMENT_ADDED, callbacks.onAssignmentAdded);
  }
  
  return () => {
    channel.unbind_all();
    pusherClient.unsubscribe(getChannelNames.class(classId));
  };
};
