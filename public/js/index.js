// Function to submit form data
function submitForm() {
  const formData = new FormData(document.getElementById('userForm'));
  const formDataObj = Object.fromEntries(formData.entries());

  fetch('/submit', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(formDataObj),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error('Failed to submit data');
      }
      alert('Data submitted successfully');
      document.getElementById('userForm').reset();
      fetchUserData(); // Refresh user data table
    })
    .catch((error) => {
      console.error(error);
      alert('Error submitting data');
    });
}

// Function to show users
function showUsers() {
  fetch('/users')
    .then((response) => {
      if (!response.ok) {
        throw new Error('Failed to fetch user data');
      }
      return response.json();
    })
    .then((userData) => {
      displayUserData(userData);
    })
    .catch((error) => {
      console.error(error);
      alert('Error fetching user data');
    });
}
