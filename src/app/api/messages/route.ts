import { NextResponse } from "next/server";
import { pusherServer } from "@/app/(kita)/lib/pusher";
import { getSession, withApiAuthRequired } from "@auth0/nextjs-auth0";
import { MessageRepository } from "@/app/(kita)/repositories/MessageRepository";

export const POST = withApiAuthRequired(async function POST(req: Request) {
  const messageRepo = new MessageRepository();
  const session = await getSession();
  if (!session || !session.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { user } = session;
  console.log("User:", user);

  const { classId, content, title, parentMessageId, tags } = await req.json();
  const userId = user.sub; // Adjust based on how Auth0 provides the user ID
  console.log("User ID:", userId);

  // Construct the data object for `createMessage`
  const data = {
    content,
    title,
    user: { connect: { id: userId } },
    class: { connect: { id: classId } },
    parentMessage: parentMessageId
      ? { connect: { id: parentMessageId } }
      : undefined,
    tags: tags
      ? { connect: tags.map((tagId: string) => ({ id: tagId })) }
      : undefined,
  };

  try {
    const message = await messageRepo.createMessage(data);

    const channelName = `private-class-${classId}`;
    await pusherServer.trigger(channelName, "new-message", message);

    return NextResponse.json(message);
  } catch (error) {
    console.error("Error creating message:", error);
    return NextResponse.json(
      { error: "Error creating message" },
      { status: 500 }
    );
  }
});
