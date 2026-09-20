const assignments = [
  { title: "LeetCode Practice",     className: "CS 301",   dueDate: "2026-09-20", time: "11:59 PM", priority: "high",   color: "purple", icon: "💻", tag: "Practice",  status: "pending" },
  { title: "Research Paper Outline", className: "ENG 302", dueDate: "2026-09-20", time: "5:00 PM",  priority: "medium", color: "orange", icon: "📖", tag: "Paper",     status: "done"    },
  { title: "Problem Set 6",          className: "MATH 201", dueDate: "2026-09-20", time: "11:59 PM", priority: "high",   color: "blue",   icon: "fi", tag: "Homework",  status: "pending" },
  { title: "Calculus Quiz",          className: "MATH 201", dueDate: "2026-09-24", time: "9:00 AM",  priority: "high",   color: "purple", icon: "📐", tag: "Quiz",      status: "pending" },
  { title: "Database Project",       className: "CS 301",   dueDate: "2026-09-26", time: "11:59 PM", priority: "high",   color: "blue",   icon: "💾", tag: "Project",   status: "pending" },
  { title: "Reading Response",       className: "ENG 302",  dueDate: "2026-09-28", time: "11:59 PM", priority: "low",    color: "orange", icon: "📚", tag: "Paper",     status: "pending" },
  { title: "Midterm Study Guide",    className: "HIST 201", dueDate: "2026-10-02", time: "11:59 PM", priority: "medium", color: "green",  icon: "🗂️", tag: "Study",     status: "pending" },
  { title: "Essay Draft",            className: "ENG 302",  dueDate: "2026-09-14", time: "11:59 PM", priority: "high",   color: "orange", icon: "✍️", tag: "Paper",     status: "pending" },
];

function getTodayISO() {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function getDayNumber(isoDate) {
  return isoDate.split("-")[2];
}

function getMonthAbbr(isoDate) {
  const months = ["JAN","FEB","MAR","APR","MAY","JUN","JUL","AUG","SEP","OCT","NOV","DEC"];
  const monthIndex = Number(isoDate.split("-")[1]) - 1;
  return months[monthIndex];
}
console.log(todaysAssignments);

const todaysListEl = document.getElementById("todaysList");



function renderTodaysAssignments() {
  todaysListEl.innerHTML = "";

  todaysAssignments.forEach((assignment) => {
    const row = document.createElement("div");
    row.className = "assignment-row " + assignment.color;

    const icon = document.createElement("div");
    icon.className = "assignment-icon";
    icon.textContent = assignment.icon;

    const info = document.createElement("div");
    info.className = "assignment-info";

    const name = document.createElement("p");
    name.className = "assignment-name";
    name.textContent = assignment.title;

    const cls = document.createElement("p");
    cls.className = "assignment-class";
    cls.textContent = assignment.className;

    info.appendChild(name);
    info.appendChild(cls);

    const meta = document.createElement("div");
    meta.className = "assignment-meta";

    const time = document.createElement("p");
    time.className = "assignment-time";
    time.textContent = assignment.time;

    const priority = document.createElement("span");
    priority.className = "priority priority-" + assignment.priority;
    priority.textContent = assignment.priority;

    meta.appendChild(time);
    meta.appendChild(priority);

    row.appendChild(icon);
    row.appendChild(info);
    row.appendChild(meta);

    todaysListEl.appendChild(row);
  });
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
  renderStats();
});

const upcomingListEl = document.getElementById("upcomingList");

function renderUpcoming() {
  upcomingListEl.innerHTML = "";

  upcomingAssignments.forEach((upcomingAssignment) => {
    const row = document.createElement("div");
    row.className = "upcoming-item";

    // 2. Create the date block:
    //    - a div with className "upcoming-date"
    //    - inside it, a span "upcoming-day" (textContent = item.day)
    //    - and a span "upcoming-month" (textContent = item.month)

    const date = document.createElement("div");
    date.className = "upcoming-date";
    const day = document.createElement("span");
    day.className = "upcoming-day";
    day.textContent = upcomingAssignment.day;
    const month = document.createElement("span");
    month.className = "upcoming-month";
    month.textContent = upcomingAssignment.month;
    
    date.append(day);
    date.append(month);

    // 3. Create the color bar:
    //    - a div with className "upcoming-bar " + item.color
    //    - no text content — it's an empty colored bar

    const bar = document.createElement("div");
    bar.className = "upcoming-bar " + upcomingAssignment.color;

    // 4. Create the info block:
    //    - a div with className "upcoming-info"
    //    - inside it, a p "upcoming-name" (item.title)
    //    - and a p "upcoming-class" (item.className)

    const classInfo = document.createElement("div");
    classInfo.className = "upcoming-info";
    const assignmentName = document.createElement("p");
    assignmentName.className = "upcoming-name";
    assignmentName.textContent = upcomingAssignment.title;
    const nameOfClass = document.createElement("p");
    nameOfClass.className = "upcoming-class";
    nameOfClass.textContent = upcomingAssignment.className;

    classInfo.appendChild(assignmentName);
    classInfo.appendChild(nameOfClass);
    

    // 5. Create the tag:
    //    - a span with className "tag" (item.tag)
    const tag = document.createElement("span");
    tag.className = "tag";
    tag.textContent = upcomingAssignment.tag;


    // 6. appendChild everything into the outer div, in this order:
    //    date block, bar, info block, tag
    row.appendChild(date);
    row.appendChild(bar);
    row.appendChild(classInfo);
    row.appendChild(tag);
    // 7. appendChild the outer div into upcomingListEl

    upcomingListEl.appendChild(row);
  });
  renderStats();
}

renderUpcoming();

function renderStats() {
  const completed = todaysAssignments.filter((a) => a.status === "done");
  const pending = todaysAssignments.filter((a) => a.status !== "done");

  document.getElementById("statDueToday").textContent = pending.length;
  document.getElementById("statCompleted").textContent = completed.length;
  document.getElementById("statThisWeek").textContent = upcomingAssignments.length;
  document.getElementById("statOverdue").textContent = 0;
}