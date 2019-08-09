const uuid = require('uuid/v4');

const utils = {};
utils.generateDirectoriesTree = (dirs, createIn) => {
    let dirsTree = [];
    const createNode = (dirs, parentName, parentId) => {
        dirs.forEach((dir) => {
            // get current directory parent
            const parents = dirsTree.filter(level => level.id === parentId);
            const id = uuid();
            let path = parentName ? `${dir.name}` : `${createIn}/${dir.name}`;
            path = parentId === null ? path : `${parents[0].path}/${path}`;
            
            dirsTree = [...dirsTree, {
                path,
                name: dir.name,
                id,
                files: dir.files ? dir.files : []
            }];

            if (dir.dirs && dir.dirs.length > 0) {
                createNode(dir.dirs, dir.name, id);
            }
        });
    }
    createNode(dirs, null, null);
    return dirsTree;
}

module.exports = utils;
