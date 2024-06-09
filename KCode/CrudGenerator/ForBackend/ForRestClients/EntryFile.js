import { StartFunc as StartFuncCommonFuncs } from './CommonFuncs.js';
import fs from "fs";
import path from "path";

let StartFunc = ({ inTablesCollection, inTo, inFrom }) => {
    let LocalTypeName = "restClients/crud";
    let LocalTo = inTo;
    let LocalFrom = inFrom;

    let LocalTablesCollection = inTablesCollection;

    let LocalFirstLevelFolders = LocalTablesCollection.children.filter(element => {
        return "children" in element === false;
    });

    StartFuncCommonFuncs({
        inFilesCollection: LocalFirstLevelFolders,
        inTo: LocalTo, inTypeName: LocalTypeName, inFileName: "get.http",
        inFrom: LocalFrom
    });

    StartFuncCommonFuncs({
        inFilesCollection: LocalFirstLevelFolders,
        inTo: LocalTo, inTypeName: LocalTypeName, inFileName: "post.http",
        inFrom: LocalFrom
    });

    StartFuncCommonFuncs({
        inFilesCollection: LocalFirstLevelFolders,
        inTo: LocalTo, inTypeName: LocalTypeName, inFileName: "delete.http",
        inFrom: LocalFrom
    });

    StartFuncCommonFuncs({
        inFilesCollection: LocalFirstLevelFolders,
        inTo: LocalTo, inTypeName: LocalTypeName, inFileName: "image.http",
        inFrom: LocalFrom
    });

    StartFuncCommonFuncs({
        inFilesCollection: LocalFirstLevelFolders,
        inTo: LocalTo, inTypeName: LocalTypeName, inFileName: "put.http",
        inFrom: LocalFrom
    });

    LocalFuncForTestEndPoint({ inTablesCollection, inTo, inFrom });
    LocalFuncForgetEndPoints({ inTablesCollection, inTo, inFrom });
    LocalFuncForPutEndPoints({ inTablesCollection, inTo, inFrom });
};

let LocalFuncForTestEndPoint = ({ inTablesCollection, inTo, inFrom }) => {
    let LocalTypeName = "restClients/testEndPoint";
    let LocalTo = inTo;
    let LocalFrom = inFrom;

    let LocalTablesCollection = inTablesCollection;

    let LocalFirstLevelFolders = LocalTablesCollection.children.filter(element => {
        return "children" in element === false;
    }).filter(element => element.name.endsWith(".json"))

    // let LocalFirstLevelFolders = LocalTablesCollection.children.filter(element => {
    //     return "children" in element === false;
    // }).map(item => item.name).filter(element => element.name.endsWith(".json"))

    // .map(item => item.name);
    // console.log("aaaaaaaa : ", LocalFirstLevelFolders);

    LocalFirstLevelFolders.forEach(element => {
        let LoopInsideFileName = path.parse(element.name).name;
        let LocalFilePath = `${LocalTo}/${LoopInsideFileName}/${LocalTypeName}`;

        let LoopInsideFiles = fs.readdirSync(LocalFilePath, { withFileTypes: true })
            .filter(item => !item.name.endsWith(".json"))
            .map(item => item.name);


        LoopInsideFiles.forEach(LoopFile => {
            let LocalFileData = fs.readFileSync(`${LocalFilePath}/${LoopFile}`);

            let LocalFileDataReplaced = LocalFileData.toString().replaceAll("ksSample", LoopInsideFileName);
            let LocalBinReplaced = LocalFileDataReplaced.replaceAll(LocalFrom, LocalTo);

            fs.writeFileSync(`${LocalFilePath}/${LoopFile}`, LocalBinReplaced);
        });



    });

    // let k1 = fs.readdirSync('./KData/JSON/316', { withFileTypes: true })
    //     .filter(item => !item.isDirectory())
    //     .map(item => item.name);


    // let LoopInsideFileName = path.parse(LoopFile.name).name;
    // let LocalFilePath = `${LocalTo}/${LoopInsideFileName}/${LocalTypeName}/${LocalFileName}`;

    // let LocalFileData = fs.readFileSync(LocalFilePath);

    // StartFuncCommonFuncs({
    //     inTypeName: LocalTypeName,
    //     inFilesCollection: LocalFirstLevelFolders,
    //     inTo: LocalTo, inFrom: LocalFrom,
    //     inFileName: "1GetSchema.http"
    // });

    // StartFuncCommonFuncs({
    //     inTypeName: LocalTypeName,
    //     inFilesCollection: LocalFirstLevelFolders,
    //     inTo: LocalTo, inFrom: LocalFrom,
    //     inFileName: "2ReturnRows.http"
    // });

    // StartFuncCommonFuncs({
    //     inTypeName: LocalTypeName,
    //     inFilesCollection: LocalFirstLevelFolders,
    //     inTo: LocalTo, inFrom: LocalFrom,
    //     inFileName: "3InsertNewRow.http"
    // });

    // StartFuncCommonFuncs({
    //     inTypeName: LocalTypeName,
    //     inFilesCollection: LocalFirstLevelFolders,
    //     inTo: LocalTo, inFrom: LocalFrom,
    //     inFileName: "4InsertMultipleRows.http"
    // });


};

