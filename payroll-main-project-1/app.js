// Ensure that the DOM is fully loaded before running any JavaScript
document.addEventListener('DOMContentLoaded', function() {

  // Setting the navbar background with a gradient color and styling the body background
  document.getElementById('navbar').style.backgroundColor = "linear-gradient(135deg, #405766, #5F7C8A, #ffffff, black)";
  document.body.style.backgroundSize = 'cover';  // Ensures the background image covers the full page
  document.body.style.backgroundPosition = 'center';  // Centers the background image
  document.body.style.backgroundRepeat = 'no-repeat';  // Prevents the background from repeating
  document.body.style.height = '100vh';  // Ensures the body covers the full viewport height
});

// Event listener for form submission
document.addEventListener("DOMContentLoaded", () => {
  let loginForm = document.getElementById("login-form"); // Getting the login form
  let userIDInput = document.getElementById("userID"); // Getting the userID input field
  let passwordInput = document.getElementById("password"); // Getting the password input field
  let errorMessage = document.getElementById("error-message"); // Error message element

  // Predefined valid credentials for the login (for demo purposes)
  let validUserCredentials = {
    userID: "HRX-45312",
    password: "WorkFlow#789",
  };

  // Form submission handler
  loginForm.addEventListener("submit", (event) => {
    event.preventDefault(); // Prevent the default form submission (page reload)

    // Get the entered values from the form
    let enteredUserID = userIDInput.value.trim();
    let enteredPassword = passwordInput.value.trim();

    // Validate the credentials
    if (
      enteredUserID === validUserCredentials.userID &&
      enteredPassword === validUserCredentials.password
    ) {
      // If valid, hide the error message and alert the user
      errorMessage.style.display = "none";
      alert("Login successful!");
      window.location.href = "./dashboard.html"; // Redirect to the dashboard
    } else {
      // If invalid, display the error message
      errorMessage.style.display = "block";
      errorMessage.textContent = "Invalid Login Credentials. Please try again.";
    }
  });
});

// Attendance Pie Chart with D3.js
let data = [
  { label: "Present", value: 15, color: "#4CAF50" },
  { label: "Absent", value: 5, color: "#F44336" }
];

// Setting the dimensions of the pie chart
let width = 200;
let height = 200;
let radius = Math.min(width, height) / 2;

// Create the SVG element for the pie chart and position it
let svg = d3.select(".chart")
  .append("svg")
  .attr("width", width)
  .attr("height", height)
  .append("g")
  .attr("transform", `translate(${width / 2}, ${height / 2})`);

// Create a pie layout for the data
let pie = d3.pie().value(d => d.value);

// Define the arc for the slices of the pie chart
let arc = d3.arc().innerRadius(0).outerRadius(radius);

// Add the slices to the pie chart
svg.selectAll("path")
  .data(pie(data))
  .enter()
  .append("path")
  .attr("d", arc)
  .attr("fill", d => d.data.color)
  .attr("stroke", "#fff")
  .attr("stroke-width", "2px");

// Add labels for each slice of the pie chart
svg.selectAll("text")
  .data(pie(data))
  .enter()
  .append("text")
  .attr("transform", d => `translate(${arc.centroid(d)})`)
  .attr("text-anchor", "middle")
  .style("font-size", "12px")
  .style("fill", "#000")
  .text(d => d.data.label);

// Optional: Script to dynamically update a circular progress bar
const progressValue = document.querySelector(".progress-value");
const total = 20;
const completed = 16;
const circumference = 2 * Math.PI * 45; // Circumference of the circle (radius = 45)

progressValue.style.strokeDasharray = circumference;
progressValue.style.strokeDashoffset = circumference - (completed / total) * circumference;

