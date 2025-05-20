"use server";

import { nanoid } from 'nanoid'
import { revalidatePath } from 'next/cache';
import { Liveblocks } from "@liveblocks/node";

import { parseStringify } from '../utils';

const liveblocks = new Liveblocks({
  secret: process.env.LIVEBLOCKS_SECRET_KEY!,
});


// CREATE DOCUMENT
export const createDocument = async ({ userId, email }: CreateDocumentParams) => {
  const roomId = nanoid();

  try {
    const metadata = {
      creatorId: userId,
      email,
      title: 'Untitled'
    }

    const usersAccesses: RoomAccesses = {
      [email]: ['room:write']
    }

    const room = await liveblocks.createRoom(roomId, {
      metadata,
      usersAccesses,
      defaultAccesses: ['room:write'] // Temporary for checking if testing user can access the document
    });
    
    revalidatePath('/');

    return parseStringify(room);
  } catch (error) {
    console.log(`Error happened while creating a room: ${error}`);
  }
}
