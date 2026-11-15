# Student Alumni Network Website

Responsive static website connecting students, alumni and faculty.
Course: Web Designing (DCSE0152), NIET Greater Noida. Group A6.
SDG 4 (Quality Education) and SDG 17 (Partnerships for the Goals).

## Pages
index, about, directory, stories, events, gallery, contact

## Folder structure
- css/style.css  : all styles (light/dark theme, responsive, print)
- js/script.js   : theme, menu, back-to-top, directory search, event filter, form validation
- images/        : sample SVG illustrations (lowercase names, no spaces)

## Run locally
Open index.html in any modern browser. No installation needed.

## Deploy (GitHub Pages)
Push the folder to GitHub, then Settings > Pages > Deploy from branch (main, root).

## Update content
- Alumni record: copy a <tr> in directory.html and edit the cells.
- Event: copy an event <article> in events.html and set data-category.
- Photo: add a file to images/ and copy a <figure> block in gallery.html.

## Team
Anshu Verma, Annanya Singh, Anmol Chauhan, Ankur Pratap Singh, Ansh Chand

## Notes
The directory and stories use fictional sample data. Form entries are validated
in the browser but not stored.
