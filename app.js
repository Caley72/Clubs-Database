let students = [];
let oldStudents = []; // To store students promoted to "old students"

// Function to handle student submission
document.getElementById('studentForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const studentName = document.getElementById('studentName').value;
    const selectedClubs = Array.from(document.getElementById('clubs').selectedOptions).map(option => option.value);
    const year = document.getElementById('year').value;

    if (studentName && selectedClubs.length > 0 && year) {
        // Get the current date when the student is added
        const dateAdded = new Date().toLocaleDateString();

        // Create a new student object with the dateAdded property
        const student = {
            name: studentName,
            clubs: selectedClubs.map(club => ({ name: club, dateAdded: dateAdded })),
            year: year
        };

        students.push(student);
        localStorage.setItem('students', JSON.stringify(students)); // Save to localStorage

        alert('Student added successfully!');
        document.getElementById('studentForm').reset(); // Reset the form
    } else {
        alert('Please fill out all fields.');
    }
});


// Function to promote students
function promoteStudents() {
    const now = new Date();
    const currentMonth = now.getMonth() + 1; // Get current month (1-12)

    // Only promote at the end of the academic year (let's assume it's in December)
    if (currentMonth !== 12) {
        alert('Promotion can only be done in December.');
        return;
    }

    // Promote students based on their current year
    students.forEach(student => {
        if (student.year === '1') {
            student.year = '2';
        } else if (student.year === '2') {
            student.year = '3';
        } else if (student.year === '3') {
            oldStudents.push(student);
        }
    });

    // Remove 3rd-year students from the active list
    students = students.filter(student => student.year !== '3');

    // Save the updated list to localStorage
    localStorage.setItem('students', JSON.stringify(students));
    localStorage.setItem('oldStudents', JSON.stringify(oldStudents));

    alert('Students have been promoted!');
}

// Function to remove a student from a particular club
function removeStudentFromClub(studentName, clubName) {
    const student = students.find(s => s.name === studentName);

    if (!student) {
        alert('Student not found.');
        return;
    }

    // Find the club the student is in and remove it
    const clubIndex = student.clubs.findIndex(club => club.name === clubName);
    if (clubIndex !== -1) {
        student.clubs.splice(clubIndex, 1); // Remove the club from the student's list
        localStorage.setItem('students', JSON.stringify(students)); // Update localStorage
        alert(`${studentName} has been removed from ${clubName}.`);
    } else {
        alert(`${studentName} is not in the ${clubName}.`);
    }
}

// Function to clear all students in a specific year group
function clearYearGroup(year) {
    students = students.filter(student => student.year !== year);
    localStorage.setItem('students', JSON.stringify(students));
    alert(`All ${year} Year students have been cleared.`);
}

// Function to clear old students
function clearOldStudents() {
    oldStudents = [];
    localStorage.setItem('oldStudents', JSON.stringify(oldStudents));
    alert('All old students have been cleared.');
}

// Function to clear an individual student
function clearIndividualStudent(studentName) {
    // Remove from current students
    students = students.filter(student => student.name !== studentName);
    
    // Remove from old students if they exist
    oldStudents = oldStudents.filter(student => student.name !== studentName);

    // Save the updated lists to localStorage
    localStorage.setItem('students', JSON.stringify(students));
    localStorage.setItem('oldStudents', JSON.stringify(oldStudents));

    alert(`Student ${studentName} has been cleared.`);
}

// Function to clear the database
function clearDatabase() {
    // Clear students and old students data in localStorage
    localStorage.removeItem('students');
    localStorage.removeItem('oldStudents');
    students = [];
    oldStudents = [];

    alert('Database has been cleared!');
}


// Function to search for students or clubs
function search() {
    const searchInput = document.getElementById('searchInput').value.toLowerCase();
    const results = [];
    const shiftPressed = event.shiftKey; // Check if Shift is pressed

    if (shiftPressed) {
        // If Shift is pressed, show old students
        oldStudents.forEach(student => {
            if (student.name.toLowerCase().includes(searchInput) || student.clubs.some(club => club.name.toLowerCase().includes(searchInput))) {
                results.push(student);
            }
        });
    } else {
        // Otherwise, show only current students
        students.forEach(student => {
            if (student.name.toLowerCase().includes(searchInput) || student.clubs.some(club => club.name.toLowerCase().includes(searchInput))) {
                results.push(student);
            }
        });
    }

    // Display search results
    const resultsDiv = document.getElementById('searchResults');
    resultsDiv.innerHTML = '';

    if (results.length > 0) {
        results.forEach(student => {
            const studentElement = document.createElement('div');
            studentElement.innerHTML = `<strong>${student.name}</strong> (Year ${student.year}) is in: ${student.clubs.map(club => `${club.name} (Added on ${club.dateAdded})`).join(', ')}`;
            resultsDiv.appendChild(studentElement);
        });
    } else {
        resultsDiv.innerHTML = 'No results found.';
    }
}

