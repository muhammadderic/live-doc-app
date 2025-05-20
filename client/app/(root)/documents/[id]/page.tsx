import CollaborativeRoom from "@/components/CollaborativeRoom";

interface PageProps {
  params: Promise<{ id: string }>;
}

const Documents = async ({ params }: PageProps) => {
  const { id } = await params;
  
  return (
    <main className="flex w-full flex-col items-center">
      <CollaborativeRoom roomId={id}/>
    </main>
  )
}

export default Documents;