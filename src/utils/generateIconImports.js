const fs = require('fs');
const path = require('path');

const iconsDirectory = '../assets'; // Path to your icons directory
const outputFile = './iconImports.js'; // Output file where imports will be written

// Read the contents of the icons directory
fs.readdir(iconsDirectory, (err, files) => {
  if (err) {
    console.error('Error reading icons directory:', err);
    return;
  }

  // Filter out non-PNG files
  const iconFiles = files.filter((file) => file.endsWith('.png'));

  // Generate import statements for each icon file
  const imports = iconFiles.map((file) => {
    const iconName = path.basename(file, '.png');
    return `import ${iconName} from '${iconsDirectory}/${file}';`;
  });

  // Generate the export statement
  const exportStatement = `export default {\n${iconFiles
    .map((file) => {
      const iconName = path.basename(file, '.png');
      return `  ${iconName}: ${iconName},`;
    })
    .join('\n')}\n};`;

  // Write the import statements and export statement to the output file
  const content = `${imports.join('\n')}\n\n${exportStatement}`;
  fs.writeFile(outputFile, content, (err) => {
    if (err) {
      console.error('Error writing import statements:', err);
      return;
    }
    console.log(`Import statements and export written to ${outputFile}`);
  });
});