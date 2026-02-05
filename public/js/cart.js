// amora/public/js/cart.js

// Initialize cart from LocalStorage
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Function to add item to cart (with Quantity Check)
function addToCart(product) {
    // 1. Check if the product already exists in the cart by name
    const existingItem = cart.find(item => item.name === product.name);

    if (existingItem) {
        // 2. If it exists, increment the quantity
        existingItem.quantity = (existingItem.quantity || 1) + 1;
    } else {
        // 3. If it's new, set quantity to 1 and push to cart
        product.quantity = 1;
        cart.push(product);
    }

    // 4. Save updated cart to LocalStorage
    localStorage.setItem("cart", JSON.stringify(cart));

    // 5. Redirect to cart page
    window.location.href = "cart.html";
}

// Function to remove an item
function removeFromCart(index) {
    cart.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(cart));
    loadCartItems(); // Re-render the cart
}

// Function to load items on cart.html
function loadCartItems() {
    const cartContainer = document.getElementById("cart-items");
    const summaryContainer = document.getElementById("cart-summary");

    // Only run this if we are on the cart page
    if (!cartContainer) return;

    cartContainer.innerHTML = "";
    let subtotal = 0;

    if (cart.length === 0) {
        cartContainer.innerHTML = "<p class='text-center text-gray-500 py-10'>Your cart is empty.</p>";
        if (summaryContainer) summaryContainer.style.display = 'none';
        return;
    }

    // Loop through items and display them
    cart.forEach((item, index) => {
        // Ensure quantity exists (default to 1 if missing)
        const quantity = item.quantity || 1;
        const itemTotal = item.price * quantity;
        subtotal += itemTotal;

        // Generate the "2x" label if quantity > 1
        const quantityLabel = quantity > 1 ? `<span class="text-amora-gold font-bold ml-2">${quantity}x</span>` : "";

        cartContainer.innerHTML += `
            <div class="flex items-center justify-between bg-white p-4 rounded-lg shadow-sm mb-3">
                <div class="flex items-center space-x-4">
                    <div>
                        <h3 class="font-serif font-bold text-amora-dark text-lg">
                            ${item.name} ${quantityLabel}
                        </h3>
                        <p class="text-amora-gold">₹${itemTotal} <span class="text-xs text-gray-400">(@ ₹${item.price})</span></p>
                    </div>
                </div>
                <button onclick="removeFromCart(${index})" class="text-red-400 hover:text-red-600 transition-colors">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        `;
    });

    // Update Summary
    const deliveryCharge = 50;
    const finalAmount = subtotal + deliveryCharge;

    if (document.getElementById("subtotal")) {
        document.getElementById("subtotal").innerText = `₹${subtotal}`;
        document.getElementById("delivery").innerText = `₹${deliveryCharge}`;
        document.getElementById("total").innerText = `₹${finalAmount}`;
    }
}

// Automatically load items if on the cart page
if (window.location.pathname.includes("cart.html")) {
    loadCartItems();
}
