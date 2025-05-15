document.addEventListener('DOMContentLoaded', () => {
  const taskInput = document.getElementById('task-input');
  const addTaskBtn = document.getElementById('add-task');
  const taskList = document.getElementById('task-list');

  function createTaskElement(taskText, completed = false) {
    const li = document.createElement('li');
    li.textContent = taskText;

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.addEventListener('click', () => {
      taskList.removeChild(li);
      saveTasks();
      updateProgress();
    });

    li.addEventListener('click', () => {
      li.classList.toggle('completed');
      saveTasks();
      updateProgress();
    });

    li.appendChild(deleteBtn);

    if (completed) {
      li.classList.add('completed');
    }

    taskList.appendChild(li);
  }

  function updateProgress() {
    const tasks = taskList.querySelectorAll('li');
    const completedTasks = taskList.querySelectorAll('li.completed');
    const progress = tasks.length === 0 ? 0 : (completedTasks.length / tasks.length) * 100;

    document.getElementById('progress-bar').style.width = `${progress}%`;
    document.getElementById('progress-text').textContent = `${Math.round(progress)}% completed`;

    if (progress === 100 && tasks.length > 0) {
      triggerConfetti();
    }
  }

  function saveTasks() {
    const tasks = [];
    taskList.querySelectorAll('li').forEach(li => {
      tasks.push({
        text: li.firstChild.textContent,
        completed: li.classList.contains('completed')
      });
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }

  function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(task => {
      createTaskElement(task.text, task.completed);
    });
    updateProgress();
  }

  function triggerConfetti() {
    confetti({
      particleCount: 150,
      spread: 70,
      origin: { y: 0.6 }
    });
  }

  addTaskBtn.addEventListener('click', () => {
    const taskText = taskInput.value.trim();
    if (taskText !== '') {
      createTaskElement(taskText);
      saveTasks();
      updateProgress();
      taskInput.value = '';
    }
  });

  loadTasks();
});
