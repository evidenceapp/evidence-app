"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import TextStyle from "@tiptap/extension-text-style";
import Color from "@tiptap/extension-color";

import {
  Bold,
  Italic,
  List,
  ListOrdered,
  Heading1,
  Heading2,
  Link as LinkIcon,
  Unlink,
} from "lucide-react";
import { useState } from "react";

type Props = {
  value: string;
  onChange: (content: string) => void;
};

const TiptapEditor = ({ value, onChange }: Props) => {
  const [color, setColor] = useState("#111111");

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
          class: "underline text-blue-600 hover:text-blue-800 cursor-pointer",
          target: "_blank",
          rel: "noopener noreferrer",
        },
      }),
    ],
    content: value,
    immediatelyRender: false,
    editorProps: {
      attributes: {
        class: "prose prose-sm max-w-none p-4 min-h-[200px] focus:outline-none text-gray-900",
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

  return (
    <div className="rounded-xl shadow-sm overflow-hidden border border-gray-200 bg-white">
      <div className="flex flex-wrap gap-2 items-center px-2 py-1 border-b bg-gray-50 text-gray-600">
        <button
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={`p-1.5 rounded hover:bg-gray-200 ${
            editor.isActive("bold") ? "bg-yellow-200 text-yellow-800" : ""
          }`}
        >
          <Bold size={16} />
        </button>

        <button
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={`p-1.5 rounded hover:bg-gray-200 ${
            editor.isActive("italic") ? "bg-yellow-200 text-yellow-800" : ""
          }`}
        >
          <Italic size={16} />
        </button>

        <button
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={`p-1.5 rounded hover:bg-gray-200 ${
            editor.isActive("bulletList") ? "bg-yellow-200 text-yellow-800" : ""
          }`}
        >
          <List size={16} />
        </button>

        <button
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={`p-1.5 rounded hover:bg-gray-200 ${
            editor.isActive("orderedList") ? "bg-yellow-200 text-yellow-800" : ""
          }`}
        >
          <ListOrdered size={16} />
        </button>

        <button
          onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
          className={`p-1.5 rounded hover:bg-gray-200 ${
            editor.isActive("heading", { level: 1 }) ? "bg-yellow-200 text-yellow-800" : ""
          }`}
        >
          <Heading1 size={16} />
        </button>

        <button
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          className={`p-1.5 rounded hover:bg-gray-200 ${
            editor.isActive("heading", { level: 2 }) ? "bg-yellow-200 text-yellow-800" : ""
          }`}
        >
          <Heading2 size={16} />
        </button>

        <button
          onClick={() => editor.chain().focus().toggleLink({ href: "https://" }).run()}
          className={`p-1.5 rounded hover:bg-gray-200 ${
            editor.isActive("link") ? "bg-yellow-200 text-yellow-800" : ""
          }`}
        >
          <LinkIcon size={16} />
        </button>

        <button onClick={unsetLink} className="p-1.5 rounded hover:bg-gray-200">
          <Unlink size={16} />
        </button>

        <label className="relative cursor-pointer">
          <span
            className="w-6 h-6 rounded-full border border-gray-300 inline-block"
            style={{ backgroundColor: color }}
          ></span>
          <input
            type="color"
            value={color}
            onChange={(e) => applyColor(e.target.value)}
            className="absolute left-0 top-0 w-6 h-6 opacity-0 cursor-pointer"
          />
        </label>
      </div>

      <EditorContent editor={editor} />
    </div>
  );
};

export default TiptapEditor;
