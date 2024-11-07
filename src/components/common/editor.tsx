"use client";

import ReactQuill from "react-quill";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

const Tiptap = () => {
  const editor = useEditor({
    extensions: [StarterKit],
    content: "<p>Hello World! 🌎️</p>",
  });

  return (
    // <ReactQuill
    //   value={formik.values.message}
    //   onChange={onChangeHandler}
    //   placeholder="Enter the message..........."
    // />
    <></>
  );
};

export default Tiptap;
