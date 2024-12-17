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


// Product Sales Bar Chart
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

// Sales by Product Category
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


fetch('data.json')
            .then(response => response.json())  // Parse JSON
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

            const employeeData = [
              { "employeeId": 1, "name": "Sibongile Nkosi", "position": "Software Engineer", "department": "Development", "salary": 70000, "employmentHistory": "Joined in 2015, promoted to Senior in 2018", "contact": "sibongile.nkosi@moderntech.com" },
              { "employeeId": 2, "name": "Lungile Moyo", "position": "HR Manager", "department": "HR", "salary": 80000, "employmentHistory": "Joined in 2013, promoted to Manager in 2017", "contact": "lungile.moyo@moderntech.com" },
              { "employeeId": 3, "name": "Thabo Molefe", "position": "Quality Analyst", "department": "QA", "salary": 55000, "employmentHistory": "Joined in 2018", "contact": "thabo.molefe@moderntech.com" },
              { "employeeId": 4, "name": "Keshav Naidoo", "position": "Sales Representative", "department": "Sales", "salary": 60000, "employmentHistory": "Joined in 2020", "contact": "keshav.naidoo@moderntech.com" },
              { "employeeId": 5, "name": "Zanele Khumalo", "position": "Marketing Specialist", "department": "Marketing", "salary": 58000, "employmentHistory": "Joined in 2019", "contact": "zanele.khumalo@moderntech.com" },
              { "employeeId": 6, "name": "Sipho Zulu", "position": "UI/UX Designer", "department": "Design", "salary": 65000, "employmentHistory": "Joined in 2016", "contact": "sipho.zulu@moderntech.com" },
              { "employeeId": 7, "name": "Naledi Moeketsi", "position": "DevOps Engineer", "department": "IT", "salary": 72000, "employmentHistory": "Joined in 2017", "contact": "naledi.moeketsi@moderntech.com" },
              { "employeeId": 8, "name": "Farai Gumbo", "position": "Content Strategist", "department": "Marketing", "salary": 56000, "employmentHistory": "Joined in 2021", "contact": "farai.gumbo@moderntech.com" },
              { "employeeId": 9, "name": "Karabo Dlamini", "position": "Accountant", "department": "Finance", "salary": 62000, "employmentHistory": "Joined in 2018", "contact": "karabo.dlamini@moderntech.com" },
              { "employeeId": 10, "name": "Fatima Patel", "position": "Customer Support Lead", "department": "Support", "salary": 58000, "employmentHistory": "Joined in 2016", "contact": "fatima.patel@moderntech.com" }
          ];
  
          // Function to display employee cards
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
  
          // Function to generate and show attendance graph for each employee
          function showAttendanceGraph(employeeId) {
              // Attendance data (for demonstration purposes)
              const attendanceData = {
                  labels: ["January", "February", "March", "April", "May"],
                  datasets: [{
                      label: 'Attendance',
                      data: [80, 90, 85, 75, 95], // Random attendance data
                      borderColor: 'rgba(75, 192, 192, 1)',
                      borderWidth: 1,
                      fill: false
                  }]
              };
  
              // Create the chart
              const ctx = document.getElementById('attendanceChart').getContext('2d');
              new Chart(ctx, {
                  type: 'line',
                  data: attendanceData,
                  options: {
                      scales: {
                          y: { beginAtZero: true }
                      }
                  }
              });
          }
  
          // Initialize the page by displaying the employee cards
          displayEmployees();