"use client";

import dynamic from "next/dynamic";
import { forwardRef } from "react";
import type { ForwardedRef } from "react";
import {
  BlockTypeSelect,
  BoldItalicUnderlineToggles,
  CreateLink,
  InsertTable,
  ListsToggle,
  MDXEditor,
  type MDXEditorMethods,
  type MDXEditorProps,
  headingsPlugin,
  linkDialogPlugin,
  linkPlugin,
  listsPlugin,
  markdownShortcutPlugin,
  quotePlugin,
  tablePlugin,
  thematicBreakPlugin,
  toolbarPlugin,
  UndoRedo,
  Separator,
} from "@mdxeditor/editor";

function InitializedMarkdownEditor({
  editorRef,
  ...props
}: { editorRef: ForwardedRef<MDXEditorMethods> | null } & MDXEditorProps) {
  return (
    <MDXEditor
      ref={editorRef}
      plugins={[
        headingsPlugin(),
        listsPlugin(),
        quotePlugin(),
        thematicBreakPlugin(),
        linkPlugin(),
        linkDialogPlugin(),
        tablePlugin(),
        markdownShortcutPlugin(),
        toolbarPlugin({
          toolbarClassName: "rpp-mdx-toolbar",
          toolbarContents: () => (
            <>
              <UndoRedo />
              <Separator />
              <BoldItalicUnderlineToggles />
              <Separator />
              <BlockTypeSelect />
              <Separator />
              <ListsToggle />
              <Separator />
              <CreateLink />
              <InsertTable />
            </>
          ),
        }),
      ]}
      contentEditableClassName="rpp-mdx-content"
      {...props}
    />
  );
}

const ClientMarkdownEditor = dynamic(async () => InitializedMarkdownEditor, {
  ssr: false,
});

export const MarkdownEditor = forwardRef<MDXEditorMethods, MDXEditorProps>((props, ref) => {
  return <ClientMarkdownEditor {...props} editorRef={ref} />;
});

MarkdownEditor.displayName = "MarkdownEditor";
