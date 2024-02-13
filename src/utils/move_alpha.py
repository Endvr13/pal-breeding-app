import json

filename = 'F:/dev/pal-breeding-app/src/utils/pals.json'
# Load the JSON data from file
with open(filename, 'r') as f:
    data = json.load(f)

for pal in data['pals']:
    # Assuming "alpha_title" is derived from the "name" field
    pal['alpha_title'] = pal['name'].lower()

# Write the modified data back to the file
        
modified_file = 'F:/dev/pal-breeding-app/src/utils/modified_pals.json'
with open(modified_file, 'w') as f:
    json.dump(data, f, indent=2)