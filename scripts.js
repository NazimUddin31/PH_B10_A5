 
//Store Necessary DOM elements by ID
const donationInputNoakhali = document.getElementById('donation-input-noakhali');
const donateButtonNoakhali = document.getElementById('donate-button-noakhali');
const initialNoakhaliBalance = document.getElementById('initial-noakhali-balance');

const donationInputFeni = document.getElementById('donation-input-feni');
const donateButtonFeni = document.getElementById('donate-button-feni');
const initialFeniBalance = document.getElementById('initial-feni-balance');

const donationInputQuota = document.getElementById('donation-input-quota');
const donateButtonQuota = document.getElementById('donate-button-quota');
const initialQuotaBalance = document.getElementById('initial-quota-balance');

const initialTotalBalance = document.getElementById('initial-total-balance');
const donationModal = document.getElementById('successful-pop-up');
const continueButton = document.getElementById('btn-continue');
const historyModal = document.getElementById('history-pop-up');
const historyContent = document.getElementById('history-content');
const btnCloseHistory = document.getElementById('btn-close-history');

let donationHistory = [];

// Common function to handle donation
function handleDonation(amount, location, balanceElement) {
    // Validate the amount input
    if (!/^\d+(\.\d+)?$/.test(amount.trim())) {
        alert("Please enter a valid donation amount (numbers only, no letters or special characters).");
        return;
    }

    const parsedAmount = parseFloat(amount);
    if (parsedAmount > 0) {
        // Update the project balance
        const currentProjectBalance = parseFloat(balanceElement.innerText);
        balanceElement.innerText = (currentProjectBalance + parsedAmount).toFixed(2) + " BDT";

        // Update the total balance
        const currentTotalBalance = parseFloat(initialTotalBalance.innerText);
        initialTotalBalance.innerText = (currentTotalBalance - parsedAmount).toFixed(2) + " BDT";

        // Add the donation to the history
        const timestamp = new Date().toLocaleString();
        const donationDetails = `${parsedAmount} BDT is donated for flood at ${location}, Bangladesh on ${timestamp}`;
        donationHistory.push(donationDetails);
        
        // Show the donation confirmation modal
        donationModal.showModal();

    } else {
        alert("Please enter a valid donation amount.");
    }
}

// Function to show donation history in a popup
function showDonationHistory() {
    if (donationHistory.length === 0) {
        historyContent.innerHTML = "<div>No donations have been made yet.</div>";
    } else {
        historyContent.innerHTML = donationHistory.map(detail => `
            <div style="border: 2px solid #000; padding: 10px; margin-bottom: 10px;">
                ${detail}
            </div>
        `).join('');
    }
    historyModal.showModal();
}

// Add event listeners to donation buttons
donateButtonNoakhali.addEventListener('click', () => {
    const donationAmount = donationInputNoakhali.value;
    handleDonation(donationAmount, 'Noakhali', initialNoakhaliBalance);
    donationInputNoakhali.value = '';  
});

donateButtonFeni.addEventListener('click', () => {
    const donationAmount = donationInputFeni.value;
    handleDonation(donationAmount, 'Feni', initialFeniBalance);
    donationInputFeni.value = '';  
});

donateButtonQuota.addEventListener('click', () => {
    const donationAmount = donationInputQuota.value;
    handleDonation(donationAmount, 'Quota', initialQuotaBalance);
    donationInputQuota.value = '';  
});

// Event listener for closing the confirmation modal
continueButton.addEventListener('click', () => {
    donationModal.close();
});

// Event listener for the history button
document.getElementById('history').addEventListener('click', () => {
    showDonationHistory();  
});

// Event listener for closing the donation history modal
btnCloseHistory.addEventListener('click', () => {
    historyModal.close();
});

// Event listener for the Donation button
document.getElementById('donation').addEventListener('click', () => {
    document.getElementById('donation').style.backgroundColor = '#4caf50';  
});

// Event listener for the History button
document.getElementById('history').addEventListener('click', () => {
    document.getElementById('history').style.backgroundColor = '#4caf50'; 
});

 