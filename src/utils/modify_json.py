import json

filename = 'F:/dev/pal-breeding-app/src/utils/pals.json'

# Load the existing JSON data
with open(filename, 'r') as f:
    data = json.load(f)
start_index = 0
# Add sortOrder field to each object
for obj in data['pals']:
    obj['index'] = start_index
    start_index += 1

modified_file = 'F:/dev/pal-breeding-app/src/utils/modified_pals.json'
# Save the modified data back to a JSON file
with open(modified_file, 'w') as f:
    json.dump(data, f, indent=2)