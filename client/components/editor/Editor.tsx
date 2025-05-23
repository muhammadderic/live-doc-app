'use client';

import Theme from './plugins/Theme';
import ToolbarPlugin from './plugins/ToolbarPlugin';
import { HeadingNode } from '@lexical/rich-text';
import { AutoFocusPlugin } from '@lexical/react/LexicalAutoFocusPlugin';
import { LexicalComposer } from '@lexical/react/LexicalComposer';
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin';
import { LexicalErrorBoundary } from '@lexical/react/LexicalErrorBoundary';

import { useThreads } from '@liveblocks/react';
import { 
  FloatingComposer, 
  FloatingThreads, 
  liveblocksConfig, 
  LiveblocksPlugin, 
  useIsEditorReady
} from '@liveblocks/react-lexical'

import { DeleteModal } from '../DeleteModal';
import FloatingToolbarPlugin from './plugins/FloatingToolbarPlugin';
import Comments from '../Comments';

// Catch any errors that occur during Lexical updates and log them
// or throw them as needed. If you don't throw them, Lexical will
// try to recover gracefully without losing user data.

function Placeholder() {
  return <div className="editor-placeholder">Enter some rich text...</div>;
}

export function Editor({ 
  roomId, 
  currentUserType 
}: { 
  roomId: string, 
  currentUserType: UserType 
}) {
  const isReady = useIsEditorReady();
  const { threads } = useThreads();

  const initialConfig = liveblocksConfig({
    namespace: 'Editor',
    nodes: [HeadingNode],
    onError: (error: Error) => {
      console.error(error);
      throw error;
    },
    theme: Theme,
    editable: currentUserType === 'editor',
  });

  return (
    <LexicalComposer initialConfig={initialConfig}>
      <div className="editor-container size-full">
        <div className="toolbar-wrapper flex min-w-full justify-between">
          <ToolbarPlugin />
          {currentUserType === 'editor' && <DeleteModal roomId={roomId} />}
        </div>

        <div className="h-[calc(100vh-140px)] gap-5 overflow-auto lg:flex-row lg:items-start lg:justify-center xl:gap-10 xl:pt-10 scrollbar-thin scrollbar-track-[#09090a] scrollbar-thumb-[#2e3d5b] hover:scrollbar-thumb-[#7878a3] flex mx-auto items-center gap-4">
          {!isReady ? (
            <div>loading</div>
          ) : (
            <div className="editor-inner min-h-[1100px] relative mb-5 h-fit w-full max-w-[800px] shadow-md lg:mb-10">
              <RichTextPlugin
                contentEditable={
                  <ContentEditable className="editor-input h-full" />
                }
                placeholder={<Placeholder />}
                ErrorBoundary={LexicalErrorBoundary}
              />
              {currentUserType === 'editor' && <FloatingToolbarPlugin />}
              <HistoryPlugin />
              <AutoFocusPlugin />
            </div>
          )}

          <LiveblocksPlugin>
            <FloatingComposer className="w-[350px]" />
            <FloatingThreads threads={threads ?? []} />
            <Comments />
          </LiveblocksPlugin>
        </div>
      </div>
    </LexicalComposer>
  );
}
