interface Project {
  id: number;
  title: string;
  description: string;
  category: string;
  budgetMin: number;
  budgetMax: number;
  location: string;
  deadline: string;
  status: string;
  createdAt: string;
  companyId: number;
}

interface ProjectResponse {
  success: boolean;
  message: string;
  data: Project[];
}

export type { Project, ProjectResponse };