#!/usr/bin/env node
'use strict';

const fs = require('fs');
const fse = require('fs-extra');
const copydir = require('copy-dir');
const path = require('path');
const inquirer = require('inquirer');
const figlet = require('figlet');
const clear = require('clear');
const { execSync } = require('child_process');

const uicomponentsPath = path.join(__dirname, '../../../uicomponents');
const microfrontendsPath = path.join(__dirname, '../../../microfrontends');

let environment;

function getUserData() {
    const questions = [
        {
            type: "list",
            message: "Choose environment",
            name: "environment",
            choices: [
                {
                    name: "Local",
                    value: 'local'
                },
                {
                    name: "Cloud",
                    value: 'cloud'
                }
            ]
        },
        {
            type: "list",
            message: "What do you want to do?",
            name: "command",
            when: (answers) => !answers.command ||  answers.option === 900,
            choices: [
                {
                    name: "Deploy component",
                    value: 1
                },
                {
                    name: "Deploy all",
                    value: 0
                }
            ]
        },
        {
            type: "list",
            message: "Which kind of component do you want to deploy?",
            name: "option",
            when: (answers) => answers.command === 1,
            choices: [
                {
                    name: "Apps",
                    value: 1.1
                },
                {
                    name: "Micro Frontends",
                    value: 1.2
                },
                {
                    name: "UI Components",
                    value: 1.3
                }
            ]
        },
        {
            type: "list",
            message: "Choose one Micro Frontend to deploy to local server",
            name: "microfrontend",
            when: (answers) => answers.option === 1.2,
            choices: getComponentChoices(path.join(__dirname, '../../../microfrontends'))
        },
        {
            type: "list",
            message: "Choose one UI Component to deploy to local server",
            name: "uicomponent",
            when: (answers) => answers.option === 1.3,
            choices: getComponentChoices(path.join(__dirname, '../../../uicomponents'))
        },
        {
            type: "list",
            message: "Choose one App to deploy to local server",
            name: "app",
            when: (answers) => answers.option === 1.1,
            choices: getComponentChoices(path.join(__dirname, '../../../apps'))
        }
    ];

    clear();

    inquirer.prompt(questions).then(function (answers) {
        const command = answers.command;
        const app = answers.app;
        const option = answers.option;
        const microfrontend = answers.microfrontend;
        const uicomponent = answers.uicomponent;
        environment = answers.environment;

        if (command === 0) {
            setupAll();
        }

        if (app) {
            if (app !== 'all') {
                buildApp(app);
            } else {
                buildAllApps();
            }
        }

        if (microfrontend) {
            console.log('Microfrontend....');
            if (microfrontend !== 'all') {
                buildMicrofrontend(microfrontend);
            } else {
                console.log('Microfrontend All....');
                buildComponents(microfrontendsPath, buildMicrofrontend);
            }
        }

        if (uicomponent) {
            if (uicomponent !== 'all') {
                buildUIComponent(uicomponent);
            } else {
                buildComponents(uicomponentsPath, buildUIComponent);
            }
        }



    });
}

const getComponentChoices = (componentPath) => {
    const choices = [{
        name: 'All',
        value: 'all'
    }];
    fs.readdirSync(componentPath)
        .filter((item) => !item.startsWith('.'))
        .forEach((item) => {
            choices.push({
                name: item,
                value: item
            })
        });

    return choices;
};

const setupAll = () => {
    console.log('Building all...');
    buildAllApps();
    buildComponents(microfrontendsPath, buildMicrofrontend);
    buildComponents(uicomponentsPath, buildUIComponent);
    //buildPortal(portalSource, 'portal');

};

const buildAllApps = () => {
    console.log('Building Apps...');
    buildApp('customers');
    buildApp('backoffice');
    buildApp('portal');
    buildApp('broker');

};

const install = (folder) => {
    execSync('npm i', { silent: true, cwd: folder, stdio: 'ignore' });
};

const build = (folder, script) => {
    if (!script) {
        script = 'build:prod-local';
    }
    execSync(`npm run ${script}`, { silent: true, cwd: folder, stdio: 'ignore'  });
};

const buildApp = (app) => {
    console.info(`Building app: ${app} ......`);
    const source = path.join(__dirname, `../../../apps/${app}`);

    cleanFolder(source);
    install(source);
    if (environment === 'cloud') {
        build(source, 'build:prod');
    } else {
        build(source);
    }

    publishApp(path.join(source,'dist',app), app);
};

