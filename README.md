# Google Drive Easy

A simple Node.js library for interacting with Google Drive, making file uploads, downloads, and management easy.

## Features

- Upload and download files to/from Google Drive
- List, create, and delete files and folders
- Simple authentication with OAuth2
- Minimal dependencies and easy setup

## Installation

```bash
npm install google-drive-easy
```

## Usage

```js
const { GoogleDriveEasy } = require('google-drive-easy');

const drive = new GoogleDriveEasy({
  clientId: 'YOUR_CLIENT_ID',
  clientSecret: 'YOUR_CLIENT_SECRET',
  redirectUri: 'YOUR_REDIRECT_URI',
});

// Authenticate and get tokens
await drive.authenticate();

// Upload a file
await drive.uploadFile('local/path/to/file.txt', 'drive-folder-id');

// Download a file
await drive.downloadFile('drive-file-id', 'local/path/to/save.txt');
```

## Authentication

1. Create a project in [Google Cloud Console](https://console.cloud.google.com/).
2. Enable the Google Drive API.
3. Create OAuth2 credentials and download the `client_id` and `client_secret`.
4. Use these credentials in your code as shown above.

## API Reference

- `authenticate()`: Prompts for authentication and stores tokens.
- `uploadFile(localPath, folderId)`: Uploads a file to a folder.
- `downloadFile(fileId, localPath)`: Downloads a file by ID.
- `listFiles(folderId)`: Lists files in a folder.
- `deleteFile(fileId)`: Deletes a file by ID.

## License

MIT

## Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

## Disclaimer

This project is not affiliated with Google. Use at your own risk.