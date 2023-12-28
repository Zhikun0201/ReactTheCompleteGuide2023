import {useState} from "react";

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
      const projectId = new Date().toISOString();
      const newProject = {
        ...projectData,
        id: projectId,
      }

      return {
        ...prevState,
        selectedProjectId: undefined, // FIXME
        projects: [...prevState.projects, newProject],
      }
    });
  }

  console.log(projectsState);

  let content;

  if (projectsState.selectedProjectId === null) {
    content = <NewProject onAdd={handleAddProject}/>;
  } else if (projectsState.selectedProjectId === undefined) {
    content = <NoProjectSelected onStartAddProject={handleStartProject}/>;
  }

  return (
    <main className="h-screen my-8 flex gap-8">
      <ProjectSidebar
        onStartAddProject={handleStartProject}
        projects={projectsState.projects}
      />
      {content}
    </main>
  );
}

export default App;
