
const circles = document.querySelectorAll(".circle"),
      progressBar = document.querySelector(".indicator"),
      buttons = document.querySelectorAll("button"),
      submitButton = document.getElementById("submit");

let currentStep = 1;

// Function to validate current step
const validateCurrentStep = () => {
    const currentFormStep = document.querySelector(`.form-step.active`);
    const requiredInputs = currentFormStep.querySelectorAll("input[required], select[required]");
    
    let allValid = true; // Flag to track validity

    // Check required inputs first
    requiredInputs.forEach(input => {
        if (!input.value && !input.checked) {
            input.classList.add("error"); // Add error styling
            allValid = false; // Set flag to false if invalid
        } else {
            input.classList.remove("error"); // Remove error styling if valid
        }
    });

    if (!allValid) {
        alert("Please complete all required fields in this step.");
        return false; // Exit if required fields are not filled
    }

    // Proceed to specific checks only if all required inputs are valid
    if (currentStep === 1) {
        // Email validation
        const emailInput = currentFormStep.querySelector('input[type="email"]');
        if (emailInput && (!emailInput.value.includes('@') || emailInput.value.indexOf('@') === 0)) {
            alert("Please enter a valid email address that includes '@'.");
            emailInput.classList.add("error");
            return false; // Exit if email is invalid
        }

        // Landline validation
        const landlineInput = currentFormStep.querySelector('input[name="landline"]');
        if (landlineInput && landlineInput.value && !/^\d{7,15}$/.test(landlineInput.value)) {
            alert("Please enter a valid landline number (7 to 15 digits).");
            landlineInput.classList.add("error");
            return false; // Exit if landline is invalid
        }

        // Cellphone validation
        const cellphoneInput = currentFormStep.querySelector('input[name="Cellphone"]');
        if (cellphoneInput && cellphoneInput.value && !/^\d{11}$/.test(cellphoneInput.value)) {
            alert("Please enter a valid cellphone number (11 digits).");
            cellphoneInput.classList.add("error");
            return false; // Exit if cellphone is invalid
        }
    } else if (currentStep === 2) {
        // Medical attention validation
        const medicalAttentionYes = document.querySelector('input[name="medical-attention"][value="yes"]:checked');
        const medicalAttentionNo = document.querySelector('input[name="medical-attention"][value="no"]:checked');
        
        if (!medicalAttentionYes && !medicalAttentionNo) {
            alert("Please select whether you need medical attention.");
            return false; // Exit if medical attention is not selected
        }

        // Allergies validation
        const noAllergiesCheckbox = document.getElementById("no-food-allergies");
        const foodAllergiesInput = document.getElementById("food-allergies");

        if (noAllergiesCheckbox.checked && foodAllergiesInput.value) {
            alert("You cannot select 'No Known Allergies' and specify an allergy at the same time.");
            return false; // Exit if both options are selected
        }

        if (!noAllergiesCheckbox.checked && !foodAllergiesInput.value) {
            alert("Please specify your food allergies or select 'No Known Allergies'.");
            return false; // Exit if neither option is selected
        }
    } else if (currentStep === 3) {
        // Step 3 validation for smoking and alcohol radio buttons
        const smokingYes = document.querySelector('input[name="smoking"][value="yes"]:checked');
        const smokingNo = document.querySelector('input[name="smoking"][value="no"]:checked');
        const alcoholYes = document.querySelector('input[name="alcohol"][value="yes"]:checked');
        const alcoholNo = document.querySelector('input[name="alcohol"][value="no"]:checked');
        
        if (!smokingYes && !smokingNo) {
            alert("Please select whether you smoke.");
            return false; // Exit if smoking option is not selected
        }

        if (!alcoholYes && !alcoholNo) {
            alert("Please select whether you drink alcohol.");
            return false; // Exit if alcohol option is not selected
        }
    }

    return true; // All validations passed
};



const updateSteps = (e) => {
    // Move to the next step
    if (e.target.id === "next" && currentStep < circles.length) {
        if (validateCurrentStep()) {
            currentStep++;
        } else {
            alert("Please complete all required fields in this step.");
        }
    } 
    // Move to the previous step
    else if (e.target.id === "prev" && currentStep > 1) {
        currentStep--; // Go back without validation
    } 
    // Handle circle click
    else if (e.target.classList.contains("circle")) {
        const stepIndex = Array.from(circles).indexOf(e.target) + 1;

        // Allow going back to any previous step
        if (stepIndex < currentStep) {
            currentStep = stepIndex; // Go back to the clicked step
        } 
        // Prevent jumping to a future step
        else if (stepIndex === currentStep + 1) {
            if (validateCurrentStep()) {
                currentStep++; // Move to the next step only if current is valid
            } else {
                alert("Please complete the previous steps before moving to the next step.");
            }
        }
    }

    updateUI();
};



// Function to update the UI based on the current step
const updateUI = () => {
    circles.forEach((circle, index) => {
        circle.classList[index < currentStep ? "add" : "remove"]("active");
    });

    // Show the corresponding form step
    document.querySelectorAll('.form-step').forEach((formStep, index) => {
        formStep.classList[index === currentStep - 1 ? "add" : "remove"]("active");
    });

    progressBar.style.width = `${((currentStep - 1) / (circles.length - 1)) * 100}%`;

    // Enable "Prev" button on all steps except the first one
    buttons[0].disabled = currentStep === 1; // Prev button
    
    // Hide "Next" button on the last step
    if (currentStep === circles.length) {
        buttons[1].style.display = 'none'; // Next button
        submitButton.style.display = 'block'; // Show submit button
    } else {
        buttons[1].style.display = 'block'; // Show "Next" button
        submitButton.style.display = 'none'; // Hide submit button
    }
};

// Add click event listeners to buttons and circles
buttons.forEach((button) => {
    button.addEventListener("click", updateSteps);
});

circles.forEach((circle) => {
    circle.addEventListener("click", updateSteps);
});

// Initial UI update
updateUI();
