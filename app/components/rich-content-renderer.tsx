import type { ReactNode } from "react";
import type { CSSProperties } from "react";

type RichMark = {
  type: string;
  attrs?: {
    href?: string;
  };
};

type RichNode = {
  type: string;
  text?: string;
  attrs?: {
    level?: number;
    src?: string;
    alt?: string;
    caption?: string;
    textAlign?: string;
  };
  marks?: RichMark[];
  content?: RichNode[];
};

type RichContentRendererProps = {
  contentJson?: unknown;
  fallbackParagraphs: string[];
  excludedImageSrcs?: string[];
};

const getTextAlignStyle = (textAlign: string | undefined): CSSProperties => {
  if (
    textAlign === "left" ||
    textAlign === "right" ||
    textAlign === "center" ||
    textAlign === "justify"
  ) {
    return { textAlign };
  }

  return {};
};

const renderMarks = (
  text: ReactNode,
  marks: RichMark[] | undefined,
  keyPrefix: string,
) =>
  (marks ?? []).reduce<ReactNode>((currentText, mark, index) => {
    const key = `${keyPrefix}-mark-${index}`;

    if (mark.type === "bold") {
      return <strong key={key}>{currentText}</strong>;
    }

    if (mark.type === "italic") {
      return <em key={key}>{currentText}</em>;
    }

    if (mark.type === "underline") {
      return <u key={key}>{currentText}</u>;
    }

    if (mark.type === "link" && mark.attrs?.href) {
      return (
        <a key={key} href={mark.attrs.href} rel="noreferrer" target="_blank">
          {currentText}
        </a>
      );
    }

    return currentText;
  }, text);

const renderChildren = (
  node: RichNode,
  keyPrefix: string,
  excludedImageSrcs: Set<string>,
) =>
  (node.content ?? []).map((child, index) =>
    renderNode(child, `${keyPrefix}-${index}`, excludedImageSrcs),
  );

const renderNode = (
  node: RichNode,
  key: string,
  excludedImageSrcs: Set<string>,
): ReactNode => {
  if (node.type === "text") {
    return renderMarks(node.text ?? "", node.marks, key);
  }

  if (node.type === "paragraph") {
    return (
      <p key={key} style={getTextAlignStyle(node.attrs?.textAlign)}>
        {renderChildren(node, key, excludedImageSrcs)}
      </p>
    );
  }

  if (node.type === "heading") {
    const children = renderChildren(node, key, excludedImageSrcs);
    return node.attrs?.level === 3 ? (
      <h3 key={key} style={getTextAlignStyle(node.attrs?.textAlign)}>
        {children}
      </h3>
    ) : (
      <h2 key={key} style={getTextAlignStyle(node.attrs?.textAlign)}>
        {children}
      </h2>
    );
  }

  if (node.type === "bulletList") {
    return <ul key={key}>{renderChildren(node, key, excludedImageSrcs)}</ul>;
  }

  if (node.type === "orderedList") {
    return <ol key={key}>{renderChildren(node, key, excludedImageSrcs)}</ol>;
  }

  if (node.type === "listItem") {
    return <li key={key}>{renderChildren(node, key, excludedImageSrcs)}</li>;
  }

  if (node.type === "blockquote") {
    return (
      <blockquote key={key}>{renderChildren(node, key, excludedImageSrcs)}</blockquote>
    );
  }

  if (node.type === "hardBreak") {
    return <br key={key} />;
  }

  if (node.type === "image" && node.attrs?.src) {
    if (excludedImageSrcs.has(node.attrs.src)) {
      return null;
    }

    return (
      <figure key={key}>
        <img src={node.attrs.src} alt={node.attrs.alt ?? ""} />
        {node.attrs.caption ? <figcaption>{node.attrs.caption}</figcaption> : null}
      </figure>
    );
  }

  return <div key={key}>{renderChildren(node, key, excludedImageSrcs)}</div>;
};

export default function RichContentRenderer({
  contentJson,
  fallbackParagraphs,
  excludedImageSrcs = [],
}: RichContentRendererProps) {
  const excludedImages = new Set(excludedImageSrcs);
  const richDocument =
    contentJson && typeof contentJson === "object"
      ? (contentJson as RichNode)
      : undefined;

  if (richDocument?.type === "doc" && richDocument.content?.length) {
    return <>{renderChildren(richDocument, "rich-content", excludedImages)}</>;
  }

  return (
    <>
      {fallbackParagraphs.map((paragraph, index) => (
        <p key={`fallback-${index}`}>{paragraph}</p>
      ))}
    </>
  );
}
