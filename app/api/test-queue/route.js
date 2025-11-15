async function testBooking() {
  const response = await fetch("http://localhost:3000/api/book-slot", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name: "Test User",
      email: "testuser@example.com",
      phone: "08012345678",
      company: "Test Co",
      website: "https://example.com",
      industry: "IT",
      consultationType: "Strategy Call",
      message: "Testing the booking flow",
      consentNDPR: true,
      consentNewsletter: true,
      slotStart: new Date(Date.now() + 3600_000).toISOString(), // 1 hour from now
      slotEnd: new Date(Date.now() + 3600_000 + 30*60*1000).toISOString() // 30-min slot
    }),
  });

  const data = await response.json();
  console.log("Booking response:", data);
}

testBooking();
