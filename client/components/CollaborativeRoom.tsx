"use client";

import { 
  useEffect, 
  useRef, 
  useState 
} from "react";
import Image from "next/image";
import { ClientSideSuspense, RoomProvider } from "@liveblocks/react";
import { 
  Show, 
  SignInButton, 
  SignUpButton, 
  UserButton 
} from "@clerk/nextjs";

import { updateDocument } from "@/lib/actions/room.actions";
import Header from "@/components/Header";
import { Editor } from "./editor/Editor";
import { Input } from "./ui/input";
import ActiveCollaborators from "./ActiveCollaborators";
import ShareModal from "./ShareModal";

const CollaborativeRoom = ({ 
  roomId, 
  roomMetadata, 
  users, 
  currentUserType 
}: CollaborativeRoomProps) => {
  const [documentTitle, setDocumentTitle] = useState(roomMetadata.title);
  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const updateTitleHandler = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if(e.key === 'Enter') {
      setLoading(true);

      try {
        if(documentTitle !== roomMetadata.title) {
          const updatedDocument = await updateDocument(roomId, documentTitle);
          
          if(updatedDocument) {
            setEditing(false);
          }
        }
      } catch (error) {
        console.error(error);
      }

      setLoading(false);
    }
  }

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if(containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setEditing(false);
        updateDocument(roomId, documentTitle);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [roomId, documentTitle])

  useEffect(() => {
    if(editing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [editing])

  return (
    <RoomProvider id={roomId}>
      <ClientSideSuspense fallback={<div>Loading…</div>}>
        <div className="collaborative-room">
          {/* Header */}
          <Header>
            {/* Title and Edit Title Box */}
            <div ref={containerRef} className="flex w-fit items-center justify-center gap-2">
              {editing && !loading ? (
                <Input 
                  type="text"
                  value={documentTitle}
                  ref={inputRef}
                  placeholder="Enter title"
                  onChange={(e) => setDocumentTitle(e.target.value)}
                  onKeyDown={updateTitleHandler}
                  disabled={!editing}
                  className="document-title-input"
                />
              ) : (
                <>
                  <p className="document-title">{documentTitle}</p>
                </>
              )}

              {!editing && (
                <Image
                  src="/assets/icons/edit.svg"
                  alt="edit"
                  width={24}
                  height={24}
                  onClick={() => setEditing(true)}
                  className="pointer"
                  loading="eager"
                />
              )}

              {loading && <p className="text-sm text-gray-400">saving...</p>}
            </div>

            {/* Collaborators + User Management */}
            <div className="flex w-full flex-1 justify-end gap-2 sm:gap-3">
              <ActiveCollaborators />

              <ShareModal 
                roomId={roomId}
                collaborators={users}
                creatorId={roomMetadata.creatorId}
                currentUserType={currentUserType}
              />

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
          <Editor roomId={roomId} currentUserType={currentUserType} /> 
        </div>
      </ClientSideSuspense>
    </RoomProvider>
  )
}

export default CollaborativeRoom;