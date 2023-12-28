import NewTask from "./NewTask.jsx";
import {useState} from "react";

export default function Tasks({tasks, onAddTask, onDeleteTask}) {

  function handleAddTask(text) {
    console.log(text);
    onAddTask(text);
  }

  return (<section>
    <h2 className="text-2xl font-bold text-stone-700 mb-4">Tasks</h2>
    {tasks.length === 0 && <p className="text-stone-800 my-4">
      There are no tasks in this project.
    </p>}
    <NewTask onAddTask={(text) => handleAddTask(text)}/>
    <ul className="p-4 mt-8 rounded-md bg-stone-100">
      {tasks.map(task => <li key={task.id} className="flex justify-between my-4">
        <span className="text-stone-800">{task.text}</span>
        <button
          className="text-stone-700 hover:text-red-500"
          onClick={() => onDeleteTask(task.id)}>
          Delete
        </button>
      </li>)}
    </ul>
  </section>);
}