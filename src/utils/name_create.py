import json

filename = 'F:/dev/pal-breeding-app/src/assets/names.txt'

# Read names from text file
with open(filename, 'r') as file:
    names = file.read().splitlines()

pals = []

# Generate JSON for each name
for name in names:
    pal = {
        "name": name,
        "number": 0,
        "breedingPower": 0,
        "icon": f"{name}_icon.png",
        "element": "",
        "workSuitability": {
            "kindling": 0,
            "planting": 0,
            "handiwork": 0,
            "lumbering": 0,
            "medicine": 0,
            "transporting": 0,
            "watering": 0,
            "generating": 0,
            "gathering": 0,
            "mining": 0,
            "cooling": 0,
            "farming": 0
        }
    }
    pals.append(pal)

# Create JSON object
data = {
    "pals": pals
}

# Convert to JSON string
json_str = json.dumps(data, indent=2)

# Print or write to file
# Write JSON string to file
newfile = 'F:/dev/pal-breeding-app/src/utils/pals.json'
with open(newfile, 'w') as file:
    file.write(json_str)
