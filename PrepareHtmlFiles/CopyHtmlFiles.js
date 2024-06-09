import path from 'path';
import fs from "fs";

const StartFunc = ({ inSideBarArray }) => {
    let LocalReturnObject = {};
    console.log("inSideBarArray : ", inSideBarArray[0]);

    inSideBarArray.forEach(LoopTableName => {
        LoopTableName.children.forEach(LoopInsideFile => {
            let LocalFileData = fs.readFileSync(LoopInsideFile.filePath, "utf8");

            let LocalNewFilePath = LoopInsideFile.filePath.replace("HtmlFiles\\", "").replace(`${LoopInsideFile.name}.html`, `${LoopInsideFile.url}`);
            // console.log("LocalNewFilePath : ", LocalNewFilePath);

            fs.writeFileSync(LocalNewFilePath, LocalFileData);
        });
    });

    return LocalReturnObject;
};

export { StartFunc }