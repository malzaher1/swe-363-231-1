// Import the file system module
const fs = require('fs');

// Get the source and target directory paths from the command-line arguments
const sourceDir = process.argv[2];
const targetDir = process.argv[3];

// Check if the source and target directories exist
if (!fs.existsSync(sourceDir)) {
  console.error('Source directory does not exist');
  process.exit(1);
}

if (!fs.existsSync(targetDir)) {
  console.error('Target directory does not exist');
  process.exit(1);
}

// Define the file extensions to filter for
const extensions = ['.txt', '.jpg'];

// Read the contents of the source directory
fs.readdir(sourceDir, (err, files) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }

  // Loop through the files
  for (const file of files) {
    // Get the file extension
    const ext = file.slice(file.lastIndexOf('.'));

    // Check if the file extension matches the filter
    if (extensions.includes(ext)) {
      // Copy the file to the target directory
      fs.copyFile(sourceDir + '/' + file, targetDir + '/' + file, (err) => {
        if (err) {
          console.error(err);
          process.exit(1);
        }

        // Log the copied file name
        console.log('Copied ' + file + ' to ' + targetDir);
      });
    }
  }
});
