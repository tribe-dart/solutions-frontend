"use client";

import ImageExtension from "@tiptap/extension-image";
import LinkExtension from "@tiptap/extension-link";
import Placeholder from "@tiptap/extension-placeholder";
import TextAlign from "@tiptap/extension-text-align";
import Underline from "@tiptap/extension-underline";
import { EditorContent, ReactNodeViewRenderer, useEditor } from "@tiptap/react";
import { NodeViewWrapper, type NodeViewProps } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { MouseEvent, useEffect, useRef, useState } from "react";

const styles = {
  toolbarActive: "!border-[#d0873a] !bg-[#fef3e8] !text-[#8c571f]",
  richEditorShell:
    "relative overflow-hidden rounded-xl border border-[#c7d0d8] bg-white",
  editorUploadBar:
    "flex items-center justify-between gap-3.5 border-b border-[#dce4eb] bg-[#f8fafc] p-3.5 max-[900px]:flex-col max-[900px]:items-stretch [&>div:first-child]:grid [&>div:first-child]:gap-[3px] [&_strong]:text-[0.95rem] [&_strong]:text-[#0f2f47] [&_span]:text-[0.9rem] [&_span]:text-[#64717c]",
  editorUploadActions:
    "flex items-center gap-2 max-[900px]:flex-col [&_input]:w-[min(320px,34vw)] max-[900px]:[&_input]:w-full [&_input]:rounded-[10px] [&_input]:border [&_input]:border-[#c7d0d8] [&_input]:bg-white [&_input]:px-3 [&_input]:py-2.5 [&_input]:font-normal [&_input]:text-[#172533] [&_button]:cursor-pointer [&_button]:whitespace-nowrap [&_button]:rounded-[10px] [&_button]:border-0 [&_button]:bg-[#d0873a] [&_button]:px-3.5 [&_button]:py-[11px] [&_button]:font-extrabold [&_button]:text-[#172533] disabled:[&_button]:cursor-not-allowed disabled:[&_button]:opacity-65",
  richEditorContent:
    "min-h-[520px] p-7 text-[1.08rem] leading-[1.75] text-[#172533] outline-none [&_a]:text-[#0f5f94] [&_a]:underline [&_blockquote]:my-5 [&_blockquote]:border-l-4 [&_blockquote]:border-[#d0873a] [&_blockquote]:pl-4 [&_blockquote]:italic [&_blockquote]:text-[#4a5966] [&_h2]:mb-3 [&_h2]:mt-7 [&_h2]:text-[2rem] [&_h2]:leading-[1.2] [&_h2]:text-[#0f2f47] [&_h3]:mb-2.5 [&_h3]:mt-5 [&_h3]:text-[1.45rem] [&_h3]:leading-[1.25] [&_h3]:text-[#0f2f47] [&_ol]:mb-4 [&_ol]:ml-6 [&_p]:mb-4 [&_ul]:mb-4 [&_ul]:ml-6",
  editorImageBlock:
    "my-5 rounded-xl border border-[#dce4eb] bg-[#f8fafc] p-3 [&_img]:block [&_img]:max-h-[520px] [&_img]:w-full [&_img]:rounded-[10px] [&_img]:object-cover",
  editorImageInput:
    "mt-2.5 w-full rounded-lg border border-[#d4dde6] px-3 py-2.5",
  editorCaptionInput:
    "mt-2.5 w-full rounded-lg border border-[#d4dde6] px-3 py-2.5 text-[0.95rem] italic text-[#4a5966]",
  richContextMenu:
    "fixed z-[1000] grid w-[280px] grid-cols-2 gap-1.5 rounded-xl border border-[#d4dde6] bg-white p-2.5 shadow-[0_16px_36px_rgba(15,47,71,0.18)] [&_button]:cursor-pointer [&_button]:rounded-lg [&_button]:border [&_button]:border-[#d4dde6] [&_button]:bg-[#f8fafc] [&_button]:px-2.5 [&_button]:py-[9px] [&_button]:text-left [&_button]:font-bold [&_button]:text-[#203242] hover:[&_button]:bg-[#eef3f8] disabled:[&_button]:cursor-not-allowed disabled:[&_button]:opacity-50",
} satisfies Record<string, string>;

export type RichImage = {
  url: string;
  alt: string;
  caption: string;
};

export type RichPostValue = {
  json: Record<string, unknown>;
  text: string;
  images: RichImage[];
};

type RichPostEditorProps = {
  token: string;
  apiBaseUrl: string;
  value: RichPostValue | null;
  onChange: (value: RichPostValue) => void;
  onError: (message: string) => void;
};

type UploadedImage = {
  url: string;
  filename?: string;
};

const collectImages = (node: unknown): RichImage[] => {
  if (!node || typeof node !== "object") {
    return [];
  }

  const currentNode = node as {
    type?: string;
    attrs?: {
      src?: string;
      alt?: string;
      caption?: string;
    };
    content?: unknown[];
  };

  const images =
    currentNode.type === "image" && currentNode.attrs?.src
      ? [
          {
            url: currentNode.attrs.src,
            alt: currentNode.attrs.alt ?? "",
            caption: currentNode.attrs.caption ?? "",
          },
        ]
      : [];

  return [
    ...images,
    ...(currentNode.content ?? []).flatMap((child) => collectImages(child)),
  ];
};

