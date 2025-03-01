import React, { useState, useEffect } from 'react';
import { Container, TextField, Button, List, ListItem, ListItemText, IconButton, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckIcon from '@mui/icons-material/Check';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

function App() {
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem('tasks');
    return savedTasks ? JSON.parse(savedTasks) : [];
  });
  const [newTask, setNewTask] = useState('');
  const [newDueDate, setNewDueDate] = useState(null);
  const [newNotes, setNewNotes] = useState('');

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (newTask.trim()) {
      setTasks([...tasks, { title: newTask, completed: false, dueDate: newDueDate, notes: newNotes }]);
      setNewTask('');
      setNewDueDate(null);
      setNewNotes('');
    }
  };

  const toggleTaskCompletion = (index) => {
    const updatedTasks = tasks.map((task, i) =>
      i === index ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
  };

  const deleteTask = (index) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Container maxWidth="sm">
        <Typography variant="h4" component="h1" gutterBottom>
          Task Manager
        </Typography>
        <TextField
          label="New Task"
          variant="outlined"
          fullWidth
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          margin="normal"
        />
        <DatePicker
          label="Due Date"
          value={newDueDate}
          onChange={(newValue) => setNewDueDate(newValue)}
          renderInput={(params) => <TextField {...params} fullWidth margin="normal" />}
        />
        <TextField
          label="Notes"
          variant="outlined"
          fullWidth
          value={newNotes}
          onChange={(e) => setNewNotes(e.target.value)}
          margin="normal"
        />
        <Button variant="contained" color="primary" onClick={addTask} fullWidth>
          Add Task
        </Button>
        <List>
          {tasks.map((task, index) => (
            <ListItem key={index} secondaryAction={
              <>
                <IconButton edge="end" aria-label="complete" onClick={() => toggleTaskCompletion(index)}>
                  <CheckIcon color={task.completed ? 'success' : 'default'} />
                </IconButton>
                <IconButton edge="end" aria-label="delete" onClick={() => deleteTask(index)}>
                  <DeleteIcon color="error" />
                </IconButton>
              </>
            }>
              <ListItemText
                primary={task.title}
                secondary={`Due: ${task.dueDate ? task.dueDate.toLocaleDateString() : 'No date'} | Notes: ${task.notes}`}
                style={{ textDecoration: task.completed ? 'line-through' : 'none' }}
              />
            </ListItem>
          ))}
        </List>
      </Container>
    </LocalizationProvider>
  );
}

export default App;