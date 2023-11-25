# UWindsor CS Hub

This is an HTML5 project developed for my COMP-2707 class.
UWindsor CS Hub is a web application designed to serve as a centralized hub for resources related to computer science at the University of Windsor.

## Table of Contents

- [About](#about)
- [Features](#features)
- [File Structure](#file-structure)
- [Getting Started](#getting-started)
- [Usage](#usage)
- [TODO](#TODO)

## About

UWindsor CS Hub is a platform where students and faculty can access and share resources related to computer science courses, tutorials, and more. It provides an interface for uploading, displaying, and managing files such as PDFs.

## Features

- **Resource Display:** View a list of uploaded resources, including titles, descriptions, and download links.
- **Resource Upload:** Users can upload PDF files, providing a title and description for each resource.
- **Resource Deletion:** Delete resources using a simple user interface.

## File Structure

- **pages**
  - contact.html
  - courses.html
  - resources.html
  - tutorials.html

- **src**
  - display.php
  - script.js
  - upload.php
  - delete.php
  - display.php
  
- **images**
  - (various image files)
 
- **uploads**
  - (uploaded files)

- index.html

## Getting Started

1. Clone the repository: `git clone <repository-url>`
2. Open the `index.html` file in a web browser.

## Usage

1. **View Resources:** Navigate to the "Resources" section on the homepage to see a list of uploaded resources.
2. **Upload a Resource:** Use the file upload form to add a new resource, providing a title, description, and the PDF file.
3. **Delete a Resource:** Each resource has a delete button; click it to remove the corresponding resource.

## TODO

- Put all the sensitive database shenanigans in a gitingnored .env file so that all my juicy database information isn't just out on the internet.
