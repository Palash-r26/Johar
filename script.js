document.addEventListener("DOMContentLoaded", () => {
  // 1. Navbar Scroll Effect
  const navbar = document.getElementById("mainNavbar");
  
  window.addEventListener("scroll", () => {
    if (window.scrollY > 80) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  });

  // 2. Intersection Observer for scroll animations
  const observerOptions = {
    root: null,
    rootMargin: "0px",
    threshold: 0.15
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  document.querySelectorAll(".animate-on-scroll").forEach(section => {
    observer.observe(section);
  });

  // 3. AJAX Product Fetching for Modal
  const knowMoreBtns = document.querySelectorAll(".btn-know-more, .btn-know-more-wooden");
  const modal = new bootstrap.Modal(document.getElementById("productModal"));
  
  const modalImage = document.getElementById("modalProductImage");
  const modalName = document.getElementById("modalProductName");
  const modalDesc = document.getElementById("modalProductDesc");
  const modalPrice = document.getElementById("modalProductPrice");

  knowMoreBtns.forEach(btn => {
    btn.addEventListener("click", (e) => {
      const productId = e.target.getAttribute("data-product");
      
      // Fetch data from products.json
      fetch("products.json")
        .then(response => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then(data => {
          const product = data[productId];
          if (product) {
            // Populate modal
            modalImage.src = product.image;
            modalName.textContent = product.name;
            modalDesc.textContent = product.description;
            modalPrice.textContent = product.price;
            
            // Show modal
            modal.show();
          }
        })
        .catch(error => {
          console.error("Error fetching product data:", error);
          alert("Unable to load product details at this time.");
        });
    });
  });

  // 4. Accessibility Fix: prevent focus inside modal when it hides
  const productModalEl = document.getElementById("productModal");
  productModalEl.addEventListener('hide.bs.modal', () => {
    // Blurring the active element shifts focus back to body
    // before Bootstrap applies aria-hidden="true"
    if (document.activeElement) {
      document.activeElement.blur();
    }
  });
});
