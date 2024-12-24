import os
import json


portfolio_dir = 'assets/portfolio'

projects = []

for folder in os.listdir(portfolio_dir):

    if folder == '.DS_Store':
        continue

    folder_path = os.path.join(portfolio_dir, folder)
    
    images = [f for f in os.listdir(folder_path) if f.endswith('.png') or f.endswith('.jpg')]
    
    images.sort()
    
    creation_time = os.path.getctime(folder_path)
    
    projects.append({
        'name': folder,
        'images': images,
        'creation_time': creation_time
    })
        
projects.sort(key=lambda x: x['creation_time'], reverse=True)

with open('assets/portfolio.json', 'w') as f:
    json.dump(projects, f)
    
