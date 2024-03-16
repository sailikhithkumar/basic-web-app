// Function to submit form data
async function submitForm() {
  const nameInput = document.getElementById('name');
  const emailInput = document.getElementById('email');
  const ageInput = document.getElementById('age');
  const dobInput = document.getElementById('dob');

  // Name validation: Max length 20 characters
  if (nameInput.value.length > 20) {
    alert('Name should not exceed 20 characters');
    nameInput.focus();
    return;
  }

  // Email validation: Proper email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(emailInput.value)) {
    alert('Please enter a valid email address');
    emailInput.focus();
    return;
  }

  // Age validation: Max 3 digits
  if (ageInput.value.length > 3) {
    alert('Age should not exceed 3 digits');
    ageInput.focus();
    return;
  }

  // Date validation: Not future date
  const currentDate = new Date().toISOString().split('T')[0];
  if (dobInput.value > currentDate) {
    alert('Date of Birth cannot be a future date');
    dobInput.focus();
    return;
  }

  const formData = new FormData(document.getElementById('userForm'));
  const formDataObj = Object.fromEntries(formData.entries());

  try {
    const response = await fetch('/submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formDataObj),
    });

    if (!response.ok) {
      throw new Error('Failed to submit data');
    }

    alert('Data submitted successfully');
    document.getElementById('userForm').reset();
    await fetchUserData(); // Refresh user data table immediately after submission
  } catch (error) {
    console.error(error);
    alert('Error submitting data');
  }
}

// Function to toggle user data table visibility
async function toggleUserData() {
  const userTableContainer = document.getElementById('userTableContainer');
  const showUsersBtn = document.getElementById('showUsersBtn');

  if (userTableContainer.style.display === 'none') {
    userTableContainer.style.display = 'block';
    await fetchUserData();
    showUsersBtn.textContent = 'Hide Users'; // Change button text to "Hide Users" when showing users
  } else {
    userTableContainer.style.display = 'none';
    showUsersBtn.textContent = 'Show Users'; // Change button text to "Show Users" when hiding users
  }
}

// Function to fetch and display user data
async function fetchUserData() {
  try {
    const response = await fetch('/users');
    if (!response.ok) {
      throw new Error('Failed to fetch user data');
    }
    const userData = await response.json();
    displayUserData(userData);
  } catch (error) {
    console.error(error);
    alert('Error fetching user data');
  }
}

// Function to display user data in table format
function displayUserData(userData) {
  const userTableBody = document.getElementById('userTableBody');
  userTableBody.innerHTML = ''; // Clear existing rows
  userData.forEach((user) => {
    const row = document.createElement('tr');
    row.innerHTML = `
          <td>${user.id}</td>
          <td>${user.name}</td>
          <td>${user.email}</td>
          <td>${user.age}</td>
          <td>${user.dob}</td>
      `;
    userTableBody.appendChild(row);
  });
}

// Function to clear user data
async function clearUserData() {
  try {
    const response = await fetch('/users', {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error('Failed to clear user data');
    }
    document.getElementById('userTableBody').innerHTML = '';
  } catch (error) {
    console.error(error);
    alert('Error clearing user data');
  }
}

// Add event listeners to validate fields on blur
document.getElementById('name').addEventListener('blur', validateName);
document.getElementById('email').addEventListener('blur', validateEmail);
document.getElementById('age').addEventListener('blur', validateAge);
document.getElementById('dob').addEventListener('blur', validateDate);

// Function to validate name
function validateName() {
  const nameInput = document.getElementById('name');
  const nameValue = nameInput.value.trim();

  if (nameValue === '') {
    setError(nameInput, 'Name is required');
  } else {
    clearError(nameInput);
  }
}

// Function to validate email
function validateEmail() {
  const emailInput = document.getElementById('email');
  const emailValue = emailInput.value.trim();

  if (emailValue === '') {
    setError(emailInput, 'Email is required');
  } else {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailValue)) {
      setError(emailInput, 'Please enter a valid email address');
    } else {
      clearError(emailInput);
    }
  }
}

// Function to validate age
function validateAge() {
  const ageInput = document.getElementById('age');
  const ageValue = ageInput.value.trim();

  if (ageValue === '') {
    setError(ageInput, 'Age is required');
  } else {
    const ageRegex = /^\d{1,3}$/;
    if (!ageRegex.test(ageValue)) {
      setError(ageInput, 'Please enter a valid age');
    } else {
      clearError(ageInput);
    }
  }
}

// Function to validate date
function validateDate() {
  const dobInput = document.getElementById('dob');
  const dobValue = dobInput.value.trim();

  if (dobValue === '') {
    setError(dobInput, 'Date of Birth is required');
  } else {
    const currentDate = new Date().toISOString().split('T')[0];
    if (dobValue > currentDate) {
      setError(dobInput, 'Date of Birth cannot be a future date');
    } else {
      clearError(dobInput);
    }
  }
}

// Function to set error message
function setError(input, message) {
  const formControl = input.parentElement;
  const errorText = formControl.querySelector('.error-text');
  errorText.innerText = message;
  formControl.classList.add('error');
}

// Function to clear error message
function clearError(input) {
  const formControl = input.parentElement;
  formControl.querySelector('.error-text').innerText = '';
  formControl.classList.remove('error');
}
