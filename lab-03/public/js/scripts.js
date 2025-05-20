fetch('data/data.json')
  .then(response => response.json())
  .then(data => {
    // HOME PAGE
    const homeContent = document.getElementById('home-content');
    if (homeContent) {
      const welcomeMessage = `<h2>${data.home.welcomeMessage}</h2>`;
      const introText = `<p>${data.home.introText}</p>`;
      homeContent.innerHTML = welcomeMessage + introText;
    }

    // CONTACT PAGE
    const contactSection = document.getElementById('contact-form');
    if (contactSection && data.contact) {
      const contact = data.contact;
      contactSection.innerHTML = `
        <h2>${contact.heading}</h2>
        <p><strong>Email:</strong> ${contact.email}</p>
        <p><strong>Phone:</strong> ${contact.phone}</p>
        <p><strong>Address:</strong> ${contact.address}</p>
      `;
    }
  })
  .catch(error => {
    console.error("Error loading home or contact content:", error);
  });


// GALLERY PAGE
function loadGallery() {
  fetch('data/data.json')
    .then(response => response.json())
    .then(data => {
      const galleryData = data.gallery;
      const gallerySection = document.getElementById('gallery-content');

      galleryData.forEach(item => {
        const div = document.createElement('div');
        div.classList.add('gallery-item');

        div.innerHTML = `
          <h3>${item.title}</h3>
          <img src="${item.src}" alt="${item.title}" />
          <p>${item.description}</p>
        `;

        gallerySection.appendChild(div);
      });
    })
    .catch(error => {
      console.error('Error loading gallery:', error);
    });
}

if (document.getElementById('gallery-content')) {
  loadGallery();
}