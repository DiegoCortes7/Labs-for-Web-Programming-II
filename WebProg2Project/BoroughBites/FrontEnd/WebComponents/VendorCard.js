// Web Component: <vendor-card>
// This component uses Shadow DOM to encapsulate style and structure
// Attributes supported: vendor-name, cuisine, rating, vendor-id
class VendorCard extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  // Properties setters to update attributes and re-render
  set vendorName(value) {
    this.setAttribute('vendor-name', value);
  }

  get vendorName() {
    return this.getAttribute('vendor-name');
  }

  set cuisine(value) {
    this.setAttribute('cuisine', value);
  }

  get cuisine() {
    return this.getAttribute('cuisine');
  }

  set rating(value) {
    this.setAttribute('rating', value);
  }

  get rating() {
    return this.getAttribute('rating');
  }

  // New: vendor-id to build the reviews link
  set vendorId(value) {
    this.setAttribute('vendor-id', value);
  }

  get vendorId() {
    return this.getAttribute('vendor-id');
  }

  static get observedAttributes() {
    return ['vendor-name', 'cuisine', 'rating', 'vendor-id'];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    this.render();
  }

  connectedCallback() {
    this.render();
  }

  render() {
    const name = this.vendorName || 'Unknown Vendor';
    const cuisine = this.cuisine || 'Unknown';
    const rating = this.rating || 'N/A';
    const vendorId = this.vendorId || '';

    this.shadowRoot.innerHTML = `
      <style>
        .card {
          border: 1px solid #ccc;
          border-radius: 10px;
          padding: 1em;
          font-family: sans-serif;
          background: #fff;
          box-shadow: 0 2px 5px rgba(0,0,0,0.1);
        }
        h2 {
          margin: 0;
          font-size: 1.2em;
        }
        a {
          color: #007bff;
          text-decoration: none;
          cursor: pointer;
        }
        a:hover {
          text-decoration: underline;
        }
      </style>
      <div class="card">
        <h2><a href="/reviews.html?vendor_id=${vendorId}">${name}</a></h2>
        <p>Cuisine: ${cuisine}</p>
        <p>Rating: ${rating}</p>
      </div>
    `;
  }
}

customElements.define('vendor-card', VendorCard);