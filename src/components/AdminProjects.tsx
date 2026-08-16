"use client";

import { onAuthStateChanged, signInWithEmailAndPassword, signOut, type User } from "firebase/auth";
import { useEffect, useState } from "react";
import { isFirebaseConfigured, auth } from "@/lib/firebase/config";
import { loadProjects, removeProject, saveProject, type PortfolioProject } from "@/lib/firebase/projects";

const emptyProject: PortfolioProject = {
  id: "",
  name: "",
  description: "",
  image: "",
  technologies: [],
  category: "",
  link: "",
  github: "",
  order: 0,
};

export function AdminProjects() {
  const [user, setUser] = useState<User | null>(null);
  const [projects, setProjects] = useState<PortfolioProject[]>([]);
  const [form, setForm] = useState<PortfolioProject>(emptyProject);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!auth) return;
    return onAuthStateChanged(auth, setUser);
  }, []);

  useEffect(() => {
    if (!user) return;
    void loadProjects(setProjects, () => setMessage("Could not load projects. Create the Firestore database and check its rules."));
  }, [user]);

  async function login(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage("");
    if (!auth) return;
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch {
      setMessage("Login failed. Check the admin email and password.");
    }
  }

  async function save(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!form.id.trim() || !form.name.trim()) return setMessage("Project ID and name are required.");
    try {
      const project = { ...form, id: form.id.trim(), technologies: form.technologies };
      await saveProject(project);
      setProjects((current) => [...current.filter((item) => item.id !== project.id), project].sort((a, b) => a.order - b.order));
      setForm(emptyProject);
      setMessage("Project saved.");
    } catch {
      setMessage("Could not save. Check your Firestore rules.");
    }
  }

  async function remove(id: string) {
    if (!window.confirm("Delete this project?")) return;
    try {
      await removeProject(id);
      setProjects((current) => current.filter((project) => project.id !== id));
      if (form.id === id) setForm(emptyProject);
      setMessage("Project deleted.");
    } catch {
      setMessage("Could not delete this project.");
    }
  }

  if (!isFirebaseConfigured) {
    return <main className="grid min-h-screen place-items-center bg-[#040403] px-6 text-[#f3eee8]"><p>Configure Firebase environment variables to use the admin panel.</p></main>;
  }

  if (!user) {
    return (
      <main className="grid min-h-screen place-items-center bg-[#040403] px-6 text-[#f3eee8]">
        <form onSubmit={login} className="w-full max-w-md space-y-5 rounded-3xl border border-white/10 bg-white/[0.04] p-8">
          <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-[#69a65b]">Portfolio admin</p>
          <h1 className="text-4xl font-black uppercase tracking-[-0.05em]">Manage projects.</h1>
          <input required type="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="Admin email" className="admin-input" />
          <input required type="password" value={password} onChange={(event) => setPassword(event.target.value)} placeholder="Password" className="admin-input" />
          <button className="w-full bg-[#69a65b] px-5 py-4 text-sm font-bold uppercase tracking-[0.15em] text-[#040403]">Sign in</button>
          {message && <p className="text-sm text-[#d63d21]">{message}</p>}
        </form>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#f3eee8] px-6 py-10 text-[#040403] md:px-12">
      <div className="mx-auto max-w-6xl">
        <header className="mb-10 flex items-end justify-between gap-6 border-b border-black/10 pb-6">
          <div><p className="font-mono text-[10px] uppercase tracking-[0.3em] text-[#d63d21]">Portfolio admin</p><h1 className="mt-3 text-5xl font-black uppercase tracking-[-0.06em]">Projects.</h1></div>
          <button onClick={() => auth && signOut(auth)} className="font-mono text-xs uppercase tracking-[0.15em] text-black/50 hover:text-[#d63d21]">Sign out</button>
        </header>
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <form onSubmit={save} className="space-y-4 rounded-3xl border border-black/10 bg-white/60 p-6">
            <div className="flex items-center justify-between"><h2 className="font-mono text-xs uppercase tracking-[0.2em]">{form.id ? "Edit project" : "New project"}</h2><button type="button" onClick={() => setForm(emptyProject)} className="text-xs text-black/40">Clear</button></div>
            <input required value={form.id} onChange={(event) => setForm({ ...form, id: event.target.value })} placeholder="ID e.g. 07" className="admin-input light" />
            <input required value={form.name} onChange={(event) => setForm({ ...form, name: event.target.value })} placeholder="Project name" className="admin-input light" />
            <input value={form.category} onChange={(event) => setForm({ ...form, category: event.target.value })} placeholder="Category" className="admin-input light" />
            <textarea required value={form.description} onChange={(event) => setForm({ ...form, description: event.target.value })} placeholder="Description" rows={4} className="admin-input light" />
            <input value={form.technologies.join(", ")} onChange={(event) => setForm({ ...form, technologies: event.target.value.split(",").map((item) => item.trim()).filter(Boolean) })} placeholder="Technologies, comma separated" className="admin-input light" />
            <input value={form.image} onChange={(event) => setForm({ ...form, image: event.target.value })} placeholder="Image URL or Firebase Storage URL" className="admin-input light" />
            <input value={form.link} onChange={(event) => setForm({ ...form, link: event.target.value })} placeholder="Live project URL" className="admin-input light" />
            <input value={form.github} onChange={(event) => setForm({ ...form, github: event.target.value })} placeholder="GitHub URL" className="admin-input light" />
            <input type="number" value={form.order} onChange={(event) => setForm({ ...form, order: Number(event.target.value) })} placeholder="Display order" className="admin-input light" />
            <button className="w-full bg-[#040403] px-5 py-4 text-sm font-bold uppercase tracking-[0.15em] text-[#f3eee8]">Save project</button>
            {message && <p className="text-sm text-[#d63d21]">{message}</p>}
          </form>
          <div className="space-y-3">
            {projects.map((project) => <article key={project.id} className="flex items-center justify-between gap-5 border-b border-black/10 py-5"><div><p className="font-mono text-[10px] text-[#d63d21]">{project.id}</p><h2 className="mt-1 text-xl font-bold uppercase">{project.name}</h2><p className="mt-1 text-sm text-black/50">{project.category}</p></div><div className="flex gap-3 text-xs font-bold uppercase tracking-[0.12em]"><button onClick={() => setForm(project)} className="text-[#69a65b]">Edit</button><button onClick={() => remove(project.id)} className="text-[#d63d21]">Delete</button></div></article>)}
            {projects.length === 0 && <p className="rounded-3xl border border-dashed border-black/20 p-8 text-sm text-black/50">No Firebase projects yet. Add your first project using the form.</p>}
          </div>
        </div>
      </div>
    </main>
  );
}
