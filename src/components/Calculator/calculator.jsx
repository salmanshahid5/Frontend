import { useState } from "react";
import "./calculator.css"; // Import the CSS file

const LoanCalculator = () => {
  const [category, setCategory] = useState("wedding");
  const [subcategory, setSubcategory] = useState("");
  const [initialDeposit, setInitialDeposit] = useState("");
  const [desiredLoan, setDesiredLoan] = useState("");
  const [loanPeriod, setLoanPeriod] = useState("");
  const [remainingLoan, setRemainingLoan] = useState(null);
  const [monthlyPayment, setMonthlyPayment] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  const categories = {
    wedding: { maxLoan: 500000, maxYears: 3, subcategories: ["Valima", "Furniture", "Food", "Jahez"] },
    home: { maxLoan: 1000000, maxYears: 5, subcategories: ["Structure", "Finishing"] },
    business: { maxLoan: 1000000, maxYears: 5, subcategories: ["Buy Stall", "Advance Rent for Shop", "Shop Assets", "Shop Machinery"] },
    education: { maxLoan: Infinity, maxYears: 4, subcategories: ["University Fees", "Child Fees"] },
  };

  const calculateLoan = () => {
    if (!initialDeposit || !desiredLoan || !loanPeriod || !category || !subcategory) {
      setErrorMessage("Please fill all the fields correctly.");
      return;
    }

    const selectedCategory = categories[category];
    const remaining = parseFloat(desiredLoan) - parseFloat(initialDeposit);

    if (remaining < 0) {
      setErrorMessage("Initial deposit cannot exceed the desired loan amount.");
      return;
    }

    if (remaining > selectedCategory.maxLoan) {
      setErrorMessage(`Maximum loan for this category is PKR ${selectedCategory.maxLoan}.`);
      return;
    }

    if (parseFloat(loanPeriod) > selectedCategory.maxYears) {
      setErrorMessage(`Maximum loan period for this category is ${selectedCategory.maxYears} years.`);
      return;
    }

    const monthlyInstallment = remaining / (parseFloat(loanPeriod) * 12);

    setRemainingLoan(remaining.toFixed(2));
    setMonthlyPayment(monthlyInstallment.toFixed(2));
    setErrorMessage("");
  };

  return (
    <div className="loan-calculator-container">
      <h2 className="title">Loan Calculator</h2>
      <div className="form-container">
        <div className="form-group">
          <label className="label">Select Loan Category</label>
          <select
            className="input"
            value={category}
            onChange={(e) => {
              setCategory(e.target.value);
              setSubcategory(""); // Reset subcategory when category changes
            }}
          >
            <option value="wedding">Wedding Loans</option>
            <option value="home">Home Construction Loans</option>
            <option value="business">Business Startup Loans</option>
            <option value="education">Education Loans</option>
          </select>
        </div>

        <div className="form-group">
          <label className="label">Select Subcategory</label>
          <select
            className="input"
            value={subcategory}
            onChange={(e) => setSubcategory(e.target.value)}
            disabled={!category}
          >
            <option value="">-- Select Subcategory --</option>
            {category &&
              categories[category].subcategories.map((sub, index) => (
                <option key={index} value={sub}>
                  {sub}
                </option>
              ))}
          </select>
        </div>

        <div className="form-group">
          <label className="label">Initial Deposit (PKR)</label>
          <input
            type="number"
            className="input"
            placeholder="Enter your initial deposit"
            value={initialDeposit}
            onChange={(e) => setInitialDeposit(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label className="label">Desired Loan Amount (PKR)</label>
          <input
            type="number"
            className="input"
            placeholder="Enter the desired loan amount"
            value={desiredLoan}
            onChange={(e) => setDesiredLoan(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label className="label">Loan Period (Years)</label>
          <input
            type="number"
            className="input"
            placeholder="Enter the loan repayment period in years"
            value={loanPeriod}
            onChange={(e) => setLoanPeriod(e.target.value)}
          />
        </div>

        <button
          className="btn-calculate"
          onClick={calculateLoan}
        >
          Calculate Loan
        </button>

        {errorMessage && <p className="error-message">{errorMessage}</p>}

        {remainingLoan !== null && monthlyPayment !== null && (
          <div className="result">
            <p>Remaining Loan Amount: PKR {remainingLoan}</p>
            <p>Monthly Payment: PKR {monthlyPayment}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default LoanCalculator;
