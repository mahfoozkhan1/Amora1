async function loadOrders() {
  const password = document.getElementById("password").value;

  const res = await fetch("/api/admin", {
    headers: { password }
  });

  const orders = await res.json();
  const container = document.getElementById("orders");

  container.innerHTML = orders.map(o => `
    <div>
      <p>${o.email} | ${o.status}</p>
      <img src="/uploads/${o.paymentScreenshot}" width="150">
      <button onclick="update('${o._id}','PAID')">Mark Paid</button>
      <button onclick="update('${o._id}','SHIPPED')">Mark Shipped</button>
    </div>
  `).join("");
}

async function update(id, status) {
  await fetch("/api/admin/update", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id, status })
  });
  loadOrders();
}
