import path, { resolve } from 'path'
import { fileURLToPath } from 'url';
import { StartFunc as StartFuncReadDataSchema } from "./KCode/ReadDataSchema.js";
import { StartFunc as StartFuncBuildSideBarJson } from "./viteFuncs/BuildSideBarJson.js";
import { StartFunc as StartFuncCopyHtmlFiles } from "./PrepareHtmlFiles/CopyHtmlFiles.js";

import { StartFunc as StartFuncGetHtmlFiles } from "./viteFuncs/getHtmlFiles.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const FrontEndSrcFolder = "src/FrontEnd";

const root = resolve(__dirname, `${FrontEndSrcFolder}`);

const StartFunc = () => {
    const LocalTableNames = StartFuncReadDataSchema();

    const files = StartFuncGetHtmlFiles({ inRootFolder: root });

    let sidebarItems = StartFuncBuildSideBarJson({ inFilesArray: files, inTablesArray: LocalTableNames.children });

    StartFuncCopyHtmlFiles({ inSideBarArray: sidebarItems });

    return sidebarItems;
};

export { StartFunc }