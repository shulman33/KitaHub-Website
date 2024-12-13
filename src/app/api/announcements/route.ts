import { NextResponse } from "next/server";
import { pusherServer } from "@/app/(kita)/lib/pusher";
import { getSession, withApiAuthRequired } from "@auth0/nextjs-auth0";
import { AnnouncementRepository } from "@/app/(kita)/repositories/AnnouncementRepository";

export const POST = withApiAuthRequired(async function POST(req: Request) {
  const announcementRepo = new AnnouncementRepository();
  const session = await getSession();
  if (!session || !session.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { user } = session;
  console.log("User:", user);

  const { classId, title, content } = await req.json();
  const userId = user.sub; // Adjust based on how Auth0 provides the user ID
  console.log("User ID:", userId);
  const role = user.role; // Adjust based on how Auth0 provides the user role


  const data = {
    title,
    content,
    user: { connect: { id: userId } },
    class: { connect: { id: classId } },
  };

  try {
    const announcement = await announcementRepo.createAnnouncement(data);

    const channelName = `private-class-${classId}`;
    await pusherServer.trigger(channelName, "new-announcement", announcement);

    return NextResponse.json(announcement);
  } catch (error) {
    console.error("Error creating message:", error);
    return NextResponse.json(
      { error: "Error creating announcement" },
      { status: 500 }
    );
  }
});
