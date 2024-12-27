fetch('../assets/portfolio.json') // Updated path to portfolio.json
  .then(response => response.json())
  .then(data => {
    // Sort projects by the numerical prefix before the first '-'
    data.sort((a, b) => {
      const numA = parseInt(a.name.split(' - ')[0]);
      const numB = parseInt(b.name.split(' - ')[0]);
      return numA - numB;
    });

    // Dynamically render the sorted projects
    const portfolioContainer = document.getElementById('portfolio');
    data.forEach(project => {
      const projectDiv = document.createElement('div');
      projectDiv.classList.add('project');

      // Extract the project name without the numerical prefix
      const displayName = project.name.split(' - ').slice(1).join(' - ');

      // Check if there are additional images
      const additionalImages = project.images.filter(img => img !== 'cover.png');

      let projectLink = '';
      if (additionalImages.length > 0) {
        // Create a clickable link to the project details page
        projectLink = `<a href="../project/index.html?name=${encodeURIComponent(project.name)}">${displayName}</a>`;
      } else {
        projectLink = displayName; // Just display the name if no additional images
      }

      projectDiv.innerHTML = `
        <img src="../assets/portfolio/${project.name}/cover.png" alt="${displayName}">
        <p>${projectLink}</p>
      `;
      portfolioContainer.appendChild(projectDiv);
    });
  })
  .catch(error => console.error('Error loading portfolio:', error));