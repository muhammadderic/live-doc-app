"use client";

import { ReactNode } from "react";
import {
  LiveblocksProvider,
  ClientSideSuspense,
} from "@liveblocks/react/suspense";

export function Provider({ children }: { children: ReactNode }) {
  return (
    <LiveblocksProvider 
      authEndpoint="/api/liveblocks-auth"
    >
      <ClientSideSuspense fallback={<div>Loading…</div>}>
        {children}
      </ClientSideSuspense>
    </LiveblocksProvider>
  );
}