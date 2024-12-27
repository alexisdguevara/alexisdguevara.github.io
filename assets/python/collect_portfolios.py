import os
import json


portfolio_dir = 'assets/portfolio'

# Step 1: Gather and renumber folders
folders = [folder for folder in os.listdir(portfolio_dir) if folder != '.DS_Store']

# Extract numeric prefixes, sort them, and renumber sequentially starting from 1
sorted_folders = sorted(folders, key = lambda x: int(x.split(' - ')[0]))

for index, folder in enumerate(sorted_folders, start = 1):

    old_path = os.path.join(portfolio_dir, folder)

    new_folder_name = f"{index} - {' - '.join(folder.split(' - ')[1:])}"  # Keep everything after the first hyphen

    new_path = os.path.join(portfolio_dir, new_folder_name)

    if old_path != new_path:

        os.rename(old_path, new_path)

# Step 2: Generate portfolio.json file
projects = []

for folder in os.listdir(portfolio_dir):

    if folder == '.DS_Store':
        continue

    folder_path = os.path.join(portfolio_dir, folder)
    
    images = [f for f in os.listdir(folder_path) if f.endswith('.png') or f.endswith('.jpg')]
    
    images.sort()
    
    projects.append({'name': folder, 'images': images,})
    
# Sort projects again in case renaming was applied (just in case)
projects.sort(key = lambda x: int(x['name'].split(' - ')[0]))

# Step 3: Write to portfolio.json
with open('assets/portfolio.json', 'w') as f:
    json.dump(projects, f)