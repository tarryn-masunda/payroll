document.addEventListener('DOMContentLoaded', function(){

      let errorMessage = document.getElementById('error-message');

  document.getElementById('navbar').style.backgroundColor = "linear-gradient(135deg, #405766, #5F7C8A, #ffffff, black)";
  document.body.style.backgroundSize = 'cover';
  document.body.style.backgroundPosition = 'center';
  document.body.style.backgroundRepeat = 'no-repeat';
  document.body.style.height = '100vh';
})

// Step 1: Add an event listener to the form
document.addEventListener("DOMContentLoaded", () => {
  // Get the form, input fields, and error message element
  let loginForm = document.getElementById("login-form");
  let userIDInput = document.getElementById("userID");
  let passwordInput = document.getElementById("password");
  let errorMessage = document.getElementById("error-message");

  // Predefined valid credentials (for demonstration purposes)
  let validUserCredentials = {
    userID: "HRX-45312",
    password: "WorkFlow#789",
  };

  // Step 2: Handle form submission
  loginForm.addEventListener("submit", (event) => {
    event.preventDefault(); // Prevent the form from reloading the page

    let enteredUserID = userIDInput.value.trim();
    let enteredPassword = passwordInput.value.trim();

    // Step 3: Validate credentials
    if (
      enteredUserID === validUserCredentials.userID &&
      enteredPassword === validUserCredentials.password
    ) {
      // Successful login
      errorMessage.style.display = "none";
      alert("Login successful!");
      // Redirect to another page 
      window.location.href = "./dashboard.html";
    } else {
      // Invalid login
      errorMessage.style.display = "block";
      errorMessage.textContent = "Invalid Login Credentials. Please try again.";
    }
  });
});


// let timeOffCard = document.querySelector('.time-off')

  // Chart container inside the card 
    
      // Data: 15 present, 5 absent
      let data = [
        { label: "Present", value: 15, color: "#4CAF50" },
        { label: "Absent", value: 5, color: "#F44336" }
    ];

    // Set dimensions of the chart
    let width = 200; // Adjust to fit inside the card
    let height = 200;
    let radius = Math.min(width, height) / 2;

    // Create an SVG container inside the chart div
    let svg = d3.select(".chart")
        .append("svg")
        .attr("width", width)
        .attr("height", height)
        .append("g")
        .attr("transform", `translate(${width / 2}, ${height / 2})`);

    // Create a pie layout
    let pie = d3.pie()
        .value(d => d.value);

    // Define the arc generator
    let arc = d3.arc()
        .innerRadius(0) // Full pie (no hole)
        .outerRadius(radius);

    // Add pie slices
    svg.selectAll("path")
        .data(pie(data))
        .enter()
        .append("path")
        .attr("d", arc)
        .attr("fill", d => d.data.color)
        .attr("stroke", "#fff")
        .attr("stroke-width", "2px");
        
        

    // Add labels to the slices
    svg.selectAll("text")
        .data(pie(data))
        .enter()
        .append("text")
        .attr("transform", d => `translate(${arc.centroid(d)})`)
        .attr("text-anchor", "middle")
        .style("font-size", "12px")
        .style("fill", "#000")
        .text(d => d.data.label);

// Optional: Script to dynamically set progress value
const progressValue = document.querySelector(".progress-value");
const total = 20;
const completed = 16;
const circumference = 2 * Math.PI * 45; // 2πr, r=45

progressValue.style.strokeDasharray = circumference;
progressValue.style.strokeDashoffset = circumference - (completed / total) * circumference;

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
      showDetails: false // Control visibility of the details
    },
    // Additional employee objects can be added here
  ];

  // Function to toggle visibility of the employee details
  const toggleDetails = (employeeId) => {
    const employee = attendanceAndLeave.find(emp => emp.employeeId === employeeId);
    employee.showDetails = !employee.showDetails; // Toggle the visibility flag
    renderEmployees(); // Re-render the employees to update the details
  };

  // Function to render the employee cards
  const renderEmployees = () => {
    const employeeRegister = document.querySelector('.employee-register');
    employeeRegister.innerHTML = ''; // Clear existing cards before rendering

    attendanceAndLeave.forEach(employee => {
      const card = document.createElement('div');
      card.classList.add('employee-card');
      card.addEventListener('click', () => toggleDetails(employee.employeeId)); // Attach click event to toggle details

      const nameElement = document.createElement('h2');
      nameElement.textContent = employee.name;

      card.appendChild(nameElement);

      // If details should be visible, create and append the attendance and leave request tables
      if (employee.showDetails) {
        // Attendance Table
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

        // Leave Requests Table
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

  // Initial render of the employee cards
  renderEmployees();
});

async function displayData() {
  const container = document.getElementById("data-container");
  try {
    // Fetch the JSON file
    const response = await fetch("EmployeeData.json");
    const data = await response.json()
  }
