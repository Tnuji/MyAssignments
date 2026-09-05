const todaysAssignments = [
  {
    title: "LeetCode Practice",
    className: "CS 301",
    time: "11:59 PM",
    priority: "high",
    color: "purple",
    icon: "💻",
  },
  {
    title: "Research Paper Outline",
    className: "ENG 302",
    time: "5:00 PM",
    priority: "medium",
    color: "orange",
    icon: "📖",
  },
  {
    title: "Problem Set 6",
    className: "MATH 201",
    time: "11:59 PM",
    priority: "high",
    color: "blue",
    icon: "fi",
  },
];
console.log(todaysAssignments);

const todaysListEl = document.getElementById("todaysList");

function renderTodaysAssignments() {
  let html = "";

  todaysAssignments.forEach((assignment) => {
    html += `
      <div class="assignment-row ${assignment.color}">
        <div class="assignment-icon">${assignment.icon}</div>
        <div class="assignment-info">
          <p class="assignment-name">${assignment.title}</p>
          <p class="assignment-class">${assignment.className}</p>
        </div>
        <div class="assignment-meta">
          <p class="assignment-time">${assignment.time}</p>
          <span class="priority priority-${assignment.priority}">${assignment.priority}</span>
        </div>
      </div>
    `;
  });

  todaysListEl.innerHTML = html;
}

renderTodaysAssignments();

const form = document.querySelector(".assignment-form");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const title = document.getElementById("title").value;
  const className = document.getElementById("class-select").value;
  const dueDate = document.getElementById("due-date").value;
  const priority = document.getElementById("priority-select").value.toLowerCase();

  const newAssignment = {
    title: title,
    className: className,
    time: dueDate,
    priority: priority,
    color: "purple",
    icon: "📌",
  };

  todaysAssignments.push(newAssignment);

  renderTodaysAssignments();

  form.reset();
});