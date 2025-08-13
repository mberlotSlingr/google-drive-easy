const svc = require('@slingr/slingr-services');
const { getFileInSharedFolder } = require('./google-drive-easy.js');

svc.hooks.onSvcStart = () => {
    svc.logger.info('Google Drive Easy Service has started');
}

svc.hooks.onSvcStop = (cause) => {
    svc.logger.info('Google Drive Easy Service is stopping.');
}

svc.functions.getFileInSharedFolder = ({ params, id }) => {
    let { folderId } = params;

    getFileInSharedFolder(folderId)
        .then((content) => {
            svc.events.send('onFileListComplete', {
                content: content,
                ok: true,
            }, id);
        })
        .catch(err => {
            svc.events.send('onFileListComplete', {
                ok: false,
                error: err.message,
            }, id);
        });
    return { ok: true };
};

svc.start();
