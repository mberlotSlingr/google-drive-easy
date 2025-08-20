const { google } = require('googleapis');
const fs = require('fs');
const svc = require('@slingr/slingr-services');
const config = require('@slingr/slingr-s')
require('dotenv').config();

const drive = google.drive('v3');

async function authenticate() {
  const auth = new google.auth.GoogleAuth({
    credentials:{
      private_key: svc.serviceConfig.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'),
      client_email: svc.serviceConfig.GOOGLE_CLIENT_EMAIL,
    },
    projectId: svc.serviceConfig.GOOGLE_PROJECT_ID,
    // Scopes define the level of access to the API
    scopes: ['https://www.googleapis.com/auth/drive'],
  });
  
  const authClient = await auth.getClient();
  google.options({ auth: authClient });
  return authClient;
}

// List files in Google Drive
async function getFilesInSharedFolder(folderId) {
  svc.logger.info('Fetching files from shared folder:', folderId);
  try {
    await authenticate();
    let params = {
      pageSize: 10,
      fields: 'nextPageToken, files(id, name)',
    };
    if(folderId){
        params.q = `'${folderId}' in parents`;
    }
    const res = await drive.files.list();

    const content = [];
    const files = res.data.files;
    if (files.length) {
      files.forEach((file) => {
        content.push({ id: file.id, name: file.name });
      });
    }
    return content;
  } catch (err) {
    svc.logger.info('The API returned an error:', err);
    throw err;
  }
}

async function downloadFile(fileList) {
  try {
    await authenticate();
    let filesUploaded = []

    await Promise.all(fileList.map(async f =>{
      const res = await drive.files.get({
        fileId: f.id,
        alt: 'media',
      }, { responseType: 'stream' });
      

      let fileInfo = await svc.files.upload(f.name, res.data);
      filesUploaded.push({"file": fileInfo, "id": f.id, "name": f.name});
    }))

    return filesUploaded;

  } catch (err) {
    svc.logger.info('Download error:', err);
    throw err;
  }
}

module.exports = {
    getFilesInSharedFolder,
    downloadFile,
};
