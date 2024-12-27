// Get the project name from the URL query parameter
const params = new URLSearchParams(window.location.search);
const projectName = params.get('name');

if (projectName) {
  fetch('../assets/portfolio.json') // Path to portfolio.json
    .then(response => response.json())
    .then(data => {
      // Find the project based on the name
      const project = data.find(proj => proj.name === projectName);

      if (project) {
        // Set the project title, excluding the numerical prefix
        const projectTitleElement = document.querySelector('#project-title h2');
        const cleanProjectName = project.name.split(' - ').slice(1).join(' - '); // Removes the prefix
        projectTitleElement.textContent = cleanProjectName;

        // Populate the images
        const projectImagesContainer = document.getElementById('project-images');

        // Filter out cover.png and load other images
        const additionalImages = project.images.filter(img => img !== 'cover.png');
        additionalImages.forEach(image => {
          const imgElement = document.createElement('img');

          // Add lazy loading and set srcset for responsive loading
          imgElement.src = `../assets/portfolio/${project.name}/low-quality/${image}`; // Placeholder image
          imgElement.dataset.src = `../assets/portfolio/${project.name}/${image}`; // Actual image URL
          imgElement.alt = image;
          imgElement.classList.add('lazyload'); // For lazy loading

          // Responsive image handling (srcset and sizes)
          imgElement.srcset = `
            ../assets/portfolio/${project.name}/small/${image} 500w,
            ../assets/portfolio/${project.name}/medium/${image} 1000w,
            ../assets/portfolio/${project.name}/large/${image} 1500w
          `;
          imgElement.sizes = '(max-width: 600px) 90vw, 33vw'; // Adjust size based on screen width

          // Add event listener to open the image in full-screen mode
          imgElement.addEventListener('click', () => openModal(imgElement.src));

          // Append the image to the container
          projectImagesContainer.appendChild(imgElement);
        });

        // Implement lazy loading for images (only when they come into view)
        const lazyLoadImages = () => {
          const lazyImages = document.querySelectorAll('img.lazyload');
          lazyImages.forEach(image => {
            if (image.getBoundingClientRect().top < window.innerHeight) {
              image.src = image.dataset.src;
              image.classList.remove('lazyload');
              image.classList.add('loaded');
            }
          });
        };

        // Trigger lazy loading on scroll
        window.addEventListener('scroll', lazyLoadImages);
        lazyLoadImages(); // Initial check for images already in view
      } else {
        console.error('Project not found');
      }
    })
    .catch(error => console.error('Error loading project:', error));
} else {
  console.error('No project name specified in URL');
}

// Modal functionality
const modal = document.getElementById('image-modal');
const modalImg = document.getElementById('full-screen-img');
const closeBtn = document.querySelector('.close');

// Function to open the modal with the clicked image
function openModal(imgSrc) {
  modal.style.display = 'flex';
  modalImg.src = imgSrc;
}

// Close the modal when clicking outside the image or on the close button
function closeModal() {
  modal.style.display = 'none';
}

// Add event listener to close button
closeBtn.addEventListener('click', closeModal);

// Close modal when clicking outside of the image
modal.addEventListener('click', (e) => {
  if (e.target === modal) {
    closeModal();
  }
});