// Function to show all students in a specific club
function showStudentsByClub(clubName) {
    const clubResults = students.filter(student => student.clubs.some(club => club.name === clubName));
    
    const resultsDiv = document.getElementById('clubResults');
    resultsDiv.innerHTML = '';

    if (clubResults.length > 0) {
        resultsDiv.innerHTML = `<h3>Students in ${clubName}:</h3>`;
        clubResults.forEach(student => {
            const studentElement = document.createElement('div');
            const club = student.clubs.find(c => c.name === clubName);
            studentElement.innerHTML = `<strong>${student.name}</strong> (Year ${student.year}) - Added on ${club.dateAdded}`;
            resultsDiv.appendChild(studentElement);
        });
    } else {
        resultsDiv.innerHTML = `No students in ${clubName} club.`;
    }
}

// Load students and old students from localStorage on page load
window.onload = function() {
    const storedStudents = localStorage.getItem('students');
    const storedOldStudents = localStorage.getItem('oldStudents');

    if (storedStudents) {
        students = JSON.parse(storedStudents);
    }
    if (storedOldStudents) {
        oldStudents = JSON.parse(storedOldStudents);
    }
};


// Example student data for testing purposes
let student = [
    { name: "John Doe", year: "1", clubs: [{ name: "Drama Club", dateAdded: "2024-09-01" }, { name: "Music Club", dateAdded: "2024-09-15" }] },
    { name: "Jane Smith", year: "2", clubs: [{ name: "Sports Club", dateAdded: "2023-08-05" }, { name: "Art Club", dateAdded: "2024-02-10" }] }
];

// Function to export data based on student name
function exportStudentToExcel() {
    const studentName = document.getElementById('studentExportName').value.trim();
    if (studentName === '') {
        alert('Please enter a student name.');
        return;
    }

    // Find the student by name
    const student = students.find(s => s.name.toLowerCase() === studentName.toLowerCase());
    if (!student) {
        alert('Student not found.');
        return;
    }

    // Prepare the data for the student
    const data = student.clubs.map(club => ({
        "Student Name": student.name,
        "Year": student.year,
        "Club": club.name,
        "Date Added": club.dateAdded
    }));

    // Create the Excel file
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet(data);
    XLSX.utils.book_append_sheet(wb, ws, "Student Data");
    XLSX.writeFile(wb, `${studentName}_data.xlsx`);
}

// Function to export data based on club name
function exportClubToExcel() {
    const clubName = document.getElementById('clubExportName').value.trim();
    if (clubName === '') {
        alert('Please enter a club name.');
        return;
    }

    // Find the club's data
    const clubData = [];
    students.forEach(student => {
        student.clubs.forEach(club => {
            if (club.name.toLowerCase() === clubName.toLowerCase()) {
                clubData.push({
                    "Student Name": student.name,
                    "Year": student.year,
                    "Club": club.name,
                    "Date Added": club.dateAdded
                });
            }
        });
    });

    if (clubData.length === 0) {
        alert('No students found in this club.');
        return;
    }

    // Create the Excel file
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet(clubData);
    XLSX.utils.book_append_sheet(wb, ws, `${clubName} Club Data`);
    XLSX.writeFile(wb, `${clubName}_data.xlsx`);
}

// Event listeners for export buttons
document.getElementById('exportStudentButton').addEventListener('click', exportStudentToExcel);
document.getElementById('exportClubButton').addEventListener('click', exportClubToExcel);


// Save data to local storage (or retrieve it if already saved)
function saveData() {
    const data = {
        students: students, // Array of students with their clubs and year data
    };
    localStorage.setItem("studentClubData", JSON.stringify(data)); // Save to localStorage
}

// Load data from local storage
function loadData() {
    const savedData = localStorage.getItem("studentClubData");
    if (savedData) {
        const parsedData = JSON.parse(savedData);
        return parsedData.students; // Return the loaded student data
    }
    return []; // Return empty array if no data is stored
}

// Example usage:
const Students = loadData(); // Load students when the page is loaded

// When a new student is added, save the data:
saveData();  // Save all the students' data

