document.getElementById("ageForm").addEventListener("submit", function (event) {
    event.preventDefault(); 

    const nameInput = document.getElementById("name");
    const emailInput = document.getElementById("email");

    const name = nameInput.value.trim();
    const email = emailInput.value.trim();

    if (!name) {
        alert("Enter your full name!");
        nameInput.focus();
        return;
    }

    if (!email) {
        alert("Email is Mandatory!");
        emailInput.focus();
        return;
    }

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
        alert("Use Correct Email");
        emailInput.focus();
        return;
    }

    fetchPredictedAge(name);

    document.getElementById("ageForm").reset();
});

async function fetchPredictedAge(name) {
    try {
        const response = await fetch(`https://api.agify.io?name=${encodeURIComponent(name)}`);
        if (!response.ok) {
            throw new Error("Failed to fetch data");
        }
        const data = await response.json();
        console.log("Predicted Age:", data.age); 
        alert(`Hello, ${name}! Your age is: ${data.age || "unknown"}`);
    } catch (error) {
        console.error("Error:", error);
        alert("Error: Could not fetch the predicted age. Please try again.");
    }
}

