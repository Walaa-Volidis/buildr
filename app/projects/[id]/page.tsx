'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/app/components/ui/card';
import { Button } from '@/app/components/ui/button';
import { Progress } from '@/app/components/ui/progress';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/app/components/ui/dialog';
import { Input } from '@/app/components/ui/input';
import { Label } from '@/app/components/ui/label';
import { ArrowLeft, Plus, Check, Trash2 } from 'lucide-react';
import { useProject } from '../../hooks/use-project';
import { useTasks } from '../../hooks/use-tasks';
import { useTeam } from '../../hooks/use-team';

type TeamMember = {
  id: string;
  name: string;
};

type Task = {
  id: string;
  name: string;
  isComplete: boolean;
  teamMember: TeamMember | null;
};

export default function ProjectDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const [projectId, setProjectId] = useState<string>('');
  const [isAddTaskOpen, setIsAddTaskOpen] = useState(false);
  const [newTaskName, setNewTaskName] = useState('');
  const [selectedMember, setSelectedMember] = useState<string>('');

  const { project, fetchProject } = useProject(projectId);
  const {
    createTask,
    toggleTask,
    deleteTask: removeTask,
  } = useTasks(projectId);
  const { teamMembers, fetchTeamMembers } = useTeam();

  useEffect(() => {
    const getParams = async () => {
      const resolvedParams = await params;
      setProjectId(resolvedParams.id);
    };
    getParams();
  }, [params]);

  useEffect(() => {
    if (projectId) {
      fetchProject();
      fetchTeamMembers();
    }
  }, [projectId, fetchProject, fetchTeamMembers]);

  const handleAddTask = async () => {
    if (!newTaskName.trim()) return;

    try {
      await createTask(newTaskName, selectedMember || undefined);
      setNewTaskName('');
      setSelectedMember('');
      setIsAddTaskOpen(false);
      // Refresh project to get updated progress
      await fetchProject();
    } catch (error) {
      console.error('Failed to create task:', error);
    }
  };

  const handleToggleTask = async (taskId: string, currentStatus: boolean) => {
    try {
      await toggleTask(taskId, currentStatus);
      // Refresh project to get updated progress
      await fetchProject();
    } catch (error) {
      console.error('Failed to toggle task:', error);
    }
  };

  const handleDeleteTask = async (taskId: string) => {
    if (!confirm('Are you sure you want to delete this task?')) return;

    try {
      await removeTask(taskId);
      // Refresh project to get updated progress
      await fetchProject();
    } catch (error) {
      console.error('Failed to delete task:', error);
    }
  };

  if (!project) {
    return (
      <div className="container mx-auto p-6 max-w-4xl">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 max-w-5xl min-h-[calc(100vh-200px)]">
      {/* Header Section */}
      <div className="mb-10">
        <Link href="/">
          <Button
            variant="ghost"
            className="mb-6 hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:text-blue-600 dark:hover:text-blue-400 transition-all group"
          >
            <ArrowLeft className="mr-2 h-4 w-4 group-hover:-translate-x-1 transition-transform" />
            Back to Dashboard
          </Button>
        </Link>

        {/* Hero Section */}
        <div className="relative mb-8">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 via-purple-600/10 to-pink-600/10 dark:from-blue-600/5 dark:via-purple-600/5 dark:to-pink-600/5 rounded-3xl blur-3xl"></div>
          <div className="relative bg-white/60 dark:bg-slate-900/60 backdrop-blur-sm rounded-2xl border border-slate-200 dark:border-slate-700 p-8 shadow-xl">
            <div className="flex justify-between items-start mb-6">
              <div className="flex-1">
                <h1 className="text-5xl font-bold mb-3 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent animate-slide-in">
                  {project.name}
                </h1>
                <div className="flex items-center gap-3">
                  <span
                    className={`inline-flex items-center px-4 py-1.5 rounded-full text-sm font-medium ${
                      project.status === 'Completed'
                        ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                        : 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400'
                    }`}
                  >
                    {project.status === 'Completed' && (
                      <Check className="mr-1.5 h-4 w-4" />
                    )}
                    {project.status}
                  </span>
                </div>
              </div>

              <Dialog open={isAddTaskOpen} onOpenChange={setIsAddTaskOpen}>
                <DialogTrigger asChild>
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all transform hover:scale-105"
                  >
                    <Plus className="mr-2 h-5 w-5" />
                    Add Task
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                  <DialogHeader>
                    <DialogTitle className="text-2xl">
                      Create New Task
                    </DialogTitle>
                    <DialogDescription>
                      Add a new task to {project.name}
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid gap-2">
                      <Label htmlFor="taskName">Task Name</Label>
                      <Input
                        id="taskName"
                        value={newTaskName}
                        onChange={(e) => setNewTaskName(e.target.value)}
                        placeholder="Enter task name"
                        onKeyDown={(e) => e.key === 'Enter' && handleAddTask()}
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="assignee">Assign To (Optional)</Label>
                      <select
                        id="assignee"
                        value={selectedMember}
                        onChange={(e) => setSelectedMember(e.target.value)}
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                      >
                        <option value="">Unassigned</option>
                        {teamMembers.map((member) => (
                          <option key={member.id} value={member.id}>
                            {member.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <DialogFooter>
                    <Button
                      onClick={handleAddTask}
                      className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                    >
                      Create Task
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>

            {/* Progress Card */}
            <div className="bg-slate-50 dark:bg-slate-800/50 rounded-xl p-6 border border-slate-200 dark:border-slate-700">
              <div className="flex justify-between items-center mb-3">
                <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                  Overall Progress
                </span>
                <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  {project.progress}%
                </span>
              </div>
              <div className="relative h-4 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                <div
                  className="absolute top-0 left-0 h-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 transition-all duration-500 rounded-full shadow-sm"
                  style={{ width: `${project.progress}%` }}
                >
                  {project.progress > 0 && (
                    <div className="absolute inset-0 animate-pulse bg-white/20"></div>
                  )}
                </div>
              </div>
              <div className="flex justify-between mt-4 text-sm">
                <span className="text-slate-600 dark:text-slate-400">
                  {project.tasks.length} total tasks
                </span>
                <span className="text-slate-600 dark:text-slate-400">
                  {project.tasks.filter((t) => t.isComplete).length} completed
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tasks Section */}
      <div>
        <h2 className="text-3xl font-bold mb-6 text-slate-900 dark:text-slate-100">
          Tasks
        </h2>
        {project.tasks.length === 0 ? (
          <Card className="p-16 text-center border-2 border-dashed border-slate-300 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-900/50 hover:border-slate-400 dark:hover:border-slate-600 transition-colors animate-fade-in">
            <CardContent>
              <div className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 dark:from-blue-500/5 dark:to-purple-500/5 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-6">
                <Check className="h-12 w-12 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-slate-900 dark:text-slate-100">
                No tasks yet
              </h3>
              <p className="text-slate-600 dark:text-slate-400 mb-6 max-w-md mx-auto">
                Get started by adding your first task to track progress
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-3">
            {project.tasks.map((task, index) => (
              <Card
                key={task.id}
                className={`group transition-all duration-300 border-slate-200 dark:border-slate-700 overflow-hidden animate-scale-in ${
                  task.isComplete
                    ? 'bg-slate-50/50 dark:bg-slate-900/50 hover:bg-slate-100 dark:hover:bg-slate-900'
                    : 'bg-white dark:bg-slate-900 hover:shadow-lg hover:-translate-y-0.5'
                }`}
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <CardContent className="p-5">
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-4 flex-1">
                      {/* Custom Checkbox */}
                      <button
                        onClick={() =>
                          handleToggleTask(task.id, task.isComplete)
                        }
                        className={`flex items-center justify-center w-7 h-7 rounded-lg border-2 transition-all duration-200 ${
                          task.isComplete
                            ? 'bg-gradient-to-br from-green-500 to-emerald-600 border-green-500 shadow-md'
                            : 'border-slate-300 dark:border-slate-600 hover:border-blue-500 dark:hover:border-blue-400 hover:shadow-md hover:scale-110'
                        }`}
                      >
                        {task.isComplete && (
                          <Check className="h-4 w-4 text-white animate-scale-in" />
                        )}
                      </button>

                      <div className="flex-1">
                        <p
                          className={`text-base transition-all duration-200 ${
                            task.isComplete
                              ? 'line-through text-slate-400 dark:text-slate-600'
                              : 'font-medium text-slate-900 dark:text-slate-100 group-hover:text-blue-600 dark:group-hover:text-blue-400'
                          }`}
                        >
                          {task.name}
                        </p>
                        {task.teamMember && (
                          <div className="flex items-center gap-2 mt-1">
                            <div className="w-6 h-6 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white text-xs font-semibold">
                              {task.teamMember.name.charAt(0).toUpperCase()}
                            </div>
                            <p className="text-sm text-slate-600 dark:text-slate-400">
                              {task.teamMember.name}
                            </p>
                          </div>
                        )}
                      </div>
                    </div>

                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDeleteTask(task.id)}
                      className="text-slate-400 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all opacity-0 group-hover:opacity-100"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
