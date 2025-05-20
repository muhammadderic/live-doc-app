import { Editor } from "@/components/editor/Editor";
import Header from "@/components/Header";

const Documents = () => {
  return (
    <div>
      <Header className="sticky left-0 top-0">
        <div className="flex items-center gap-2 lg:gap-4">
          {/* TODO: Add notification comp */}
          {/* TODO: Add sign-in comp */}
        </div>
      </Header>

      <Editor />
    </div>
  )
}

export default Documents;