document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("loginForm");
  const loginButton = document.getElementById("loginButton");
  const loginLoading = document.getElementById("loginLoading");
  const loginAlert = document.getElementById("loginAlert");

  if (loginForm) {
    loginForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const cnic = document.getElementById("loginCnic").value.trim();
      const password = document.getElementById("loginPassword").value.trim();

      // Basic CNIC validation
      if (!/^\d{13}$/.test(cnic)) {
        showAlert(
          loginAlert,
          "danger",
          "Please enter a valid 13-digit CNIC without dashes."
        );
        return;
      }
      if (!password) {
        showAlert(loginAlert, "danger", "Password is required.");
        return;
      }

      // Simulate loading state
      loginButton.disabled = true;
      loginLoading.classList.remove("d-none");
      showAlert(loginAlert, "info", "Logging you in… (demo only)");

      setTimeout(() => {
        loginButton.disabled = false;
        loginLoading.classList.add("d-none");
        showAlert(
          loginAlert,
          "success",
          "Login successful (demo). In a real system, you would now be redirected to the dashboard."
        );
      }, 1500);
    });
  }

  const returnForm = document.getElementById("returnForm");
  const rfLoading = document.getElementById("rfLoading");
  const rfSubmitBtn = document.getElementById("rfSubmitBtn");
  const rfAlert = document.getElementById("formAlert");
  const rfSummarySection = document.getElementById("rfSummarySection");
  const rfSummaryText = document.getElementById("rfSummaryText");

  if (returnForm) {
    returnForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const cnic = document.getElementById("rfCnic").value.trim();
      const taxYear = document.getElementById("rfTaxYear").value;
      const salaryIncome = Number(
        document.getElementById("rfSalaryIncome").value || 0
      );
      const otherIncome = Number(
        document.getElementById("rfOtherIncome").value || 0
      );
      const taxDeducted = Number(
        document.getElementById("rfTaxDeducted").value || 0
      );
      const advanceTax = Number(
        document.getElementById("rfAdvanceTax").value || 0
      );

      if (!/^\d{13}$/.test(cnic)) {
        showAlert(
          rfAlert,
          "danger",
          "Please enter a valid 13-digit CNIC without dashes."
        );
        rfSummarySection.classList.add("d-none");
        return;
      }

      if (!taxYear) {
        showAlert(rfAlert, "danger", "Please select a tax year.");
        rfSummarySection.classList.add("d-none");
        return;
      }

      rfSubmitBtn.disabled = true;
      rfLoading.classList.remove("d-none");
      showAlert(rfAlert, "info", "Validating and calculating (demo)…");

      setTimeout(() => {
        rfSubmitBtn.disabled = false;
        rfLoading.classList.add("d-none");

        const totalIncome = salaryIncome + otherIncome;
        // Very rough demo logic: pretend tax is 10% of income
        const estimatedTax = Math.round(totalIncome * 0.1);
        const totalPaid = taxDeducted + advanceTax;
        const diff = totalPaid - estimatedTax;

        let message;
        if (totalIncome === 0) {
          message =
            "You have reported zero income. In a real system, additional checks would be required.";
        } else if (diff > 0) {
          message = `Based on your demo data, your estimated tax is PKR ${estimatedTax.toLocaleString()}, and you already paid PKR ${totalPaid.toLocaleString()}. You may be eligible for a refund of approximately PKR ${Math.abs(
            diff
          ).toLocaleString()}.`;
        } else if (diff < 0) {
          message = `Based on your demo data, your estimated tax is PKR ${estimatedTax.toLocaleString()}, and you already paid PKR ${totalPaid.toLocaleString()}. You may still need to pay approximately PKR ${Math.abs(
            diff
          ).toLocaleString()}.`;
        } else {
          message =
            "Based on your demo data, your estimated tax matches the tax already paid. No additional tax or refund is due.";
        }

        rfSummaryText.textContent = message;
        rfSummarySection.classList.remove("d-none");
        showAlert(
          rfAlert,
          "success",
          "Summary calculated successfully (demo only)."
        );
      }, 1500);
    });
  }
});

function showAlert(element, type, message) {
  element.className = `alert alert-${type}`;
  element.textContent = message;
  element.classList.remove("d-none");
}