# microlite.js

**microlite.js** is an ultra-lightweight, minimalistic, simple lightbox script written in pure JavaScript. It's only 1.1KB when gzipped, providing a seamless experience for your web projects. No jQuery. No dependencies. Just one small file.

**What is lightbox?** *A lightbox is a graphical user interface (GUI) element that displays images, videos, or other content using an overlay on the current page. It is often used on websites to showcase media content without navigating away from the current page. When a user clicks on a media item, the lightbox enlarges the item and dims the background, creating a focus on the displayed content. The user can then close the lightbox to return to the original page content. Lightboxes are commonly used in photo galleries, product images, and video displays on websites.*

## Features:
- **No Separate Styles**: All (few) styles are embedded within the script, ensuring no additional CSS files.
- **Conditional Style Loading**: Styles are loaded only when they are needed, optimizing performance.
- **Supported Image Formats**: Supports `.jpg`, `.jpeg`, `.png`, `.gif`, `.bmp`, `.svg`, `.webp`, and `.avif` formats.
- **Built-in Preloader**: Provides a smooth user experience while waiting for images to load.
- **Keyboard and Touch Support**: Closes the lightbox using the 'Esc' key, the closing 'X' button, or just by click.

## How to Use:
Just **include the Script**: Add the `microlite.min.js` script at the end of your HTML file before `</body>`:
```html
<script src="path_to_your_folder/microlite.min.js" type="module" defer></script>
```

Works great with [instant.page](https://github.com/instantpage/instant.page).

## Demo
A live demonstration of microlite.js in action can be found in the repository. Check out the demo.html file to see how it works.

## Contributing
Pull requests are welcome. Especially those related to optimization. For major changes or addition of new features, please open an issue first to discuss what you would like to change.

Found a bug? Report an issue.

## Author
Author: [Mateusz Mazurek](https://mateuszmazurek.pl/)

## License
Script shared under the [MIT license](LICENSE).
