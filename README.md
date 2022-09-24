# QRcode page generation
A single webpage that allow to generate a JPG on A4 size that display a chosen number of "QR Code block".

## Requirements
* Docker `v4.10`
* Docker compose `v3.8`

## Installation & Running
* `docker-compose up` This will create and run the containers
* Open `localhost:8080`

## Dev notes
To add a new npm package to the project, open the CLI on the node container and run `npm install [your-package]`.