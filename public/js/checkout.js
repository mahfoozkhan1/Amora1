document.getElementById("orderForm").addEventListener("submit", async e => {
  e.preventDefault();

  const formData = new FormData();
  formData.append("items", localStorage.getItem("cart"));
  formData.append("address", JSON.stringify({
    address: document.getElementById("address").value
  }));
  formData.append("email", document.getElementById("email").value);
  formData.append("screenshot", e.target.screenshot.files[0]);

  const res = await fetch("/api/orders", {
    method: "POST",
    body: formData
  });

  if (res.ok) {
    localStorage.removeItem("cart");
    window.location.href = "/success.html";
  }
});
