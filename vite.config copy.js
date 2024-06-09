import { defineConfig, normalizePath, build } from 'vite'
import path, { resolve } from 'path'
import { fileURLToPath } from 'url';
import nunjucks from 'vite-plugin-nunjucks';
import { viteStaticCopy } from 'vite-plugin-static-copy';
// import sidebarItems from './src/FrontEnd/menu.json';
import { StartFunc as StartFuncReadDataSchema } from "./KCode/ReadDataSchema.js";
import { StartFunc as StartFuncViteFuncs } from "./viteFuncs/getFiles.js";
import { StartFunc as StartFuncBuildSideBarJson } from "./viteFuncs/BuildSideBarJson.js";
import { StartFunc as StartFuncGetVariables } from "./viteFuncs/getVariables.js";
import { StartFunc as StartFuncBuildHtmlArray } from "./viteFuncs/BuildHtmlArray.js";
import { StartFunc as StartFuncCopyHtmlFiles } from "./viteFuncs/CopyHtmlFiles.js";

import { StartFunc as StartFuncGetHtmlFiles } from "./viteFuncs/getHtmlFiles.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const FrontEndSrcFolder = "src/FrontEnd";
const FrontEndDistFolder = "publicDir/bin";

const root = resolve(__dirname, `${FrontEndSrcFolder}`);

const LocalTableNames = StartFuncReadDataSchema();

const files = StartFuncGetHtmlFiles({ inRootFolder: root });

let sidebarItems = StartFuncBuildSideBarJson({ inFilesArray: files, inTablesArray: LocalTableNames.children });

StartFuncCopyHtmlFiles({ inFilesArray: files, inTablesArray: LocalTableNames.children });

let HtmlArray = StartFuncBuildHtmlArray({ inFilesArray: files, inTablesArray: LocalTableNames.children });
// console.log("HtmlArray : ", HtmlArray);
// Modules and extensions
// If the value is true, then it will copy the files inside the `dist` folders
// But if the value is false, it will copy the entire module files and folders
const modulesToCopy = {
}

const copyModules = Object.keys(modulesToCopy).map(moduleName => {
    const withDist = modulesToCopy[moduleName]
    return {
        src: normalizePath(resolve(__dirname, `./node_modules/${moduleName}${withDist ? '/dist' : ''}`)),
        dest: 'assets/extensions',
        rename: moduleName
    }
})

build({
    configFile: false,
    build: {
        emptyOutDir: false,
        outDir: resolve(__dirname, `${FrontEndDistFolder}/assets/compiled/js`),
        lib: {
            name: 'app',
            formats: ['umd'],
            fileName: 'app',
            entry: './src/FrontEnd/assets/js/app.js',
        },
        rollupOptions: {
            output: {
                entryFileNames: '[name].js'
            }
        }
    },
});

export default defineConfig((env) => ({
    publicDir: 'static',
    base: './',
    root,
    plugins: [
        viteStaticCopy({
            targets: [
                { src: normalizePath(resolve(__dirname, `./${FrontEndSrcFolder}/assets/static`)), dest: 'assets' },
                { src: normalizePath(resolve(__dirname, `./${FrontEndSrcFolder}/assets/compiled/fonts`)), dest: 'assets/compiled/css' },
                { src: normalizePath(resolve(__dirname, "./node_modules/bootstrap-icons/bootstrap-icons.svg")), dest: 'assets/static/images' },
                ...copyModules
            ],
            watch: {
                reloadPageOnChange: true
            }
        }),
        nunjucks({
            templatesDir: root,
            variables: StartFuncGetVariables({ mode: env.mode, inFilesArray: HtmlArray, inSidebarItems: sidebarItems }),
            nunjucksEnvironment: {
                filters: {
                    containString: (str, containStr) => {
                        if (!str.length) return false
                        return str.indexOf(containStr) >= 0
                    },
                    startsWith: (str, targetStr) => {
                        console.log(" kkkkkk , ", str, targetStr);
                        if (!str.length) return false
                        return str.startsWith(targetStr)
                    }
                }
            }
        })
    ],
    resolve: {
        alias: {
            '@': normalizePath(resolve(__dirname, 'src')),
            '~bootstrap': resolve(__dirname, 'node_modules/bootstrap'),
            '~bootstrap-icons': resolve(__dirname, 'node_modules/bootstrap-icons'),
            '~perfect-scrollbar': resolve(__dirname, 'node_modules/perfect-scrollbar'),
            '~@fontsource': resolve(__dirname, 'node_modules/@fontsource'),
        }
    },
    build: {
        emptyOutDir: false,
        manifest: true,
        target: "chrome58",
        outDir: resolve(__dirname, `${FrontEndDistFolder}`),
        rollupOptions: {
            input: HtmlArray,
            output: {
            }
        },
    }
}))