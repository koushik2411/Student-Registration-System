// SELECT ELEMENTS
const regForm = document.getElementById("regForm");
const nameInput = document.getElementById("studentName");
const idInput = document.getElementById("studentID");
const mailInput = document.getElementById("studentEmail");
const contNumInput = document.getElementById("contactNumber");
const errorText = document.getElementById("errorText");
const regBtn = document.getElementById("regBtn");
const tbody = document.getElementById("studentsData");

let editIndex = -1;

// DISPLAY STUDENTS
function displayStudents() {
  tbody.innerHTML = "";

  const students = JSON.parse(localStorage.getItem("students")) || [];

  students.forEach((student, index) => {
    const row = document.createElement("tr");
    row.classList.add("dataRow");

    row.innerHTML = `
        <td>${student.name}</td>
        <td>${student.id}</td>
        <td>${student.email}</td>
        <td>${student.phone}</td>
        <td>
        <button id="editBtn" class="actBtn" title="Edit">✏️</button>
        <button id="delBtn" class="actBtn" title="Delete">❌</button>
        </td
        `;

    row.querySelector("#editBtn").addEventListener("click", () => {
      editStudent(index);
    });
    row.querySelector("#delBtn").addEventListener("click", () => {
      deleteStudent(index);
    });

    tbody.appendChild(row);

  });
}

// REGEX (Regular Expression)
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// FORM FUNCTIONS
regForm.addEventListener("submit", function (e) {
  e.preventDefault();

  // VALIDATIONS
  if (nameInput.value === "") {
    errorText.textContent = "Please enter your Name";
    errorText.style.color = "#d40303";
    nameInput.classList.add("errorBounce");
    setInterval(() => {
        nameInput.classList.remove("errorBounce");
        errorText.textContent = "";
    }, 3000);
    return;
  }

  if (idInput.value === "") {
    errorText.textContent = "Please enter your Student ID";
    errorText.style.color = "#d40303";
    idInput.classList.add("errorBounce");
    setInterval(() => {
        nameInput.classList.remove("errorBounce");
        errorText.textContent = "";
    }, 3000);
    return;
  }

  if (idInput.value.length > 6 || idInput.value.length < 4) {
    errorText.textContent = "Please enter a valid Student ID";
    errorText.style.color = "#d40303";
    idInput.classList.add("errorBounce");
    setInterval(() => {
        nameInput.classList.remove("errorBounce");
        errorText.textContent = "";
    }, 3000);
    return;
  }

  if (!emailPattern.test(mailInput.value)) {
    errorText.textContent = "Please enter a valid E-mail id";
    errorText.style.color = "#d40303";
    mailInput.classList.add("errorBounce");
    setInterval(() => {
        nameInput.classList.remove("errorBounce");
        errorText.textContent = "";
    }, 3000);
    return;
  }

  if (contNumInput.value === "") {
    errorText.textContent = "Please enter your Contact Number";
    errorText.style.color = "#d40303";
    contNumInput.classList.add("errorBounce");
    setInterval(() => {
        nameInput.classList.remove("errorBounce");
        errorText.textContent = "";
    }, 3000);
    return;
  }

  if (!/^\d{10}$/.test(contNumInput.value.trim())) {
    errorText.textContent = "Please enter a valid Contact Number";
    errorText.style.color = "#d40303";
    contNumInput.classList.add("errorBounce");
    setInterval(() => {
        nameInput.classList.remove("errorBounce");
        errorText.textContent = "";
    }, 3000);
    return;
  }

  errorText.textContent = "✅ Registration Successful!";
  setInterval(() => {
    errorText.textContent = "";
  }, 3000);
  errorText.style.color = "#4b9841";

  // STUDENTS
  const students = JSON.parse(localStorage.getItem("students")) || [];

  const studentData = {
    name: nameInput.value,
    id: idInput.value,
    email: mailInput.value,
    phone: contNumInput.value,
  };

  // add
  if (editIndex === -1) {
    students.push(studentData);
  } else {
    students[editIndex] = studentData;
    editIndex = -1;
  }

  localStorage.setItem("students", JSON.stringify(students));

  regForm.reset();
  displayStudents();
});

// DELETE
function deleteStudent(index) {
  const students = JSON.parse(localStorage.getItem("students")) || [];

  students.splice(index, 1);

  localStorage.setItem("students", JSON.stringify(students));

  displayStudents();
}

// EDIT
function editStudent(index) {
  const students = JSON.parse(localStorage.getItem("students")) || [];

  const student = students[index];

  nameInput.value = student.name;
  idInput.value = student.id;
  mailInput.value = student.email;
  contNumInput.value = student.phone;

  editIndex = index;
}

window.onload = displayStudents;
