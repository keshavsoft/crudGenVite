let StartFunc = () => {
    console.log(`Listening in some local port : 7018`);
    console.log(`http server at http://localhost:7018`);

    LocalFuncCheckEnv();

    process.env.UUID = uuidv4();
};

let LocalFuncCheckEnv = () => {

};

function uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
};

export { StartFunc };