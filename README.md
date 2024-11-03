# @semantik/pdf2image

A lightweight utility library for converting PDF files to images using PDF.js.

## Installation

```bash
npm install @semantik/pdf2image
```

## Usage

```typescript
import pdfToImage from "@semantik/pdf2image";

// Basic usage
pdfToImage("path/to/file.pdf")
  .then((images) => {
    // images is an array of data URLs
    images.forEach((dataUrl) => {
      const img = document.createElement("img");
      img.src = dataUrl;
      document.body.appendChild(img);
    });
  })
  .catch((error) => console.error(error));

// With options
pdfToImage("path/to/file.pdf", {
  allowedMaxPages: 10, // Limit number of pages
  resolution: 2000000, // Set resolution (in pixels)
}).then((images) => {
  // Handle images
});
```

## API

### pdfToImage(file, options?)

Converts a PDF file to an array of image data URLs.

#### Parameters

- **file** (string): Path or URL to the PDF file
- **options** (object, optional):
  - **allowedMaxPages** (number): Maximum number of pages to convert (default: Infinity)
  - **resolution** (number): Target resolution in pixels (default: 1.5 Mpx)

### Returns

Promise<string[]>: Resolves to an array of image data URLs

### Errors

- `TooManyPagesError`: Thrown when the PDF has more pages than **allowedMaxPages**

- Other errors may be thrown during PDF loading or rendering

## Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build package
npm run build

# Run tests
npm run test
```

## License

MIT © Abdelfattah Sekak [GitHub](https://github.com/AbdelfattahSekak)