// Employee attendance and leave requests data
document.addEventListener('DOMContentLoaded', () => {
  const attendanceAndLeave = [
    {
      employeeId: 1,
      name: "Sibongile Nkosi",
      attendance: [
        { date: "2024-11-25", status: "Present" },
        { date: "2024-11-26", status: "Absent" },
        { date: "2024-11-27", status: "Present" },
        { date: "2024-11-28", status: "Present" },
        { date: "2024-11-29", status: "Present" }
      ],
      leaveRequests: [
        { date: "2024-11-22", reason: "Sick Leave", status: "Approved" },
        { date: "2024-12-01", reason: "Personal", status: "Pending" }
      ],
      showDetails: false // Controls visibility of the details
    },
  ];

  // Function to toggle the visibility of employee details
  const toggleDetails = (employeeId) => {
    const employee = attendanceAndLeave.find(emp => emp.employeeId === employeeId);
    employee.showDetails = !employee.showDetails; // Toggle visibility flag
    renderEmployees(); // Re-render employees
  };

  // Function to render the employee cards
  const renderEmployees = () => {
    const employeeRegister = document.querySelector('.employee-register');
    employeeRegister.innerHTML = ''; // Clear existing employee cards

    attendanceAndLeave.forEach(employee => {
      const card = document.createElement('div');
      card.classList.add('employee-card');
      card.addEventListener('click', () => toggleDetails(employee.employeeId)); // Attach click event

      const nameElement = document.createElement('h2');
      nameElement.textContent = employee.name;
      card.appendChild(nameElement);

      // If details are to be shown, create tables for attendance and leave
      if (employee.showDetails) {
        // Create attendance table
        const attendanceTable = document.createElement('table');
        const attendanceHeader = document.createElement('thead');
        attendanceHeader.innerHTML = `
          <tr>
            <th>Date</th>
            <th>Status</th>
          </tr>
        `;
        attendanceTable.appendChild(attendanceHeader);

        const attendanceBody = document.createElement('tbody');
        employee.attendance.forEach(record => {
          const row = document.createElement('tr');
          row.innerHTML = `
            <td>${record.date}</td>
            <td class="${record.status.toLowerCase()}">${record.status}</td>
          `;
          attendanceBody.appendChild(row);
        });
        attendanceTable.appendChild(attendanceBody);
        card.appendChild(attendanceTable);

        // Create leave requests table
        const leaveTable = document.createElement('table');
        const leaveHeader = document.createElement('thead');
        leaveHeader.innerHTML = `
          <tr>
            <th>Date</th>
            <th>Reason</th>
            <th>Status</th>
          </tr>
        `;
        leaveTable.appendChild(leaveHeader);

        const leaveBody = document.createElement('tbody');
        employee.leaveRequests.forEach(request => {
          const row = document.createElement('tr');
          row.innerHTML = `
            <td>${request.date}</td>
            <td>${request.reason}</td>
            <td class="${request.status.toLowerCase()}">${request.status}</td>
          `;
          leaveBody.appendChild(row);
        });
        leaveTable.appendChild(leaveBody);
        card.appendChild(leaveTable);
      }

      employeeRegister.appendChild(card);
    });
  };

  // Initial render
  renderEmployees();
});

// Product Sales Bar Chart with Chart.js
const salesChart = document.getElementById('salesChart').getContext('2d');
new Chart(salesChart, {
  type: 'bar',
  data: {
    labels: ['1 Jul', '2 Jul', '3 Jul', '4 Jul', '5 Jul'],
    datasets: [
      {
        label: 'Revenue',
        backgroundColor: '#007b5e',
        data: [50000, 60000, 70000, 50000, 80000]
      },
      {
        label: 'Gross Margin',
        backgroundColor: '#f78c1f',
        data: [30000, 40000, 50000, 30000, 40000]
      }
    ]
  },
  options: { responsive: true }
});

// Sales by Product Category Doughnut Chart
const categoryChart = document.getElementById('categoryChart').getContext('2d');
new Chart(categoryChart, {
  type: 'doughnut',
  data: {
    labels: ['Living Room', 'Kids', 'Kitchen', 'Dining Room'],
    datasets: [
      {
        data: [30, 20, 25, 25],
        backgroundColor: ['#007b5e', '#f78c1f', '#f7c331', '#17a2b8']
      }
    ]
  },
  options: { responsive: true }
});

// Fetch employee data from JSON file and display it in a list
fetch('data.json')
  .then(response => response.json())  // Parse the JSON response
  .then(data => {
    const employeeList = document.getElementById('employee_info');
    data.forEach(employee => {
      const listItem = document.createElement('li');
      listItem.textContent = `${employee.name} - ${employee.position}`;
      employeeList.appendChild(listItem);
    });
  })
  .catch(error => {
    console.error('Error loading JSON:', error);
  });

// Employee data (hardcoded for now)
const employeeData = [
  // Add employee objects here
];

// Display employee cards dynamically
function displayEmployees() {
  const employeeCardsContainer = document.getElementById('employeeCards');
  employeeData.forEach(employee => {
    const card = document.createElement('div');
    card.className = 'card col-md-3';
    card.innerHTML = `
      <div class="card-body">
        <h5 class="card-title">${employee.name}</h5>
        <p class="card-text">${employee.position}</p>
        <button class="btn btn-primary" onclick="showAttendanceGraph(${employee.employeeId})">View Attendance</button>
      </div>
    `;
    employeeCardsContainer.appendChild(card);
  });
}

// Function to generate attendance graph for each employee
function showAttendanceGraph(employeeId) {
  const attendanceData = {
    labels: ["January", "February", "March", "April", "May"],
    datasets: [{
      label: 'Attendance',
      data: [80, 90, 85, 75, 95],  // Random data for demonstration
      borderColor: 'rgba(75, 192, 192, 1)',
      borderWidth: 1,
      fill: false
    }]
  };

  // Generate and display the attendance chart
  const ctx = document.getElementById('attendanceChart').getContext('2d');
  new Chart(ctx, {
    type: 'line',
    data: attendanceData,
    options: {
      scales: { y: { beginAtZero: true } }
    }
  });
}

// Initialize by displaying employee cards
displayEmployees();
