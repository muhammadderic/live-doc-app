import { NextResponse } from "next/server";
import { currentUser } from "@clerk/nextjs/server";
import { Liveblocks } from "@liveblocks/node";

import { getUserColor } from "@/lib/utils";

const liveblocks = new Liveblocks({
  secret: process.env.LIVEBLOCKS_SECRET_KEY!,
});

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function POST(request: Request) {
  const clerkUser = await currentUser();

  // Return 401 JSON/HTTP error if unauthenticated (do NOT use redirect)
  if (!clerkUser) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  const { id, firstName, lastName, emailAddresses, imageUrl } = clerkUser;

  // Get the current user from your database
  const user = {
    id,
    info: {
      id,
      name: `${firstName} ${lastName}`,
      email: emailAddresses[0].emailAddress,
      avatar: imageUrl,
      color: getUserColor(id),
    }
  }

  // Identify the user and return the result
  const userGroupIds: string[] = []; 

  const { status, body } = await liveblocks.identifyUser(
    {
      userId: user.id,
      groupIds: userGroupIds,
    },
    { userInfo: user.info }
  );

  return new Response(body, { status });
}