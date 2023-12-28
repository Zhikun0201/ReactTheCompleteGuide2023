import {useRef} from "react";
import InputPage from "./Input.jsx";
import Modal from "./Modal.jsx";

export default function NewProject({onAdd}) {
  const title = useRef();
  const description = useRef();
  const dueDate = useRef();
  const modal = useRef();

  function handleSave() {
    const enteredTitle = title.current.value;
    const enteredDescription = description.current.value;
    const enteredDueDate = dueDate.current.value;

    if (enteredTitle.trim() === '' ||
      enteredDescription.trim() === '' ||
      enteredDueDate === '') {
      modal.current.open();
      return;
    }

    const projectData = {
      title: enteredTitle,
      description: enteredDescription,
      dueDate: enteredDueDate,
    }
    onAdd(projectData);
  }

  return (<div className="w-[35rem] mt-16">
    <Modal ref={modal} buttonLabel="Okay">
      <h2 className="text-2xl font-bold text-stone-800">Invalid input</h2>
      <p className="text-stone-800">Please enter valid data!</p>
    </Modal>
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
      <InputPage ref={title} type="text" label="Title"/>
      <InputPage ref={description} label="Description" textArea/>
      <InputPage ref={dueDate} type="date" label="Due Date"/>
    </div>
  </div>)
}