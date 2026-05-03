"use client";

import "@mdxeditor/editor/style.css";

import { useMemo } from "react";
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
  Separator,
  UndoRedo,
  headingsPlugin,
  linkDialogPlugin,
  linkPlugin,
  listsPlugin,
  markdownShortcutPlugin,
  quotePlugin,
  tablePlugin,
  thematicBreakPlugin,
  toolbarPlugin,
} from "@mdxeditor/editor";

export function MarkdownEditorClient({
  editorRef,
  ...props
}: { editorRef: ForwardedRef<MDXEditorMethods> | null } & MDXEditorProps) {
  const plugins = useMemo(
    () => [
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
    ],
    [],
  );

  return <MDXEditor ref={editorRef} plugins={plugins} contentEditableClassName="rpp-mdx-content" {...props} />;
}
