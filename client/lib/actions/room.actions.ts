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

// GET DOCUMENT
export const getDocument = async ({ roomId, userId }: { roomId: string; userId: string }) => {
  try {
      const room = await liveblocks.getRoom(roomId);
    
      const hasAccess = Object.keys(room.usersAccesses).includes(userId);
    
      if(!hasAccess) {
        throw new Error('You do not have access to this document');
      }
    
      return parseStringify(room);
  } catch (error) {
    console.log(`Error happened while getting a room: ${error}`);
  }
}
