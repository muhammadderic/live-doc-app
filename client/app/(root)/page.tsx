import Image from "next/image";
import { redirect } from "next/navigation";
import { 
  Show,
  SignedIn, 
  SignInButton, 
  SignUpButton, 
  UserButton 
} from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs/server";

import Header from "@/components/Header";
import AddDocumentBtn from "@/components/AddDocumentBtn";

const Home = async () => {
  const clerkUser = await currentUser();
  if(!clerkUser) redirect('/sign-in');

  const documents = [];

  return (
    <main className="home-container">
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

      {documents.length > 0 ? (
        <div>
          
        </div>
      ) : (
        <div className="document-list-empty">
          <Image
            src="/assets/icons/doc.svg"
            alt="Document"
            width={40}
            height={40}
            className="mx-auto"
            loading="eager"
          />

          <AddDocumentBtn 
            userId={clerkUser.id}
            email={clerkUser.emailAddresses[0].emailAddress}
          />
        </div>
      )}
    </main>
  )
}

export default Home;