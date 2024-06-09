import { StartFunc as StartFuncTableTag } from "./TableTag.js";
//import ConfigJson from `/bin/config/${jVarGlobalTableName}` with {type: 'json'};
// import ConfigJson from '/bin/config/Openings.json' with {type: 'json'};

const StartFunc = () => {
    StartFuncTableTag();
    jFLocalInitialize().then();
};

const jFLocalInitialize = async () => {
    var $table = $('#table');
    let jVarLocalData = await jFLocalReturnColumns();

    console.log("jVarLocalData : ", jVarLocalData);
    $table.bootstrapTable({
        data: [],
        columns:jVarLocalData
    });
};

const jFLocalReturnColumns = async () => {
    let jVarLocalData = await jFLocalTableSchema();
    let jVarLocalColumns=Object.keys(jVarLocalData);

  let jVarLocalCollection=  jVarLocalColumns.map(element => {
        return{
            field:element,
            title:element
        }
    });

 return   jVarLocalCollection;
};

const jFLocalTableSchema = async () => {
    let jVarLocalResponse = await fetch(`/321/${jVarGlobalTableName}.json`);
    let jVarLocalData = await jVarLocalResponse.json();

    return await jVarLocalData;
};

export { StartFunc };
