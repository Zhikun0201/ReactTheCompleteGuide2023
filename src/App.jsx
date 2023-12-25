import { useState } from "react";

import NewProject from "./components/sidebar/NewProject";
import NoProjectSelected from "./components/sidebar/NoProjectSelected";
import ProjectSidebar from "./components/sidebar/ProjectSidebar";
function App() {

  const [projectsState, setProjectState] = useState({
    selectedProjectId: undefined,
    projects: [],
  });


  function handleStartProject() {
    setProjectState((prevState) => {
      return {
        ...prevState,
        selectedProjectId: null,
      };
    });
  }

  function handleAddProject(projectData) {
    setProjectState(prevState => {
      const newProject = {
        ...projectData,
        id: new Date().toISOString(),
      }

      return {
        ...prevState,
        projects: [...prevState.projects, newProject],
      }
    });
  }

  console.log(projectsState);

  let content;

  if (projectsState.selectedProjectId === null) {
    content = <NewProject onAdd={handleAddProject} />;
  } else if (projectsState.selectedProjectId === undefined) {
    content = <NoProjectSelected onStartAddProject={handleStartProject} />;
  }

  return (
    <main className="h-screen my-8 flex gap-8">
      <ProjectSidebar onStartAddProject={handleStartProject} />
      {content}
    </main>
  );
}

export default App;
