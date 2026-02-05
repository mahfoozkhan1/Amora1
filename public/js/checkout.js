document.addEventListener("DOMContentLoaded", () => {
    // Load Total Amount
    const finalAmount = localStorage.getItem("finalAmount") || "0";
    document.getElementById("checkout-total").innerText = `₹${finalAmount}`;

    document.getElementById("orderForm").addEventListener("submit", async (e) => {
        e.preventDefault();

        // 1. Capture User Details (Mocking backend save)
        const userDetails = {
            name: document.getElementById("name").value,
            phone: document.getElementById("phone").value,
            address: document.getElementById("address").value,
            amount: finalAmount,
            items: localStorage.getItem("cart")
        };
        console.log("Order Data:", userDetails);

        // 2. Switch to QR Payment View
        document.getElementById("checkout-form-container").classList.add("hidden");
        document.getElementById("payment-section").classList.remove("hidden");
        document.getElementById("qr-amount").innerText = `₹${finalAmount}`;

        // 3. Generate Dynamic UPI QR Code
        // Replace 'YOUR_UPI_ID_HERE' with your actual UPI ID (e.g., merchant@upi)
        // 'pn' is Payee Name (AMORA)
        const upiID = "YOUR_UPI_ID_HERE"; 
        const payeeName = "AMORA Candles";
        const qrData = `upi://pay?pa=${upiID}&pn=${payeeName}&am=${finalAmount}&cu=INR`;
        
        // Use a public QR generator API
        const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(qrData)}`;
        document.getElementById("upi-qr").src = qrUrl;
    });
});
