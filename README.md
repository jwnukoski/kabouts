# kabouts
Kiosk Whereabouts

## Server
### Running
npm run server

### Connection
To connect to your own database modify the file: server/connection.js

## Client
### Connection
To connect to your own server modify the file: client/connection.js

### Building
npm run client (build the bundle.js file)

### Electron packaging
npm install -g electron-packager
electron-packager ./kabouts/ kabouts --platform=linux --arch=x64
electron-packager ./kabouts/ kabouts --platform=win32 --arch=x64
electron-packager ./kabouts/ kabouts --platform=darwin --arch=x64
