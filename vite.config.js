import { defineConfig, normalizePath, build } from 'vite'
import fs from 'fs'
import path, { resolve } from 'path'
import { fileURLToPath } from 'url';
import nunjucks from 'vite-plugin-nunjucks'
import { viteStaticCopy } from 'vite-plugin-static-copy';
import sidebarItems from './src/FrontEnd/menu.json';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const FrontEndSrcFolder = "src/FrontEnd";
const FrontEndDistFolder = "publicDir/bin";

const root = resolve(__dirname, `${FrontEndSrcFolder}`);

const getFiles = () => {
    let files = {}

    fs.readdirSync(root)
        .filter(filename => filename.endsWith('.html'))
        .forEach(filename => {
            files[filename.slice(0, -5)] = resolve(root, filename)
        })
    return files
}

const files = getFiles()

const getVariables = (mode) => {
    const variables = {}
    Object.keys(files).forEach((filename) => {
        if (filename.includes('layouts/FrontEnd')) filename = `layouts/FrontEnd/${filename}`
        variables[filename + '.html'] = {
            web_title: "Mazer Admin Dashboard",
            sidebarItems,
            isDev: mode === 'development'
        }
    })
    return variables
}

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
})



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
            variables: getVariables(env.mode),
            nunjucksEnvironment: {

                filters: {
                    containString: (str, containStr) => {
                        if (!str.length) return false
                        return str.indexOf(containStr) >= 0
                    },
                    startsWith: (str, targetStr) => {
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
            input: files,
            output: {
                entryFileNames: `assets/compiled/js/[name].js`,
                chunkFileNames: `assets/compiled/js/[name].js`,

                assetFileNames: (a) => {
                    const extname = a.name.split('.')[1]
                    let folder = extname ? `${extname}/` : ''

                    // Put fonts into css folder
                    if (['woff', 'woff2', 'ttf'].includes(extname))
                        folder = 'fonts/'

                    return `assets/compiled/${folder}[name][extname]`
                }
            }
        },
    }
}))