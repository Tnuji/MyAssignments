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

const upcomingAssignments = [
  { day: "10", month: "AUG", title: "Calculus Quiz", className: "MATH 201", tag: "Quiz", color: "purple" },
  { day: "12", month: "AUG", title: "Database Project", className: "CS 301", tag: "Project", color: "blue" },
  { day: "14", month: "AUG", title: "Reading Response", className: "ENG 302", tag: "Paper", color: "orange" },
  { day: "15", month: "AUG", title: "Chapter 9 Problems", className: "MATH 201", tag: "Homework", color: "green" },
  { day: "18", month: "AUG", title: "Midterm Study Guide", className: "HIST 201", tag: "Study", color: "purple" },
];
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

  document.getElementById("statDueToday").textContent = todaysAssignments.length;
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
    day.textContent = upcomingAssignment.day + " ";
    const month = document.createElement("span");
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
    assignmentName.textContent = upcomingAssignment.title;
    const nameOfClass = document.createElement("p");
    nameOfClass.textContent = upcomingAssignment.className;

    classInfo.appendChild(assignmentName);
    classInfo.appendChild(nameOfClass);
    

    // 5. Create the tag:
    //    - a span with className "tag" (item.tag)
    const tag = document.createElement("span");
    tag.className = upcomingAssignment.tag;


    // 6. appendChild everything into the outer div, in this order:
    //    date block, bar, info block, tag
    row.appendChild(date);
    row.appendChild(bar);
    row.appendChild(classInfo);
    row.appendChild(tag);
    // 7. appendChild the outer div into upcomingListEl

    upcomingListEl.appendChild(row);
  });
}

renderUpcoming();