import {
  useEditor,
  EditorContent,
} from "@tiptap/react";

import StarterKit from "@tiptap/starter-kit";

import {
  Bold,
  Italic,
  Heading1,
  Heading2,
  List,
  ListOrdered,
  Quote,
  Code2,
} from "lucide-react";

function Editor({
  content,
  setContent,
}) {
  const editor = useEditor({
    extensions: [
      StarterKit,
    ],

    content,

    onUpdate: ({ editor }) => {
      setContent(
        editor.getHTML()
      );
    },
  });

  if (!editor) return null;

  const buttonClass =
    "w-9 h-9 rounded-lg flex items-center justify-center hover:bg-[#EAEAEA] dark:hover:bg-[#2A2A2A] transition";

  return (
    <div
      className="
        mt-8
        border border-[#E5E5E5]
        dark:border-[#2B2B2B]
        rounded-2xl
        overflow-hidden
      "
    >

      {/* Toolbar */}
      <div
        className="
          border-b border-[#E5E5E5]
          dark:border-[#2B2B2B]
          p-3
          flex items-center gap-2
          flex-wrap
          bg-[#FAFAFA]
          dark:bg-[#202020]
        "
      >

        <button
          type="button"
          onClick={() =>
            editor
              .chain()
              .focus()
              .toggleBold()
              .run()
          }
          className={buttonClass}
        >
          <Bold size={17} />
        </button>

        <button
          type="button"
          onClick={() =>
            editor
              .chain()
              .focus()
              .toggleItalic()
              .run()
          }
          className={buttonClass}
        >
          <Italic size={17} />
        </button>

        <button
          type="button"
          onClick={() =>
            editor
              .chain()
              .focus()
              .toggleHeading({
                level: 1,
              })
              .run()
          }
          className={buttonClass}
        >
          <Heading1 size={17} />
        </button>

        <button
          type="button"
          onClick={() =>
            editor
              .chain()
              .focus()
              .toggleHeading({
                level: 2,
              })
              .run()
          }
          className={buttonClass}
        >
          <Heading2 size={17} />
        </button>

        <button
          type="button"
          onClick={() =>
            editor
              .chain()
              .focus()
              .toggleBulletList()
              .run()
          }
          className={buttonClass}
        >
          <List size={17} />
        </button>

        <button
          type="button"
          onClick={() =>
            editor
              .chain()
              .focus()
              .toggleOrderedList()
              .run()
          }
          className={buttonClass}
        >
          <ListOrdered size={17} />
        </button>

        <button
          type="button"
          onClick={() =>
            editor
              .chain()
              .focus()
              .toggleBlockquote()
              .run()
          }
          className={buttonClass}
        >
          <Quote size={17} />
        </button>

        <button
          type="button"
          onClick={() =>
            editor
              .chain()
              .focus()
              .toggleCodeBlock()
              .run()
          }
          className={buttonClass}
        >
          <Code2 size={17} />
        </button>

      </div>

      {/* Editor */}
      <EditorContent
        editor={editor}
        className="
          min-h-[500px]
          p-6
          prose
          dark:prose-invert
          max-w-none
          focus:outline-none
        "
      />

    </div>
  );
}

export default Editor;