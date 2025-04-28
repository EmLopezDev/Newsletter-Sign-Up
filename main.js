const emailInput = document.getElementById("email");
const subscribeButton = document.getElementById("subscribe");
const dismissButton = document.getElementById("dismiss");
const errorSpan = document.getElementById("error");
const successEmailSpan = document.getElementById("success-email");
const defaultCard = document.getElementById("card-default");
const successCard = document.getElementById("card-success");

const clear = () => {
    subscribeButton.setAttribute("disabled", "true");
    errorSpan.innerText = "";
    subscribeButton.classList.remove("active");
    emailInput.value = "";
};

const defaultState = () => {
    defaultCard.classList.remove("hidden");
    successCard.classList.add("hidden");
    clear();
};

const errorState = () => {
    subscribeButton.classList.remove("active");
    emailInput.classList.add("error");
    errorSpan.innerText = "Valid email required";
};

const isEmailValid = (email) => {
    const sanitize = email.trim();
    if (sanitize === "") return false;
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(sanitize);
};

const onSubmit = (e) => {
    e.preventDefault();
    if (!isEmailValid(emailInput.value)) {
        errorState();
    } else {
        successEmailSpan.innerText = emailInput.value.trim();
        defaultCard.classList.add("hidden");
        successCard.classList.remove("hidden");
    }
};

emailInput.addEventListener("input", (e) => {
    const value = e.target.value;
    if (!value) {
        clear();
        return;
    }
    errorSpan.innerText = "";
    emailInput.classList.remove("error");
    subscribeButton.removeAttribute("disabled");
    subscribeButton.classList.add("active");
});

subscribeButton.addEventListener("click", (e) => onSubmit(e));
subscribeButton.addEventListener("keydown", (e) => {
    e.key === "Enter" ? onSubmit(e) : "";
});

dismissButton.addEventListener("click", () => {
    defaultState();
});

dismissButton.addEventListener("keydown", (e) => {
    e.key === "Enter" ? defaultState() : "";
});
