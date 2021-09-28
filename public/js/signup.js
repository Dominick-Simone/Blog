async function signupForm(event) {
    event.preventDefault();

    const username = document.querySelector('#signUpUsername').value.trim();
    const password = document.querySelector('#signUpPassword').value.trim();

    if (username && password) {
        const response = await fetch('/api/user/signup', {
            method: 'POST',
            body: JSON.stringify({
                username,  
                password
            }),
            headers: { 'Content-Type': 'application/json' }
        });

        if (response.ok) {
            console.log("Successfully created new user!");
            document.location.replace('/dashboard');
        } else {
            alert("Failed to create user");
        }
    }
}

document.querySelector('.signupForm').addEventListener('submit', signupForm);
