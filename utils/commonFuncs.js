import { execSync } from 'node:child_process';
import { projectTypes } from './allowedPackages.js';
import chalk from 'chalk';

export function normalizeProjectType(type) {
    if (!type) return projectTypes[0];
    return type;
}

export function normalizePackageManager(pm) {
    if (!pm) return "npm";
    return pm;
}

export function isValidPackageManager(pm) {
    return ["npm", "yarn", "pnpm"].includes(pm);
}

export function logConfig(config) {
    console.log(chalk.cyan("\nUsing configuration:"));
    console.log(`  projectType:     ${config.projectType}`);
    console.log(`  projectName:     ${config.projectName}`);
    console.log(`  git:             ${config.projectUseGit ? "yes" : "no"}`);
    console.log(`  packageManager:  ${config.packageManager}`);
    console.log(`  open (VS Code):  ${config.open ? "yes" : "no"}`);
    console.log("");
}

export function hasGit() {
    try {
        execSync("git --version", { stdio: "ignore" });
        return true;
    } catch (ex) {
        return false;
    }
}

export function hasCodeCli() {
    try {
        execSync("code --version", { stdio: "ignore" });
        return true;
    } catch {
        return false;
    }
}

export function getOwnerFromScope(scope) {
    return scope.replace(/^@/, "");
}
