import { useRef } from "react";
import InputPage from "./Input";

export default function NewProject({ onAdd }) {
  const title = useRef();
  const description = useRef();
  const dueDate = useRef();

  function handleSave() {
    const projectData = {
      title: title.current.value,
      description: description.current.value,
      dueDate: dueDate.current.value,
    }
    onAdd(projectData);
  }

  return (
    <div className="w-[35rem] mt-16">
      <menu className="flex items-center justify-end gap-4 my-4">
        <li>
          <button
            className="text-stone-800 hover:text-stone-950"
          >
            Cancel
          </button>
        </li>
        <li>
          <button
            className="px-6 py-2 rounded-md bg-stone-800 text-stone-50 hover:bg-stone-950"
            onClick={handleSave}
          >
            Save
          </button>
        </li>
      </menu>
      <div>
        <InputPage ref={title} type="text" label="Title" />
        <InputPage ref={description} label="Description" textArea />
        <InputPage ref={dueDate} type="date" label="Due Date" />
      </div>
    </div>
  )
}