const StartFunc = ({ mode, inFilesArray, inSidebarItems }) => {
    const variables = {};
    let LocalFiles = inFilesArray;
    let sidebarItems = inSidebarItems;
    console.log("LocalFiles : ", LocalFiles);
    Object.keys(LocalFiles).forEach((filename) => {
        if (filename.includes('layouts/FrontEnd')) filename = `layouts/FrontEnd/${filename}`
        variables[filename + '.html'] = {
            web_title: "Mazer Admin Dashboard",
            filename,
            sidebarItems,
            isDev: mode === 'development'
        }
    });
    console.log("variables : ", variables);
    return variables;
};

export { StartFunc };