const publishApp = (distFolder, app) => {
    if (environment === 'local') {
        const deploymentFolder = path.join(__dirname, `../../local/${app}-server/content`);
        if (!fs.existsSync(deploymentFolder)) {
            fs.mkdirSync(deploymentFolder, {recursive: true});
        } else {
            fs.rmdirSync(deploymentFolder, {recursive: true});
        }

        console.log('Copy from <' + distFolder + '> to <' + deploymentFolder + '>');
        copydir.sync(distFolder, deploymentFolder);
    }

    if (environment === 'cloud') {
        execSync(`npm run publish`, { silent: true, cwd: distFolder, stdio: 'ignore'  });
    }
};


const buildComponents = (componentsRootPath, componentBuildFunction) => {
    console.log('Building....');
    fs.readdir(componentsRootPath, function (err, files) {
        if (err) {
            return console.log('Unable to scan directory: ' + err);
        }
        files.filter(file => !file.startsWith('.')).forEach(file => componentBuildFunction(file));
    });
};

/*
const buildMicrofrontends = () => {
    fs.readdir(microfrontendsPath, function (err, files) {
        if (err) {
            return console.log('Unable to scan directory: ' + err);
        }
        files.forEach(function (file) {
            const fullPath = path.join(microfrontendsPath,file);
            if (!file.startsWith('.')) {
                buildMicrofrontend(file);
            }

        });
    });
};*/

async function buildMicrofrontend(microfrontend) {
    const folder = path.join(microfrontendsPath, microfrontend);
    console.log('Processing <' + folder + '>');
    console.log('\t - Cleaning.....');
    cleanFolder(folder);
    console.log('\t - Installing.....');
    execSync('npm i', { silent: true, cwd: folder, stdio: 'ignore' });
    console.log('\t - Building.....');
    execSync('npm run build:prod', { silent: true, cwd: folder, stdio: 'ignore'  });
    console.log('\t - Publishing....');
    if (environment === 'local') {
        publishMicrofrontendToLocalServer(microfrontend, folder);
    } else {
        execSync('npm run publish', { silent: true, cwd: folder, stdio: 'ignore'  });
    }
}

async function buildUIComponent(component) {
    const folder = path.join(uicomponentsPath, component);
    console.log('Processing <' + folder + '>');
    console.log('\t - Cleaning.....');
    cleanFolder(folder);
    console.log('\t - Installing.....');
    execSync('npm i', { silent: true, cwd: folder, stdio: 'ignore'  });
    console.log('\t - Building.....');
    execSync('npm run build:prod', { silent: true, cwd: folder, stdio: 'ignore'  });
    console.log('\t - Publishing....');
    if (environment === 'local') {
        publishUIComponentToLocalServer(component, folder);
    } else {
        execSync('npm run publish', { cwd: folder  });
    }
}

async function cleanFolder(folder) {
    const distFolder = path.join(folder, 'dist');
    const distNodeModules = path.join(folder, 'node_modules');

    fs.rmdirSync(distFolder, { recursive: true });
    fs.rmdirSync(distNodeModules, { recursive: true });
}

async function publishMicrofrontendToLocalServer(component, folder) {
    const srcDir = path.join(folder, 'dist');
    const destDir = path.join(__dirname, '../../local/microfrontends-server/content/microfrontends');
    if (!fs.existsSync(destDir)){
        fs.mkdirSync(destDir, { recursive: true });
    }

    if (fs.existsSync(path.join(destDir, component))){
        fs.rmdirSync(path.join(destDir, component), { recursive: true });
    }

    console.log('Copy from <' + srcDir + '> to <' + destDir + '>');
    copydir.sync(srcDir, destDir);

    const srcAssetsDir = path.join(srcDir, component, 'v1', 'assets', 'microfrontends');
    if (fs.existsSync(srcAssetsDir)) {
        const destAssetsDir = path.join(__dirname, '../../local/microfrontends-server/content', 'assets', 'microfrontends');
        console.log('Copy from <' + srcAssetsDir + '> to <' + destAssetsDir + '>');
        copydir.sync(srcAssetsDir, destAssetsDir);
    }

}

async function publishUIComponentToLocalServer(component, folder) {
    const srcDir = path.join(folder, 'dist','v1', component);
    const destDir = path.join(__dirname, '../../local/microfrontends-server/content/uicomponents',component, 'v1');
    console.log('Copy from <' + srcDir + '> to <' + destDir + '>');

    if (fs.existsSync(destDir)){
        fse.removeSync(destDir);
    }

    fs.mkdirSync(destDir, { recursive: true });
    copydir.sync(srcDir, destDir);

    const srcAssetsDir = path.join(srcDir, 'assets', 'uicomponents');
    if (fs.existsSync(srcAssetsDir)) {
        const destAssetsDir = path.join(__dirname, '../../local/microfrontends-server/content', 'assets', 'uicomponents');
        console.log('Copy from <' + srcAssetsDir + '> to <' + destAssetsDir + '>');
        copydir.sync(srcAssetsDir, destAssetsDir);
    }
}

getUserData();
