// Fetch the portfolio data and load 3 projects
fetch('../assets/portfolio.json')
    .then(response => response.json())
    .then(data => {
        // Sort the projects by the initial number in the name
        const sortedProjects = data.sort((a, b) => {
            const aNum = parseInt(a.name.split(' ')[0]);
            const bNum = parseInt(b.name.split(' ')[0]);
            return aNum - bNum; // Sort numerically
        }).slice(0, 3); // Get the first 3 projects

        // Get the container for home page projects
        const homeProjectsContainer = document.getElementById('home-projects-container');

        sortedProjects.forEach(project => {
            // Create project element
            const projectElement = document.createElement('div');
            projectElement.classList.add('project');

            // Create the project image (cover.png)
            const projectImg = document.createElement('img');
            projectImg.src = `../assets/portfolio/${project.name}/cover.png`;
            projectImg.alt = project.name;
            projectImg.classList.add('lazyload'); // Lazy load the image

            // Append the image to the project element
            projectElement.appendChild(projectImg);

            // Check if there are additional images besides cover.png
            const additionalImages = project.images.filter(img => img !== 'cover.png');

            // Create the project title (removing the prefix)
            const projectTitle = document.createElement('p');
            const cleanProjectName = project.name.split(' - ').slice(1).join(' - '); // Remove prefix
            projectTitle.textContent = cleanProjectName;

            // Create the project link only if there are additional images
            if (additionalImages.length > 0) {
                const projectLink = document.createElement('a');
                projectLink.href = `../project/index.html?name=${encodeURIComponent(project.name)}`;
                projectLink.appendChild(projectTitle);

                // Append the project title link to the project element
                projectElement.appendChild(projectLink);
            } else {
                // If only cover.png exists, just append the project title (non-clickable)
                projectElement.appendChild(projectTitle);
            }

            // Append the project to the home projects container
            homeProjectsContainer.appendChild(projectElement);
        });
    })
    .catch(error => console.error('Error loading projects:', error));