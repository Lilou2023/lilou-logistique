import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { ListTodo, Plus, Trash2, Inbox } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

export default function TodosManager() {
  const [todos, setTodos] = useState([]);
  const [newTask, setNewTask] = useState('');
  const { toast } = useToast();

  const showDisabledToast = () => {
    toast({
      variant: 'destructive',
      title: 'Fonctionnalité désactivée',
      description: 'Supabase est déconnecté. La gestion des tâches est indisponible.',
    });
  };

  const handleAddTask = (e) => {
    e.preventDefault();
    showDisabledToast();
  };

  const handleToggleTodo = () => {
    showDisabledToast();
  };

  const handleDeleteTodo = () => {
    showDisabledToast();
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle className="flex items-center gap-2"><ListTodo /> Liste de Tâches</CardTitle>
            <CardDescription>Vos tâches personnelles pour la journée.</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleAddTask} className="flex gap-2 mb-4">
          <Input
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            placeholder="Ajouter une nouvelle tâche..."
            disabled
          />
          <Button type="submit" size="icon" disabled>
            <Plus />
          </Button>
        </form>
        <div className="space-y-2">
          <div className="flex flex-col items-center justify-center text-center text-muted-foreground h-24 border-2 border-dashed rounded-lg">
            <Inbox className="h-8 w-8 mb-2"/>
            <p className="text-sm">Le module de tâches est désactivé.</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}