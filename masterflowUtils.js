const masterFlowFormUtils = (function() {
    // Private variables and functions
    const maxLength = 6;

    function checkInputValid(val) {
        if (maxLength === "44") {
            return /[a-z]{44}/.test(val);
        } else if (maxLength === "8") {
            return /^[0-9]{6}$|^[0-9]{8}$/.test(val);
        } else {
            return /^[0-9]{6}$/.test(val);
        }
    }

    // Public methods
    return {
        validateOTPInput: function(config) {
            const {
                inputId,
                feedbackId,
                submitId,
                highlightInput = false,
                autoSubmit = false
            } = config;

            const inputElement = document.getElementById(inputId);
            const feedbackElement = document.getElementById(feedbackId);
            const submitElement = document.getElementById(submitId);

            if (highlightInput) {
                inputElement.addEventListener('focus', function() {
                    $(inputElement).css('border', '1px solid red');
                });
            }

            inputElement.addEventListener('input', function() {
                const inputVal = this.value;

                // Check if the input is valid
                if (checkInputValid(inputVal)) {
                    // If valid, delay the submission to allow the last digit to appear
                    $(feedbackElement).css('display', 'none');
                    if (highlightInput) {
                        $(inputElement).css('border', '1px solid green');
                    }
                    if (autoSubmit) {
                        setTimeout(function() {
                            if (checkInputValid(inputVal)) {
                                submitElement.click();
                            }
                        }, 100); // Delay in milliseconds
                    }
                } else {
                    $(feedbackElement).css('display', 'block');
                    if (highlightInput) {
                        $(inputElement).css('border', '1px solid red');
                    }
                }
            });
        }
    };
})();
