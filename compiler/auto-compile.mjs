// writes this entire project to two different file paths, depending on the language.

import { JSDOM } from "jsdom";
import { homedir, constants } from "os";
import { readdirSync, Stats, copyFileSync, mkdirSync, readFileSync, writeFileSync } from "fs";
import { log } from "console";
import { watch } from "chokidar";

const EXCLUDED_ROOT_PATHS = ["scrapes", "compiler", "robots.txt", "LICENSE.md", "README.md", "sitemap.xml", "node_modules", ".vscode", ".git"];

const SUPPORTED_LANGUAGES = ["en", "he"];
const RESULT_PATH = homedir() + "\\Documents\\GitHub\\apbd.net";
const TOOL_ID = "foods";


/**
 * Returns the directory path for a given language.
 *
 * @param {"en" | "he"} lang - the language code (e.g. "en", "he")
 * @return {string} the directory path for the given language
 */
function getLangDir(lang) {
    return RESULT_PATH + "\\" + lang + "\\" + TOOL_ID + "\\";
}

SUPPORTED_LANGUAGES.forEach(lang => {
    mkdirSync(getLangDir(lang), { recursive: true });
});

let rootFiles = readdirSync(".");
rootFiles = rootFiles
    .filter(file => !EXCLUDED_ROOT_PATHS.includes(file))

log(rootFiles);

const watcher = watch(rootFiles, { persistent: true });

watcher
    .on('ready', onFilesReady)
    .on('add', manipulateFile)
    .on('change', manipulateFile)
    .on('unlink', onFileRemoved);

/**
 * Handles the addition/change of a file.
 *
 * @param {string} path - the path of the file
 * @param {Stats} fileStats - statistics about the file
 * @return {void}
 */
function manipulateFile(path) {
    log("Going over:", getLangDir("*") + path.split("\\").slice(0, -1).join("\\").concat(path));
    SUPPORTED_LANGUAGES.forEach(lang => {
        if (path.endsWith(".html")) {
            let content = readFileSync(path, "utf-8");
            // May support different langauges, produce translated documents

            let result = generateTranslation(content, lang);
            // Create the dir if it doesn't exist
            mkdirSync(getLangDir(lang) + path.split("\\").slice(0, -1).join("\\"), { recursive: true });
            writeFileSync(getLangDir(lang) + path, result, {});


        } else {
            // Copy other files
            // Create the dir if it doesn't exist
            mkdirSync(getLangDir(lang) + path.split("\\").slice(0, -1).join("\\"), { recursive: true });
            copyFileSync(path, getLangDir(lang) + path);
        }
    });
}

/**
 * Syncs current files.
 *
 * @return {void}
 */
function onFilesReady() {

    let files = readdirSync(".").filter(file => !EXCLUDED_ROOT_PATHS.includes(file));
    let folderQueue = files.filter(file => !file.includes("."));
    files = files.filter(file => file.includes("."));
    while (folderQueue.length > 0) {
        let folder = folderQueue.shift();
        let newFiles = readdirSync(folder);
        newFiles.forEach(file => {
            if (!file.includes(".")) {
                folderQueue.push(folder + "\\" + file);
            }
            else {
                files.push(folder + "\\" + file);
            }
        });
    }

    log(files);
    files.forEach(file => {
        manipulateFile(file);
    })

    log('Initial scan and sync complete. Ready for changes.')
}

/**
 * Handles the removal of a file.
 *
 * @param {string} path - the path of the removed file
 * @return {void}
 */
function onFileRemoved(path) {

}

function generateTranslation(content, lang) {
    const parser = new JSDOM(content);
    const doc = parser.window.document;

    let list = doc.getElementsByTagName("*");

    for (let element of list) {
        if (element.hasAttribute(lang)) {
            element.innerHTML = element.getAttribute(lang);
        }
    }

    return doc.documentElement.outerHTML;
}