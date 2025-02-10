const form = document.querySelector("form");
const fullName = document.getElementById("name");
const email = document.getElementById("email");
const phone = document.getElementById("phone");
const subject = document.getElementById("subject");
const message = document.getElementById("message");

function sendEmail() {
    const bodyMessage = `Full Name: ${fullName.value}<br>Email: ${email.value}<br>Phone Number: ${phone.value}<br>Message: ${message.value}`;

    const emailConfig = {
        SecureToken: "46a65270-4eff-41b9-a884-750880cfbdf2",
        To: 'okoiruelejonathan@gmail.com',
        From: "okoiruelejonathan@gmail.com",
        Subject: subject.value,
        Body: bodyMessage,
    };

    Email.send(emailConfig).then(response => {
        if (response === "OK") {
            showSuccessMessage();
        }
    });
}

function checkInputs() {
    const items = document.querySelectorAll(".item");

    items.forEach(item => {
        validateInput(item);
    });

    items[1].addEventListener("keyup", checkEmail);
}

function validateInput(item) {
    if (item.value === "") {
        addErrorStyles(item);
    } else {
        removeErrorStyles(item);
    }
}

function addErrorStyles(item) {
    item.classList.add("error");
    item.parentElement.classList.add("error");
}

function removeErrorStyles(item) {
    item.classList.remove("error");
    item.parentElement.classList.remove("error");
}

function checkEmail() {
    const emailRegex = /^([a-z\d\.-]+)@([a-z\d-]+)\.([a-z]{2,3})(\.[a-z]{2,3})?$/;
    const errorTxtEmail = document.querySelector(".error-txt.email");

    if (!email.value.match(emailRegex)) {
        displayError(email, errorTxtEmail, "Enter a valid email address");
    } else {
        clearError(email, errorTxtEmail);
    }
}

function displayError(input, errorTextElement, errorMessage) {
    addErrorStyles(input);
    errorTextElement.innerText = errorMessage;
}

function clearError(input, errorTextElement) {
    removeErrorStyles(input);
    errorTextElement.innerText = "";
}

function showSuccessMessage() {
    Swal.fire({
        title: "Success!",
        text: "Message sent successfully!",
        icon: "success"
    });
}

form.addEventListener("submit", (e) => {
    e.preventDefault();
    checkInputs();

    if (!hasErrors()) {
        sendEmail();
        form.reset();
    }
});

function hasErrors() {
    return (
        fullName.classList.contains("error") ||
        email.classList.contains("error") ||
        phone.classList.contains("error") ||
        subject.classList.contains("error") ||
        message.classList.contains("error") 
    );
}