let LocalFuncForgetEndPoints = ({ inTablesCollection, inTo, inFrom }) => {
    let LocalTypeName = "restClients/getEndPoints";
    let LocalTo = inTo;
    let LocalFrom = inFrom;

    let LocalTablesCollection = inTablesCollection;

    let LocalFirstLevelFolders = LocalTablesCollection.children.filter(element => {
        return "children" in element === false;
    }).filter(element => element.name.endsWith(".json"))

    LocalFirstLevelFolders.forEach(element => {
        let LoopInsideFileName = path.parse(element.name).name;
        let LocalFilePath = `${LocalTo}/${LoopInsideFileName}/${LocalTypeName}`;

        let LoopInsideFiles = fs.readdirSync(LocalFilePath, { withFileTypes: true })
            .filter(item => !item.name.endsWith(".json"))
            .map(item => item.name);


        LoopInsideFiles.forEach(LoopFile => {
            let LocalFileData = fs.readFileSync(`${LocalFilePath}/${LoopFile}`);

            let LocalFileDataReplaced = LocalFileData.toString().replaceAll("ksSample", LoopInsideFileName);
            let LocalBinReplaced = LocalFileDataReplaced.replaceAll(LocalFrom, LocalTo);

            fs.writeFileSync(`${LocalFilePath}/${LoopFile}`, LocalBinReplaced);
        });
    });
};

let LocalFuncForPutEndPoints = ({ inTablesCollection, inTo, inFrom }) => {
    let LocalTypeName = "restClients/putEndPoints";

    LocalFuncCommon({ inTablesCollection, inTo, inFrom, inTypeName: LocalTypeName });
};


let LocalFuncCommon = ({ inTablesCollection, inTo, inFrom, inTypeName }) => {
    let LocalTypeName = inTypeName;
    let LocalTo = inTo;
    let LocalFrom = inFrom;

    let LocalTablesCollection = inTablesCollection;

    let LocalFirstLevelFolders = LocalTablesCollection.children.filter(element => {
        return "children" in element === false;
    }).filter(element => element.name.endsWith(".json"))

    LocalFirstLevelFolders.forEach(element => {
        let LoopInsideFileName = path.parse(element.name).name;
        let LocalFilePath = `${LocalTo}/${LoopInsideFileName}/${LocalTypeName}`;

        let LoopInsideFiles = fs.readdirSync(LocalFilePath, { withFileTypes: true })
            .filter(item => !item.name.endsWith(".json"))
            .map(item => item.name);

        LoopInsideFiles.forEach(LoopFile => {
            let LocalFileData = fs.readFileSync(`${LocalFilePath}/${LoopFile}`);

            let LocalFileDataReplaced = LocalFileData.toString().replaceAll("ksSample", LoopInsideFileName);
            let LocalBinReplaced = LocalFileDataReplaced.replaceAll(LocalFrom, LocalTo);

            fs.writeFileSync(`${LocalFilePath}/${LoopFile}`, LocalBinReplaced);
        });
    });
};


LocalFuncForPutEndPoints

export { StartFunc };