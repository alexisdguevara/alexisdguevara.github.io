// Get the project name from the URL query parameter
const params = new URLSearchParams(window.location.search);
const projectName = params.get('name');

if (projectName) {
  fetch('../assets/portfolio.json') // Updated path to portfolio.json
    .then(response => response.json())
    .then(data => {
      // Find the project based on the name
      const project = data.find(proj => proj.name === projectName);

      if (project) {
        // Set the project title, excluding the numerical prefix
        const projectTitleElement = document.querySelector('#project-title h2'); // Ensure correct selector
        const cleanProjectName = project.name.split(' - ').slice(1).join(' - '); // Removes the prefix
        projectTitleElement.textContent = cleanProjectName;

        // Populate the images
        const projectImagesContainer = document.getElementById('project-images');

        // Filter out cover.png and load other images
        const additionalImages = project.images.filter(img => img !== 'cover.png');
        additionalImages.forEach(image => {
          const imgElement = document.createElement('img');
          imgElement.src = `../assets/portfolio/${project.name}/${image}`;
          imgElement.alt = image;
          projectImagesContainer.appendChild(imgElement);
        });
      } else {
        console.error('Project not found');
      }
    })
    .catch(error => console.error('Error loading project:', error));
} else {
  console.error('No project name specified in URL');
}