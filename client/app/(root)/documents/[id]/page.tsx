import { 
  Show, 
  SignInButton, 
  SignUpButton, 
  UserButton 
} from "@clerk/nextjs";

import { Editor } from "@/components/editor/Editor";
import Header from "@/components/Header";

const Documents = () => {
  return (
    <div>
      <Header className="sticky left-0 top-0">
        <div className="flex items-center gap-2 lg:gap-4">
          {/* TODO: Add notification comp */}

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

      <Editor />
    </div>
  )
}

export default Documents;