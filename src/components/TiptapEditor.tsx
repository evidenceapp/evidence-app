"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import TextStyle from "@tiptap/extension-text-style";
import Color from "@tiptap/extension-color";
import { useState } from "react";

type Props = {
  value: string;
  onChange: (content: string) => void;
};

const TiptapEditor = ({ value, onChange }: Props) => {
  const [color, setColor] = useState("#F5F5F5");

  const editor = useEditor({
    extensions: [
      StarterKit,
      TextStyle,
      Color,
      Link.configure({
        openOnClick: true,
        autolink: true,
        linkOnPaste: true,
        HTMLAttributes: {
          class: "underline cursor-pointer",
          style: "color: #D1B046;",
          target: "_blank",
          rel: "noopener noreferrer",
        },
      }),
    ],
    content: value,
    immediatelyRender: false,
    editorProps: {
      attributes: {
        class: "prose prose-invert prose-sm max-w-none p-4 min-h-[200px] focus:outline-none",
        style: "color: rgba(245, 245, 245, 0.9);",
      },
    },
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  if (!editor) return null;

  const unsetLink = () => {
    editor.chain().focus().unsetLink().run();
  };

  const applyColor = (newColor: string) => {
    setColor(newColor);
    editor.chain().focus().setColor(newColor).run();
  };

  const buttonBaseStyle = {
    padding: "6px",
    borderRadius: "2px",
    transition: "all 0.2s ease",
    color: "rgba(245, 245, 245, 0.6)",
  };

  const buttonActiveStyle = {
    ...buttonBaseStyle,
    backgroundColor: "rgba(209, 176, 70, 0.2)",
    color: "#D1B046",
  };

  return (
    <div
      className="overflow-hidden"
      style={{
        background: "rgba(30, 40, 50, 0.6)",
        border: "1px solid rgba(209, 176, 70, 0.15)",
      }}
    >
      <div
        className="flex flex-wrap gap-1 items-center px-3 py-2"
        style={{
          background: "rgba(45, 58, 74, 0.5)",
          borderBottom: "1px solid rgba(209, 176, 70, 0.1)",
        }}
      >
        <button
          onClick={() => editor.chain().focus().toggleBold().run()}
          style={editor.isActive("bold") ? buttonActiveStyle : buttonBaseStyle}
          onMouseEnter={(e) => {
            if (!editor.isActive("bold")) {
              e.currentTarget.style.backgroundColor = "rgba(209, 176, 70, 0.1)";
              e.currentTarget.style.color = "#D1B046";
            }
          }}
          onMouseLeave={(e) => {
            if (!editor.isActive("bold")) {
              e.currentTarget.style.backgroundColor = "transparent";
              e.currentTarget.style.color = "rgba(245, 245, 245, 0.6)";
            }
          }}
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 4h8a4 4 0 014 4 4 4 0 01-4 4H6z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 12h9a4 4 0 014 4 4 4 0 01-4 4H6z" />
          </svg>
        </button>

        <button
          onClick={() => editor.chain().focus().toggleItalic().run()}
          style={editor.isActive("italic") ? buttonActiveStyle : buttonBaseStyle}
          onMouseEnter={(e) => {
            if (!editor.isActive("italic")) {
              e.currentTarget.style.backgroundColor = "rgba(209, 176, 70, 0.1)";
              e.currentTarget.style.color = "#D1B046";
            }
          }}
          onMouseLeave={(e) => {
            if (!editor.isActive("italic")) {
              e.currentTarget.style.backgroundColor = "transparent";
              e.currentTarget.style.color = "rgba(245, 245, 245, 0.6)";
            }
          }}
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 4h4m-2 0v16m-4 0h8" transform="skewX(-10)" />
          </svg>
        </button>

        <button
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          style={editor.isActive("bulletList") ? buttonActiveStyle : buttonBaseStyle}
          onMouseEnter={(e) => {
            if (!editor.isActive("bulletList")) {
              e.currentTarget.style.backgroundColor = "rgba(209, 176, 70, 0.1)";
              e.currentTarget.style.color = "#D1B046";
            }
          }}
          onMouseLeave={(e) => {
            if (!editor.isActive("bulletList")) {
              e.currentTarget.style.backgroundColor = "transparent";
              e.currentTarget.style.color = "rgba(245, 245, 245, 0.6)";
            }
          }}
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            <circle cx="2" cy="6" r="1" fill="currentColor" />
            <circle cx="2" cy="12" r="1" fill="currentColor" />
            <circle cx="2" cy="18" r="1" fill="currentColor" />
          </svg>
        </button>

        <button
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          style={editor.isActive("orderedList") ? buttonActiveStyle : buttonBaseStyle}
          onMouseEnter={(e) => {
            if (!editor.isActive("orderedList")) {
              e.currentTarget.style.backgroundColor = "rgba(209, 176, 70, 0.1)";
              e.currentTarget.style.color = "#D1B046";
            }
          }}
          onMouseLeave={(e) => {
            if (!editor.isActive("orderedList")) {
              e.currentTarget.style.backgroundColor = "transparent";
              e.currentTarget.style.color = "rgba(245, 245, 245, 0.6)";
            }
          }}
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 6h13M7 12h13M7 18h13" />
            <text x="2" y="8" fontSize="6" fill="currentColor" fontWeight="bold">1</text>
            <text x="2" y="14" fontSize="6" fill="currentColor" fontWeight="bold">2</text>
            <text x="2" y="20" fontSize="6" fill="currentColor" fontWeight="bold">3</text>
          </svg>
        </button>

        <div className="w-[1px] h-5 mx-1" style={{ background: "rgba(209, 176, 70, 0.2)" }} />

        <button
          onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
          style={editor.isActive("heading", { level: 1 }) ? buttonActiveStyle : buttonBaseStyle}
          onMouseEnter={(e) => {
            if (!editor.isActive("heading", { level: 1 })) {
              e.currentTarget.style.backgroundColor = "rgba(209, 176, 70, 0.1)";
              e.currentTarget.style.color = "#D1B046";
            }
          }}
          onMouseLeave={(e) => {
            if (!editor.isActive("heading", { level: 1 })) {
              e.currentTarget.style.backgroundColor = "transparent";
              e.currentTarget.style.color = "rgba(245, 245, 245, 0.6)";
            }
          }}
        >
          <span className="text-xs font-bold">H1</span>
        </button>

        <button
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          style={editor.isActive("heading", { level: 2 }) ? buttonActiveStyle : buttonBaseStyle}
          onMouseEnter={(e) => {
            if (!editor.isActive("heading", { level: 2 })) {
              e.currentTarget.style.backgroundColor = "rgba(209, 176, 70, 0.1)";
              e.currentTarget.style.color = "#D1B046";
            }
          }}
          onMouseLeave={(e) => {
            if (!editor.isActive("heading", { level: 2 })) {
              e.currentTarget.style.backgroundColor = "transparent";
              e.currentTarget.style.color = "rgba(245, 245, 245, 0.6)";
            }
          }}
        >
          <span className="text-xs font-bold">H2</span>
        </button>

        <div className="w-[1px] h-5 mx-1" style={{ background: "rgba(209, 176, 70, 0.2)" }} />

        <button
          onClick={() => editor.chain().focus().toggleLink({ href: "https://" }).run()}
          style={editor.isActive("link") ? buttonActiveStyle : buttonBaseStyle}
          onMouseEnter={(e) => {
            if (!editor.isActive("link")) {
              e.currentTarget.style.backgroundColor = "rgba(209, 176, 70, 0.1)";
              e.currentTarget.style.color = "#D1B046";
            }
          }}
          onMouseLeave={(e) => {
            if (!editor.isActive("link")) {
              e.currentTarget.style.backgroundColor = "transparent";
              e.currentTarget.style.color = "rgba(245, 245, 245, 0.6)";
            }
          }}
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
          </svg>
        </button>

        <button
          onClick={unsetLink}
          style={buttonBaseStyle}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = "rgba(209, 176, 70, 0.1)";
            e.currentTarget.style.color = "#D1B046";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = "transparent";
            e.currentTarget.style.color = "rgba(245, 245, 245, 0.6)";
          }}
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 20L20 4" />
          </svg>
        </button>

        <div className="w-[1px] h-5 mx-1" style={{ background: "rgba(209, 176, 70, 0.2)" }} />

        <label className="relative cursor-pointer flex items-center gap-2">
          <span
            className="w-5 h-5 rounded-sm inline-block"
            style={{
              backgroundColor: color,
              border: "1px solid rgba(209, 176, 70, 0.3)",
            }}
          />
          <input
            type="color"
            value={color}
            onChange={(e) => applyColor(e.target.value)}
            className="absolute left-0 top-0 w-5 h-5 opacity-0 cursor-pointer"
          />
        </label>
      </div>

      <EditorContent editor={editor} />
    </div>
  );
};

export default TiptapEditor;
