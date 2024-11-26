import { defineStore } from "pinia";

interface Project {
  id: string;
  name: string;
  client: string;
  startDate: string;
  endDate: string;
  projectCover: string | null;
}

export const useProjectsStore = defineStore("projects", {
  state: () => ({
    projects: [] as Project[],
  }),
  actions: {
    addProject(project: Project) {
      this.projects.push(project);
    },
  },
});