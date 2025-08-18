const svc = require('@slingr/slingr-services');
const { getFilesInSharedFolder } = require('./google-drive-easy.js');

svc.hooks.onSvcStart = () => {
    svc.logger.info('Google Drive Easy Service has started');
}

svc.hooks.onSvcStop = (cause) => {
    svc.logger.info('Google Drive Easy Service is stopping.');
}

svc.functions.getFilesInSharedFolder = ({ params, id }) => {
    let { folderId } = params;

    getFilesInSharedFolder(folderId)
        .then((content) => {
            svc.events.send('onFilesListComplete', {
                content: content,
                ok: true,
            }, id);
        })
        .catch(err => {
            svc.events.send('onFilesListComplete', {
                ok: false,
                error: err.message,
            }, id);
        });
    return { ok: true };
};

svc.start();
