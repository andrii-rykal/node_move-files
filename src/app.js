const fs = require('fs');
const path = require('path');

const args = process.argv.slice(2);
console.log(args);

if (args.length !== 2) {
  console.error('Error: Please provide both source and destination paths');
  process.exit(1);
}

const [source, destination] = args;
const sourcePath = path.resolve(source);
const destinationPath = path.resolve(destination);

console.log(sourcePath);

if (!fs.existsSync(sourcePath) || !fs.statSync(sourcePath).isFile()) {
  console.error(
    `Error: Source file "${source}" does not exist or is not a file`,
  );
  process.exit(1);
}

const destinationLooksLikeDir =
  destination.endsWith('/') ||
  (fs.existsSync(destinationPath) &&
    fs.statSync(destinationPath).isDirectory());

if (destinationLooksLikeDir) {
  if (!fs.existsSync(destinationPath)) {
    console.error(
      `Error: Destination directory "${destinationPath}" does not exist`,
    );
    process.exit(1);
  }

  const newFilePath = path.join(destinationPath, path.basename(sourcePath));
  fs.renameSync(sourcePath, newFilePath);
} else {
  fs.renameSync(sourcePath, destinationPath);
}

console.log(`File moved successfully: ${sourcePath} -> ${destinationPath}`);
