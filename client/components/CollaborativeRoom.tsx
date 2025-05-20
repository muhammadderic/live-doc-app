"use client";

import { ClientSideSuspense, RoomProvider } from "@liveblocks/react";
import { 
  Show, 
  SignInButton, 
  SignUpButton, 
  UserButton 
} from "@clerk/nextjs";

import Header from "@/components/Header";
import { Editor } from "./editor/Editor";

const CollaborativeRoom = ({ roomId }: CollaborativeRoomProps) => {
  return (
    <RoomProvider id={roomId}>
      <ClientSideSuspense fallback={<div>Loading…</div>}>
        <div className="collaborative-room">
          {/* Header */}
          <Header className="sticky left-0 top-0">
            <div className="flex items-center gap-2 lg:gap-4">
              <Show when="signed-out">
                <SignInButton />
                <SignUpButton>
                  <button className="bg-purple-700 text-white rounded-full font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 cursor-pointer">
                    Sign Up
                  </button>
                </SignUpButton>
              </Show>

              <Show when="signed-in">
                <UserButton />
              </Show>
            </div>
          </Header>

          {/* Editor */}
          <Editor /> 
        </div>
      </ClientSideSuspense>
    </RoomProvider>
  )
}

export default CollaborativeRoom;