// Firebase configuration
const firebaseConfig = {
    apiKey: "your-api-key",
    authDomain: "your-auth-domain",
    databaseURL: "https://your-database-url.firebaseio.com",
    projectId: "your-project-id",
    storageBucket: "your-storage-bucket",
    messagingSenderId: "your-sender-id",
    appId: "your-app-id"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
const database = firebase.database(app);

// Function to add student to Firebase
document.getElementById('studentForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const studentName = document.getElementById('studentName').value;
    const selectedClubs = Array.from(document.getElementById('clubs').selectedOptions).map(option => option.value);

    if (studentName && selectedClubs.length > 0) {
        const student = { name: studentName, clubs: selectedClubs };
        
        // Save to Firebase
        const studentRef = database.ref('students').push();
        studentRef.set(student);

        alert('Student added successfully!');
        document.getElementById('studentForm').reset(); // Reset the form
    } else {
        alert('Please fill out all fields.');
    }
});

// Function to load students from Firebase on page load
window.onload = function() {
    const studentsRef = database.ref('students');
    studentsRef.on('value', snapshot => {
        students = snapshot.val() ? Object.values(snapshot.val()) : [];
    });
};

// To save to Firebase
const studentRef = firebase.database().ref('students').push();
studentRef.set(student);

// To load from Firebase
const studentsRef = firebase.database().ref('students');
studentsRef.on('value', (snapshot) => {
    students = snapshot.val() ? Object.values(snapshot.val()) : [];
});
