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
    setProjectState(prevState => {
      return {
        ...prevState,
        selectedProjectId: null,
      };
    });
  }

  let content;

  if (projectsState.selectedProjectId === null) {
    content = <NewProject />;
  } else if (projectsState.selectedProjectId === undefined) {
    content = <NoProjectSelected onStartAddPrject={handleStartProject} />;
  }

  return (
    <main className="h-screen my-8 flex gap-8">
      <ProjectSidebar onStartAddPrject={handleStartProject}/>
      {content}
    </main>
  );
}

export default App;
