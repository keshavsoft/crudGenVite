import path from 'path';
import fs from "fs";

const StartFunc = ({ inFilesArray, inTablesArray }) => {
    let LocalReturnObject = {};

    inTablesArray.forEach(LoopTableName => {
        Object.keys(inFilesArray).forEach(LoopInsideFile => {
            let LocalFileData = fs.readFileSync(inFilesArray[LoopInsideFile], "utf8");
            let LocalNewFilePath = inFilesArray[LoopInsideFile].replace("HtmlFiles\\", "").replace(`${LoopInsideFile}`, `${path.parse(LoopTableName.name).name}-${LoopInsideFile}`);

            fs.writeFileSync(LocalNewFilePath, LocalFileData);
        });
    });

    return LocalReturnObject;
};

export { StartFunc }