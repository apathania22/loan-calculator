// EventListner for Submit
document.getElementById('loan-form').addEventListener('submit', function (e) {
    document.getElementById('loading').style.display = 'block';
    console
    document.getElementById('results').style.display = 'none';

    setTimeout(calculateResult, 2000)

    e.preventDefault();
});

// Calculate Results
function calculateResult() {
    const amount = document.getElementById('amount');
    const interest = document.getElementById('interest');
    const years = document.getElementById('years');
    const monthlyPayment = document.getElementById('monthly-payment');
    const totalPayment = document.getElementById('total-payment');
    const totalInterest = document.getElementById('total-interest');

    const principal = parseFloat(amount.value);
    const calculatedInterest = parseFloat(interest.value) / 100 / 12;
    const calculatedPayments = parseFloat(years.value) * 12;

    // Compute the payments
    const x = Math.pow(1 + calculatedInterest, calculatedPayments);
    const monthly = (principal * x * calculatedInterest) / (x - 1);

    if (isFinite(monthly)) {
        monthlyPayment.value = monthly.toFixed(2);
        totalPayment.value = (monthly * calculatedPayments).toFixed(2);
        totalInterest.value = ((monthly * calculatedPayments) - principal).toFixed(2);

        document.getElementById('results').style.display = 'block';

        document.getElementById('loading').style.display = 'none';
    } else {
        showError('Please check your number');
    }

}

function showError(err) {

    document.getElementById('results').style.display = 'none';

    document.getElementById('loading').style.display = 'none';
    // Create div
    const errorDiv = document.createElement('div');

    // Get Elements
    const card = document.querySelector('.card');
    const heading = document.querySelector('.heading');

    // Add Class 
    errorDiv.className = 'alert alert-danger';

    // Create text node and append to div
    errorDiv.appendChild(document.createTextNode(err));

    card.insertBefore(errorDiv, heading);

    setTimeout(errOut, 3000);
}

function errOut() {
    document.querySelector('.alert').remove();
}