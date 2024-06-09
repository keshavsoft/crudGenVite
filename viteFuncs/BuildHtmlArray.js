import path from 'path';

const StartFunc = ({ inFilesArray, inTablesArray }) => {
    let LocalReturnObject = {};

    inTablesArray.forEach(element => {
        for (const [key, value] of Object.entries(inFilesArray)) {
            LocalReturnObject[`${path.parse(element.name).name}-${key}`] = value;
        };
    });

    return LocalReturnObject;
};

export { StartFunc }