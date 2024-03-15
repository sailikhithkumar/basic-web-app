// Event listener for form submission
document
  .getElementById('userForm')
  .addEventListener('submit', async (event) => {
    event.preventDefault();

    // Retrieve form data
    const formData = new FormData(event.target);
    const formDataObj = Object.fromEntries(formData.entries());

    try {
      // Send form data to server
      const response = await fetch('/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formDataObj),
      });

      // Handle server response
      if (!response.ok) {
        throw new Error('Failed to submit data');
      }

      alert('Data submitted successfully');
      event.target.reset();
      fetchUserData(); // Refresh user data table
    } catch (error) {
      console.error(error);
      alert('Error submitting data');
    }
  });

// Function to fetch user data from server
async function fetchUserData() {
  try {
    const response = await fetch('/users');
    const userData = await response.json();

    // Update user data table
    const userTableBody = document.getElementById('userTableBody');
    userTableBody.innerHTML = '';

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
  } catch (error) {
    console.error(error);
    alert('Error fetching user data');
  }
}

// Fetch user data when page loads
fetchUserData();
