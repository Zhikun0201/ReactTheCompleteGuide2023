import {useState} from "react";

import NewProject from "./components/NewProject.jsx";
import NoProjectSelected from "./components/NoProjectSelected.jsx";
import ProjectSidebar from "./components/ProjectSidebar.jsx";
import SelectedProject from "./components/SelectedProject.jsx";

function GenerateDummyProjects() {
  const projectNames = ['你好', '谢谢茄子', '哼哼哼啊', '受不了了'];
  return projectNames.map((projectName, index) => {
    return {
      id: Math.random().toString(),
      title: projectNames[index],
      description: `This is project ${projectName}`,
      dueDate: new Date().toISOString(),
    };
  });
}

function GenerateDummyTasks(projects) {
  const taskNames = ['123', '456', '789', '101112'];
  return taskNames.map((taskName, index) => {
    return {
      id: Math.random().toString(),
      projectId: projects[Math.floor(Math.random() * projects.length)].id,
      text: taskNames[index],
    };
  });
}

function App() {

  const [projectsState, setProjectState] = useState({
    selectedProjectId: undefined,
    projects: [],
    tasks: [],
  });

  // Generate dummy projects if there are no projects
  if (projectsState.projects.length === 0) {
    const dummyProjects = GenerateDummyProjects();
    setProjectState((prevState) => {
      return {
        ...prevState,
        projects: dummyProjects,
        tasks: GenerateDummyTasks(dummyProjects),
      };
    });
  }

  function handleSelectProject(projectId) {
    setProjectState((prevState) => {
      return {
        ...prevState,
        selectedProjectId: projectId,
      };
    });
  }

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
        selectedProjectId: projectId,
        projects: [...prevState.projects, newProject],
      }
    });
  }

  function handleDeleteProject(projectId) {
    setProjectState(prevState => {
      const filteredProjects = prevState.projects.filter(project => project.id !== projectId);
      return {
        ...prevState,
        projects: filteredProjects,
        selectedProjectId: filteredProjects.length > 0 ? filteredProjects[0].id : undefined,
      }
    })
  }

  function handleCancelAddProject() {
    setProjectState((prevState) => {
      return {
        ...prevState,
        selectedProjectId: undefined,
      };
    });
  }

  function handleAddTask(text) {
    setProjectState((prevState) => {
      const taskId = new Date().toISOString();
      const newTask = {
        id: taskId,
        projectId: prevState.selectedProjectId,
        text: text
      };

      return {
        ...prevState,
        tasks: [newTask, ...prevState.tasks],
      };
    })
  }

  function handleDeleteTask(taskId) {
    setProjectState((prevState) => {
      const filteredTasks = prevState.tasks.filter(task => task.id !== taskId);
      return {
        ...prevState,
        tasks: filteredTasks,
      };
    })
  }

  const selectedProject = projectsState.projects.find((project) => project.id === projectsState.selectedProjectId);

  let content = <SelectedProject
    project={selectedProject}
    onDeleteProject={handleDeleteProject}
    tasks={projectsState.tasks.filter(task => task.projectId === projectsState.selectedProjectId)}
    onAddTask={handleAddTask}
    onDeleteTask={handleDeleteTask}
  />;

  if (projectsState.selectedProjectId === null) {
    content = <NewProject onAdd={handleAddProject} onCancel={handleCancelAddProject}/>;
  } else if (projectsState.selectedProjectId === undefined) {
    content = <NoProjectSelected onStartAddProject={handleStartProject}/>;
  }

  return (
    <main className="h-screen my-8 flex gap-8">
      <ProjectSidebar
        onStartAddProject={handleStartProject}
        projects={projectsState.projects}
        onSelectProject={handleSelectProject}
        selectedProjectId={projectsState.selectedProjectId}
      />
      {content}
    </main>
  );
}

export default App;
