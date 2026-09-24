document.addEventListener("DOMContentLoaded", () => {
  
  // 1. Task Planner Logic
  const plannerForm = document.getElementById("planner-form");
  const taskInput = document.getElementById("task-input");
  const taskList = document.getElementById("task-list");

  let tasks = [];

  if (plannerForm) {
    plannerForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const taskText = taskInput.value.trim();

      if (taskText !== "") {
        tasks.push({ id: Date.now(), text: taskText, completed: false });
        taskInput.value = "";
        renderTasks();
      }
    });
  }

  function renderTasks() {
    if (!taskList) return;
    taskList.innerHTML = "";

    tasks.forEach(task => {
      const li = document.createElement("li");
      li.className = `task-item ${task.completed ? "completed" : ""}`;

      const span = document.createElement("span");
      span.textContent = task.text;
      span.addEventListener("click", () => {
        task.completed = !task.completed;
        renderTasks();
      });

      const delBtn = document.createElement("button");
      delBtn.className = "delete-btn";
      delBtn.textContent = "Delete";
      delBtn.addEventListener("click", () => {
        tasks = tasks.filter(t => t.id !== task.id);
        renderTasks();
      });

      li.appendChild(span);
      li.appendChild(delBtn);
      taskList.appendChild(li);
    });
  }

  // 2. Form Validation Logic
  const contactForm = document.getElementById("contact-form");
  const errorMessage = document.getElementById("error-message");
  const successMessage = document.getElementById("success-message");

  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();

      errorMessage.style.display = "none";
      successMessage.style.display = "none";

      const fullName = document.getElementById("fullname").value.trim();
      const email = document.getElementById("email").value.trim();
      const phone = document.getElementById("phone").value.trim();
      const message = document.getElementById("message").value.trim();

      let errors = [];

      if (!fullName || !email || !phone || !message) {
        errors.push("All fields are required.");
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (email && !emailRegex.test(email)) {
        errors.push("Please enter a valid email address.");
      }

      const phoneRegex = /^\d+$/;
      if (phone && !phoneRegex.test(phone)) {
        errors.push("Phone number must contain only digits.");
      }

      if (errors.length > 0) {
        errorMessage.innerHTML = errors.join("<br>");
        errorMessage.style.display = "block";
      } else {
        successMessage.textContent = "Thank you! Your message has been sent successfully.";
        successMessage.style.display = "block";
        contactForm.reset();
      }
    });
  }
});
