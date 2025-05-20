async function loadVendors() {
  try {
    const response = await fetch('http://localhost:3000/vendors');
    const vendors = await response.json();

    const vendorList = document.getElementById('vendor-list');

    vendors.forEach(vendor => {
      const card = document.createElement('vendor-card');
      card.setAttribute('vendor-name', vendor.name);
      card.setAttribute('cuisine', vendor.cuisine_type); // Correct field name
      card.setAttribute('vendor-id', vendor.id);         // Added vendor-id for linking
      card.setAttribute('rating', vendor.rating || 'N/A'); // Add rating if available or 'N/A'
      vendorList.appendChild(card);
    });
  } catch (err) {
    console.error('Failed to load vendors:', err);
  }
}

loadVendors();