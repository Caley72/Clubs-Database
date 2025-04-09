# Student Club Management System

This is a simple web application for managing students and the clubs they belong to. The app allows administrators or users to:
- Add students along with their selected clubs and year.
- Save student data as an Excel file.
- Download the saved Excel file containing the student data.

### Features:
- **Add Students**: You can enter student information such as name, year, and clubs they belong to.
- **Save Data**: The application allows saving the student data to an **Excel file** (students_data.xlsx).
- **Download Data**: Users can download the saved data as an Excel file to their local machine.
- **Responsive Design**: The app is built to be responsive and can be accessed from both desktop and mobile devices.

---

## Table of Contents:
1. [Usage](#usage)
2. [Technologies Used](#technologies-used)
3. [License](#license)

---

## Usage

### 1. Access the Application:
Open your browser and go to `http://localhost:3000` to access the **Student Club Management** system.

### 2. Add a Student:
- Enter the student’s **name**, **year** (1, 2, or 3), and the **clubs** they belong to (comma-separated).
- Click the **Save Data** button to store the student's information.

### 3. Download the Data:
- After saving the student data, click the **Download Data** button to download the saved **students_data.xlsx** file.
- The file will contain the student information (name, year, and clubs) and can be opened in any program that supports Excel files.

### 4. How Data is Stored:
- The data entered by the user is stored in an **Excel file** on the server.
- The file is generated and saved as `students_data.xlsx`.
- Users can download this file whenever needed for backup or further analysis.

---

## Endpoints

### `POST /saveData`
- **Description**: Saves the student data as an Excel file.
- **Request Body**:
    ```json
    [
        {
            "name": "John Doe",
            "year": "1",
            "clubs": "Drama Club, Music Club"
        }
    ]
    ```

### `GET /downloadFile`
- **Description**: Allows users to download the saved Excel file (`students_data.xlsx`).
- **Response**: The user will download the Excel file containing the saved data.

---

## Technologies Used

- **Frontend**: 
    - HTML
    - JavaScript (Vanilla)
    - CSS

- **Backend**:
    - Node.js
    - Express
    - `xlsx` (for handling Excel files)
    - `body-parser` (for parsing incoming JSON requests)
    - `fs` (for file handling)