function ImageWithCaptionNode(props: NodeViewProps) {
  const src = props.node.attrs.src as string;
  const alt = (props.node.attrs.alt as string | null) ?? "";
  const caption = (props.node.attrs.caption as string | null) ?? "";

  return (
    <NodeViewWrapper className={styles.editorImageBlock}>
      <img src={src} alt={alt} />
      <input
        type="text"
        value={alt}
        onChange={(event) => props.updateAttributes({ alt: event.target.value })}
        placeholder="Alt text for accessibility"
        className={styles.editorImageInput}
      />
      <input
        type="text"
        value={caption}
        onChange={(event) =>
          props.updateAttributes({ caption: event.target.value })
        }
        placeholder="Write a caption"
        className={styles.editorCaptionInput}
      />
    </NodeViewWrapper>
  );
}

const CaptionedImage = ImageExtension.extend({
  addAttributes() {
    return {
      ...this.parent?.(),
      caption: {
        default: "",
        parseHTML: (element) => element.getAttribute("data-caption") ?? "",
        renderHTML: (attributes) => ({
          "data-caption": attributes.caption,
        }),
      },
    };
  },
  addNodeView() {
    return ReactNodeViewRenderer(ImageWithCaptionNode);
  },
});

export default function RichPostEditor({
  token,
  apiBaseUrl,
  value,
  onChange,
  onError,
}: RichPostEditorProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [contextMenu, setContextMenu] = useState<{
    x: number;
    y: number;
  } | null>(null);

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [2, 3],
        },
      }),
      Underline,
      LinkExtension.configure({
        openOnClick: false,
        autolink: true,
      }),
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      CaptionedImage.configure({
        inline: false,
        allowBase64: false,
      }),
      Placeholder.configure({
        placeholder:
          "Start writing. Add headings, emphasis, quotes, lists, and images.",
      }),
    ],
    content: value?.json ?? {
      type: "doc",
      content: [{ type: "paragraph" }],
    },
    editorProps: {
      attributes: {
        class: styles.richEditorContent,
      },
    },
    immediatelyRender: false,
    onUpdate: ({ editor: currentEditor }) => {
      const json = currentEditor.getJSON() as Record<string, unknown>;
      onChange({
        json,
        text: currentEditor.getText(),
        images: collectImages(json),
      });
    },
  });

  useEffect(() => {
    if (!editor || value) {
      return;
    }

    const json = editor.getJSON() as Record<string, unknown>;
    onChange({
      json,
      text: editor.getText(),
      images: collectImages(json),
    });
  }, [editor, onChange, value]);

  const uploadImages = async (files: FileList | null) => {
    if (!editor || !files?.length) {
      return;
    }

    setIsUploading(true);
    onError("");

    try {
      for (const file of Array.from(files)) {
        const formData = new FormData();
        formData.append("image", file);

        const response = await fetch(`${apiBaseUrl}/api/upload/image`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        });

        if (!response.ok) {
          const data = (await response.json().catch(() => null)) as
            | { message?: string }
            | null;
          throw new Error(data?.message ?? "Unable to upload image");
        }

        const image = (await response.json()) as UploadedImage;
        editor
          .chain()
          .focus()
          .insertContent([
            {
              type: "image",
              attrs: {
                src: image.url,
                alt: image.filename ?? "",
                caption: "",
              },
            },
            { type: "paragraph" },
          ])
          .run();
      }
    } catch (error) {
      onError(error instanceof Error ? error.message : "Unable to upload image");
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  const insertImageFromUrl = () => {
    if (!editor) {
      return;
    }

    const nextImageUrl = imageUrl.trim();

    if (!nextImageUrl) {
      return;
    }

    try {
      new URL(nextImageUrl);
    } catch {
      onError("Enter a valid image URL.");
      return;
    }

    editor
      .chain()
      .focus()
      .insertContent([
        {
          type: "image",
          attrs: {
            src: nextImageUrl,
            alt: "",
            caption: "",
          },
        },
        { type: "paragraph" },
      ])
      .run();
    setImageUrl("");
    onError("");
  };

  if (!editor) {
    return null;
  }

  const setLink = () => {
    const previousUrl = editor.getAttributes("link").href as string | undefined;
    const url = window.prompt("Paste URL", previousUrl ?? "");

    if (url === null) {
      return;
    }

    if (!url) {
      editor.chain().focus().unsetLink().run();
      return;
    }

    editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
    setContextMenu(null);
  };

  const handleContextMenu = (event: MouseEvent<HTMLDivElement>) => {
    event.preventDefault();
    editor.chain().focus().run();
    setContextMenu({ x: event.clientX, y: event.clientY });
  };

  const runMenuAction = (action: () => void) => {
    action();
    setContextMenu(null);
  };

  return (
    <div
      className={styles.richEditorShell}
      onContextMenu={handleContextMenu}
      onClick={() => setContextMenu(null)}
    >
      <input
        ref={fileInputRef}
        type="file"
        accept="image/jpeg,image/jpg,image/png,image/webp"
        multiple
        hidden
        onChange={(event) => uploadImages(event.target.files)}
      />
      <div className={styles.editorUploadBar}>
        <div>
          <strong>Images</strong>
          <span>
            Upload body images or paste an image URL to insert it into the
            article.
          </span>
        </div>
        <div className={styles.editorUploadActions}>
          <input
            type="url"
            value={imageUrl}
            onChange={(event) => setImageUrl(event.target.value)}
            onClick={(event) => event.stopPropagation()}
            placeholder="https://example.com/image.jpg"
          />
          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              insertImageFromUrl();
            }}
          >
            Add URL
          </button>
          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              fileInputRef.current?.click();
            }}
            disabled={isUploading}
          >
            {isUploading ? "Uploading..." : "Upload image"}
          </button>
        </div>
      </div>
      <EditorContent editor={editor} />
      {contextMenu ? (
        <div
          className={styles.richContextMenu}
          style={{ left: contextMenu.x, top: contextMenu.y }}
          onClick={(event) => event.stopPropagation()}
        >
        <button
          type="button"
              onClick={() =>
                runMenuAction(() => editor.chain().focus().setParagraph().run())
              }
          className={editor.isActive("paragraph") ? styles.toolbarActive : ""}
        >
          Paragraph
        </button>
        <button
          type="button"
              onClick={() =>
                runMenuAction(() =>
                  editor.chain().focus().toggleHeading({ level: 2 }).run(),
                )
              }
          className={
            editor.isActive("heading", { level: 2 }) ? styles.toolbarActive : ""
          }
        >
          Heading
        </button>
        <button
          type="button"
              onClick={() =>
                runMenuAction(() => editor.chain().focus().toggleBold().run())
              }
          className={editor.isActive("bold") ? styles.toolbarActive : ""}
        >
          Bold
        </button>
        <button
          type="button"
              onClick={() =>
                runMenuAction(() => editor.chain().focus().toggleItalic().run())
              }
          className={editor.isActive("italic") ? styles.toolbarActive : ""}
        >
          Italic
        </button>
        <button
          type="button"
              onClick={() =>
                runMenuAction(() =>
                  editor.chain().focus().toggleUnderline().run(),
                )
              }
          className={editor.isActive("underline") ? styles.toolbarActive : ""}
        >
          Underline
        </button>
        <button type="button" onClick={setLink}>
          Link
        </button>
        <button
          type="button"
              onClick={() =>
                runMenuAction(() =>
                  editor.chain().focus().toggleBulletList().run(),
                )
              }
          className={editor.isActive("bulletList") ? styles.toolbarActive : ""}
        >
          Bullets
        </button>
        <button
          type="button"
              onClick={() =>
                runMenuAction(() =>
                  editor.chain().focus().toggleOrderedList().run(),
                )
              }
          className={editor.isActive("orderedList") ? styles.toolbarActive : ""}
        >
          Numbers
        </button>
        <button
          type="button"
              onClick={() =>
                runMenuAction(() =>
                  editor.chain().focus().toggleBlockquote().run(),
                )
              }
          className={editor.isActive("blockquote") ? styles.toolbarActive : ""}
        >
          Quote
        </button>
        <button
          type="button"
              onClick={() =>
                runMenuAction(() =>
                  editor.chain().focus().setTextAlign("left").run(),
                )
              }
          className={
            editor.isActive({ textAlign: "left" }) ? styles.toolbarActive : ""
          }
        >
          Align Left
        </button>
        <button
          type="button"
              onClick={() =>
                runMenuAction(() =>
                  editor.chain().focus().setTextAlign("center").run(),
                )
              }
          className={
            editor.isActive({ textAlign: "center" }) ? styles.toolbarActive : ""
          }
        >
          Center
        </button>
        <button
          type="button"
              onClick={() =>
                runMenuAction(() =>
                  editor.chain().focus().setTextAlign("right").run(),
                )
              }
          className={
            editor.isActive({ textAlign: "right" }) ? styles.toolbarActive : ""
          }
        >
          Align Right
        </button>
        <button
          type="button"
              onClick={() =>
                runMenuAction(() =>
                  editor.chain().focus().setTextAlign("justify").run(),
                )
              }
          className={
            editor.isActive({ textAlign: "justify" }) ? styles.toolbarActive : ""
          }
        >
          Justify
        </button>
            <button
              type="button"
              onClick={() => {
                fileInputRef.current?.click();
                setContextMenu(null);
              }}
            >
          {isUploading ? "Uploading..." : "Images"}
        </button>
        <button
          type="button"
              onClick={() =>
                runMenuAction(() => editor.chain().focus().undo().run())
              }
          disabled={!editor.can().undo()}
        >
          Undo
        </button>
        <button
          type="button"
              onClick={() =>
                runMenuAction(() => editor.chain().focus().redo().run())
              }
          disabled={!editor.can().redo()}
        >
          Redo
        </button>
      </div>
      ) : null}
    </div>
  );
}
