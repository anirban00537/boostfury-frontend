import React, { useEffect, useCallback, useState } from "react";
import { useEditor, EditorContent, BubbleMenu } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import TextStyle from "@tiptap/extension-text-style";
import { Color } from "@tiptap/extension-color";
import Highlight from "@tiptap/extension-highlight";
import { Bold, Italic, Strikethrough, Underline, Type, Highlighter } from 'lucide-react';

interface TextProps {
  content: string;
  onBlur: (content: string) => void;
  fontSize: number;
  fontStyle: string;
  fontWeight: string | number;
  alignment: "left" | "center" | "right";
  placeholder: string;
}

const Text: React.FC<TextProps> = ({
  content,
  onBlur,
  fontSize,
  fontStyle,
  fontWeight,
  alignment,
  placeholder,
}) => {
  const [textColor, setTextColor] = useState("#000000");
  const [highlightColor, setHighlightColor] = useState("#ffffff");

  const editor = useEditor({
    extensions: [
      StarterKit,
      TextStyle,
      Color.configure({ types: [TextStyle.name, StarterKit.name] }),
      Highlight.configure({ multicolor: true }),
    ],
    content: content || `<p>${placeholder}</p>`,
    onUpdate: ({ editor }) => {
      onBlur(editor.getHTML());
    },
    editorProps: {
      attributes: {
        spellcheck: "false",
        style: `
          font-size: ${fontSize}px;
          font-style: ${fontStyle};
          font-weight: ${fontWeight};
          text-align: ${alignment};
          width: 100%;
          margin-bottom: 8px;
          background-color: transparent;
          border: none;
          color: inherit;
          outline: none;
          word-break: break-word;
          white-space: normal;
          resize: none;
        `,
      },
    },
  });

  const updateContent = useCallback(() => {
    if (editor && content !== editor.getHTML()) {
      const { from, to } = editor.state.selection;
      editor.commands.setContent(content, false);
      editor.commands.setTextSelection({ from, to });
    }
  }, [editor, content]);

  useEffect(() => {
    updateContent();
  }, [updateContent]);

  const applyStyle = (style: string, value?: string) => {
    if (!editor) return;

    switch (style) {
      case "bold":
        editor.chain().focus().toggleBold().run();
        break;
      case "italic":
        editor.chain().focus().toggleItalic().run();
        break;
      case "strikeThrough":
        editor.chain().focus().toggleStrike().run();
        break;
      case "underline":
        // Requires underline extension (not included in StarterKit)
        // editor.chain().focus().toggleUnderline().run();
        break;
      case "color":
        if (value) {
          editor.chain().focus().setColor(value).run();
          setTextColor(value);
        }
        break;
      case "highlight":
        if (value) {
          editor.chain().focus().toggleHighlight({ color: value }).run();
          setHighlightColor(value);
        }
        break;
    }
  };

  return (
    <div style={{ position: "relative", width: "100%" }}>
      <EditorContent
        editor={editor}
        spellCheck={false}
        autoComplete="off"
        autoCapitalize="off"
        autoCorrect="off"
        className="notranslate"
        translate="no"
      />
      {editor && (
        <BubbleMenu
          editor={editor}
          tippyOptions={{ duration: 100 }}
          className="bg-white shadow-lg rounded-lg p-2 flex items-center space-x-1"
        >
          <button onClick={() => applyStyle("bold")} className="format-button">
            <Bold size={18} />
          </button>
          <button onClick={() => applyStyle("italic")} className="format-button">
            <Italic size={18} />
          </button>
          <button onClick={() => applyStyle("strikeThrough")} className="format-button">
            <Strikethrough size={18} />
          </button>
          <button onClick={() => applyStyle("underline")} className="format-button">
            <Underline size={18} />
          </button>
          <div className="h-4 w-px bg-gray-300/25 mx-1" />
          <div className="relative">
            <button className="format-button" style={{ color: textColor }}>
              <Type size={18} />
            </button>
            <input
              type="color"
              value={textColor}
              onChange={(e) => applyStyle("color", e.target.value)}
              className="absolute inset-0 opacity-0 cursor-pointer"
            />
          </div>
          <div className="relative">
            <button className="format-button" style={{ backgroundColor: highlightColor, padding: '2px', borderRadius: '2px' }}>
              <Highlighter size={18} style={{ color: getContrastColor(highlightColor) }} />
            </button>
            <input
              type="color"
              value={highlightColor}
              onChange={(e) => applyStyle("highlight", e.target.value)}
              className="absolute inset-0 opacity-0 cursor-pointer"
            />
          </div>
        </BubbleMenu>
      )}
    </div>
  );
};

// Helper function to determine contrasting text color
function getContrastColor(hexColor: string): string {
  const r = parseInt(hexColor.slice(1, 3), 16);
  const g = parseInt(hexColor.slice(3, 5), 16);
  const b = parseInt(hexColor.slice(5, 7), 16);
  const yiq = ((r * 299) + (g * 587) + (b * 114)) / 1000;
  return (yiq >= 128) ? 'black' : 'white';
}

export default Text;
