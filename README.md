# kabouts
Kiosk Whereabouts  
![Preview of Kabouts](https://i.imgur.com/g9oGQq5.gif "Kabouts Demo")  

## Purpose
Provide a small map for users to navigate towards items added to a list.  
This could be useful for finding your way to offices or items in a grocery store.  

## Technologies
- React
    - Client
    - Packaged with Webpack / Babel
- Electron
    - For local client packaging
- Express / Node
    - Endpoint hosting
    - Serving the webpage for package download
- MySQL
    - Storing the item and location information

## Server
### Running
npm run server

### SQL Schema
mariadb -u root < schema_mariadb.sql

### Permissions
If you're having issues in a dev environment connecting to mariadb, you may need to run similar commands like:
```sh
sudo mariadb -u root
SET old_passwords=0;
CREATE USER 'account'@'localhost' IDENTIFIED BY 'password';
ALTER USER 'account'@'localhost' IDENTIFIED BY 'password';
GRANT ALL on *.* to 'account'@'localhost';
FLUSH PRIVILEGES;
```
You may also need to run:
```sh
SET PASSWORD FOR 'account'@'localhost' = PASSWORD('password');
```

#### Sample Data:
mysql kabouts < example_data.sql

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


## Art
Credit for some of the placeholder assets:  
https://opengameart.org/content/xmas-pack-2d-assets  
https://opengameart.org/content/lechita  
