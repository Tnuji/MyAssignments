let assignments = [];

async function loadAssignments() {
  const response = await fetch("/api/assignments");
  assignments = await response.json();
  renderAll();
}

loadAssignments();

function getTodayISO() {
  return getISOFromDate(new Date());
}

function getDayNumber(isoDate) {
  return isoDate.split("-")[2];
}

function getMonthAbbr(isoDate) {
  const months = ["JAN","FEB","MAR","APR","MAY","JUN","JUL","AUG","SEP","OCT","NOV","DEC"];
  const monthIndex = Number(isoDate.split("-")[1]) - 1;
  return months[monthIndex];
}
function getISOFromDate(dateObj) {
  const year = dateObj.getFullYear();
  const month = String(dateObj.getMonth() + 1).padStart(2, "0");
  const day = String(dateObj.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function getTodaysAssignments() {
  const today = getTodayISO();
  return assignments.filter((a) => a.dueDate === today);
}

function getUpcomingAssignments() {
  const today = getTodayISO();
  return assignments
    .filter((a) => a.dueDate > today && a.status !== "done")
    .sort((a, b) => a.dueDate.localeCompare(b.dueDate));
}

function getOverdueAssignments() {
  const today = getTodayISO();
  return assignments.filter((a) => a.dueDate < today && a.status !== "done");
}
//console.log(assignments);

const todaysListEl = document.getElementById("todaysList");



function renderTodaysAssignments() {
  todaysListEl.innerHTML = "";

  getTodaysAssignments().forEach((assignment) => {
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


const form = document.querySelector(".assignment-form");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const newAssignment = {
    title: document.getElementById("title").value,
    className: document.getElementById("class-select").value,
    dueDate: document.getElementById("due-date").value,
    priority: document.getElementById("priority-select").value.toLowerCase(),
  };

  await fetch("/api/assignments", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newAssignment),
  });

  form.reset();
  await loadAssignments();
});

const upcomingListEl = document.getElementById("upcomingList");

function renderUpcoming() {
  upcomingListEl.innerHTML = "";

  getUpcomingAssignments().forEach((upcomingAssignment) => {
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
    day.textContent = getDayNumber(upcomingAssignment.dueDate);
    const month = document.createElement("span");
    month.className = "upcoming-month";
    month.textContent = getMonthAbbr(upcomingAssignment.dueDate);
    
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
}


function renderStats() {
  const today = getTodayISO();

  const dueToday = assignments.filter((a) => a.dueDate === today && a.status !== "done");
  const completed = assignments.filter((a) => a.status === "done");
  const overdue = getOverdueAssignments();

  const weekFromNow = new Date();
  weekFromNow.setDate(weekFromNow.getDate() + 7);
  const weekEnd = getISOFromDate(weekFromNow);

  const thisWeek = assignments.filter(
    (a) => a.dueDate >= today && a.dueDate <= weekEnd && a.status !== "done"
  );

  document.getElementById("statDueToday").textContent = dueToday.length;
  document.getElementById("statThisWeek").textContent = thisWeek.length;
  document.getElementById("statOverdue").textContent = overdue.length;
  document.getElementById("statCompleted").textContent = completed.length;
}

function renderUpNext() {
  const upcoming = getUpcomingAssignments();
  const overdue = getOverdueAssignments();
  const todays = getTodaysAssignments().filter((a) => a.status !== "done");

  const next = overdue[0] || todays[0] || upcoming[0];

  if (!next) {
    document.getElementById("upNextTitle").textContent = "Nothing due — you're all caught up";
    document.getElementById("upNextBadge").textContent = "";
    document.getElementById("upNextDue").textContent = "";
    return;
  }

  document.getElementById("upNextTitle").textContent = next.title;
  document.getElementById("upNextBadge").textContent = next.className;
  document.getElementById("upNextDue").textContent =
    `📅 ${getMonthAbbr(next.dueDate)} ${getDayNumber(next.dueDate)} · 🕐 ${next.time}`;
}
function renderAll() {
  renderTodaysAssignments();
  renderUpcoming();
  renderUpNext();
  renderStats();
}

const addButton = document.getElementById("add-assignment-btn");

addButton.addEventListener("click", () => {
  document.querySelector(".add-form-card").scrollIntoView({ behavior: "smooth" });
});
