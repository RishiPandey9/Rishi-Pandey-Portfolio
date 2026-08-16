import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  orderBy,
  query,
  setDoc,
} from "firebase/firestore";
import { db } from "./config";

export interface PortfolioProject {
  id: string;
  name: string;
  description: string;
  image: string;
  technologies: string[];
  category: string;
  link: string;
  github: string;
  order: number;
  role?: string;
  scope?: string;
  highlights?: string[];
}

const projectsCollection = collection(db, "projects");

export async function getProjects(): Promise<PortfolioProject[]> {
  const snapshot = await getDocs(query(projectsCollection, orderBy("order", "asc")));
  return snapshot.docs.map((project) => project.data() as PortfolioProject);
}

export async function loadProjects(
  onChange: (projects: PortfolioProject[]) => void,
  onError: () => void,
) {
  try {
    onChange(await getProjects());
  } catch {
    onError();
  }
}

export async function saveProject(project: PortfolioProject): Promise<void> {
  await setDoc(doc(db, "projects", project.id), project);
}

export async function removeProject(id: string): Promise<void> {
  await deleteDoc(doc(db, "projects", id));
}
