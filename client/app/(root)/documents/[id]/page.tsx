import { redirect } from "next/navigation";
import { currentUser } from "@clerk/nextjs/server";

import CollaborativeRoom from "@/components/CollaborativeRoom";
import { getDocument } from "@/lib/actions/room.actions";
import { getClerkUsers } from "@/lib/actions/user.actions";

interface PageProps {
  params: Promise<{ id: string }>;
}

const Documents = async ({ params }: PageProps) => {
  const { id } = await params;

  const clerkUser = await currentUser();
  if(!clerkUser) redirect('/sign-in');

  const room = await getDocument({
    roomId: id,
    userId: clerkUser.emailAddresses[0].emailAddress,
  });

  if(!room) redirect('/');

  // TODO: Assess the permissions of the user to access the document.
  
  return (
    <main className="flex w-full flex-col items-center">
      <CollaborativeRoom 
        roomId={id}
        roomMetadata={room.metadata}
      />
    </main>
  )
}

export default Documents;