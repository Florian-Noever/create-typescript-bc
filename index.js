#!/usr/bin/env node

import * as commonFuncs from './utils/commonFuncs.js';
import { init } from './utils/createProject.js';
import { projectTypes } from './utils/allowedPackages.js';
import { execSync } from 'node:child_process';
import { cac } from "cac";
import inquirer from 'inquirer';
import path from "node:path";
import chalk from 'chalk';

const cli = cac("create-typescript-bc");

cli
    .command("[projectName]", "Create a new Typescript-BC project")
    .option("-y, --yes", "Skip prompts and use defaults")
    .option("-t, --project-type <type>", `Type of project to create: ${projectTypes.join("|")}`)
    .option("-g, --git", "Initialize a git repository")
    .option("--no-git", "Do not initialize a git repository")
    .option("-p, --pm <manager>", "Package manager: npm|yarn|pnpm")
    .option("-o, --open", "Open the project in VS Code after creation")
    .action(async (projectNameArg, flags) => {
        console.log(chalk.yellow('Welcome to Typescript-BC Project Generator!'));

        const defaultName = projectNameArg || "typescript-bc";

        const baseConfig = {
            projectType: commonFuncs.normalizeProjectType(flags.projectType),
            projectName: defaultName,
            projectUseGit: flags.git ?? false,
            packageManager: commonFuncs.normalizePackageManager(flags.pm),
            open: !!flags.open,
        };

        if (baseConfig.projectUseGit && !commonFuncs.hasGit()) {
            console.log(chalk.red('Install Git to use Typescript-BC Project Generator'));
            process.exitCode = 1;
            return;
        }

        if (flags.projectType && !projectTypes.includes(flags.projectType)) {
            console.log(chalk.red(`Invalid --project-type "${flags.projectType}". Must be one of: ${projectTypes.join(", ")}`));
            process.exitCode = 1;
            return;
        }

        if (flags.pm && !commonFuncs.isValidPackageManager(flags.pm)) {
            console.log(chalk.red(`Invalid --pm "${flags.pm}". Must be one of: npm, yarn, pnpm`));
            process.exitCode = 1;
            return;
        }

        let finalConfig = baseConfig;

        if (!flags.yes) {
            const questions = [];

            // projectType: prompt only if user didn't pass --project-type
            if (!flags.projectType) {
                questions.push({
                    type: "list",
                    name: "projectType",
                    message: "What type of project do you want to create?",
                    choices: [...projectTypes],
                    default: baseConfig.projectType,
                });
            }

            // projectName: prompt only if user didn't provide positional projectName
            if (!projectNameArg) {
                questions.push({
                    type: "input",
                    name: "projectName",
                    message: "What's the name of your project?",
                    default: baseConfig.projectName,
                });
            }

            // git: prompt only if user didn't pass --git or --no-git
            if (flags.git === undefined) {
                questions.push({
                    type: "confirm",
                    name: "projectUseGit",
                    message: "Initialize a git repository?",
                    default: baseConfig.projectUseGit,
                });
            }

            // pm: prompt only if user didn't pass --pm
            if (!flags.pm) {
                questions.push({
                    type: "list",
                    name: "packageManager",
                    message: "Which package manager to use?",
                    choices: ["npm", "yarn", "pnpm"],
                    default: baseConfig.packageManager,
                });
            }

            const prompted = questions.length ? await inquirer.prompt(questions) : {};

            finalConfig = {
                projectType: flags.projectType ?? prompted.projectType ?? baseConfig.projectType,
                projectName: projectNameArg ?? prompted.projectName ?? baseConfig.projectName,
                projectUseGit: flags.git ?? prompted.projectUseGit ?? baseConfig.projectUseGit,
                packageManager: flags.pm ?? prompted.packageManager ?? baseConfig.packageManager,
                open: baseConfig.open,
            };
        } else {
            // --yes mode: log what will be used
            commonFuncs.logConfig(finalConfig);
        }

        // Safety: validate again (covers prompted values too)
        if (!projectTypes.includes(finalConfig.projectType)) {
            console.log(chalk.red(`Invalid project type "${finalConfig.projectType}"`));
            process.exitCode = 1;
            return;
        }
        if (!commonFuncs.isValidPackageManager(finalConfig.packageManager)) {
            console.log(chalk.red(`Invalid package manager "${finalConfig.packageManager}"`));
            process.exitCode = 1;
            return;
        }

        const success = await init(
            finalConfig.projectType,
            finalConfig.projectName,
            finalConfig.projectUseGit,
            finalConfig.packageManager);
        if (!success) {
            process.exitCode = 1;
            return;
        }

        // Only ask about opening VS Code if --open was NOT provided
        if (!flags.open) {
            const vscodeAnswers = await inquirer.prompt([
                {
                    type: "list",
                    name: "openWithCode",
                    message: "Do you want to open the new folder with Visual Studio Code?",
                    choices: ["Open with `code`", "Skip"],
                },
            ]);
            finalConfig.open = vscodeAnswers.openWithCode === "Open with `code`";
        }

        if (finalConfig.open) {
            const currentDir = process.cwd();
            const destination = path.join(currentDir, finalConfig.projectName);

            if (!hasCodeCli()) {
                console.log(chalk.red("Couldn't find the VS Code CLI (`code`). In VS Code, run “Shell Command: Install 'code' command in PATH”, then try again."));
                return;
            }

            try {
                execSync(`code "${destination}"`, { stdio: "ignore" });
                console.log(chalk.green("Opened project in VS Code."));
            } catch {
                console.log(chalk.red("Failed to open VS Code with `code`."));
            }
        }
    });

cli.help();
cli.parse();
