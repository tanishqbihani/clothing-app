document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('userForm');
    const designOptions = document.getElementById('designOptions');
    const searchInput = document.getElementById('searchInput');
    const categoryFilter = document.getElementById('categoryFilter');
    const productsContainer = document.getElementById('products-container');

    // Show design options based on selected material
    const materialSelect = document.getElementById('material');
    materialSelect.addEventListener('change', function() {
        const selectedMaterial = materialSelect.value;
        showDesignOptions(selectedMaterial);
    });

    // Function to display design options based on material
    function showDesignOptions(material) {
        designOptions.innerHTML = '';  // Clear previous options
        
        let designs = [];

        // Example designs based on material type
        if (material === 'cotton') {
            designs = ['Casual Shirt', 'T-shirt', 'Dress'];
        } else if (material === 'linen') {
            designs = ['Linen Shirt', 'Linen Pants'];
        } else if (material === 'wool') {
            designs = ['Wool Sweater', 'Wool Jacket'];
        } else if (material === 'silk') {
            designs = ['Silk Blouse', 'Silk Skirt'];
        }

        // Generate design options
        designs.forEach(design => {
            const option = document.createElement('label');
            option.innerHTML = `<input type="radio" name="design" value="${design}"> ${design}`;
            designOptions.appendChild(option);
        });
    }

    // Handle form submission (You can add an actual backend API here to handle orders)
    form.addEventListener('submit', function (event) {
        event.preventDefault();

        const size = document.getElementById('size').value;
        const age = document.getElementById('age').value;
        const gender = document.getElementById('gender').value;
        const material = document.getElementById('material').value;
        const selectedDesign = document.querySelector('input[name="design"]:checked');

        if (!selectedDesign) {
            alert('Please select a design!');
            return;
        }

        const design = selectedDesign.value;

        // Display order summary
        alert(`Order placed successfully for:\nSize: ${size}\nAge: ${age}\nGender: ${gender}\nMaterial: ${material}\nDesign: ${design}`);
    });

    function renderFilteredProducts() {
  const searchTerm = searchInput.value.toLowerCase().trim();
  const selectedCategory = categoryFilter.value;
  // Clear container
  productsContainer.innerHTML = '';
  const filtered = products.filter(product => {
    const matchesCategory = (selectedCategory === 'all') || (product.category === selectedCategory);
    const matchesSearch = product.title.toLowerCase().includes(searchTerm);
    return matchesCategory && matchesSearch;
  });
  if(filtered.length === 0) {
    productsContainer.innerHTML = '<p style="text-align:center; color:#777;">No products found.</p>';
    return;
  }
  filtered.forEach(product => {
    const card = document.createElement('article');
    card.className = 'product-card';
    card.innerHTML = `
      <img src="${product.image}" alt="${product.title}" class="product-image" />
      <div class="product-info">
        <h3 class="product-title">${product.title}</h3>
        <div class="price">₹${product.basePrice.toLocaleString()}</div>
        <!-- Add size selector and add to cart button here -->
      </div>
    `;
    productsContainer.appendChild(card);
  });
}
// Event listeners for filtering on input and select change
searchInput.addEventListener('input', renderFilteredProducts);
categoryFilter.addEventListener('change', renderFilteredProducts);
// Initial render
renderFilteredProducts();
});
