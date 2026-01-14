# Create Typescript BC

**Scaffold TypeScript projects with different frameworks for Microsoft Dynamics 365 Business Central ControlAddIns.**

`create-typescript-bc` is a command-line tool that helps you quickly set up a ready-to-use TypeScript project for Business Central.
Each project is configured to build into a single bundled JavaScript file that can be used directly as a **ControlAddIn** in Business Central.

---

## ✨ Features

* **Project templates** for:
  * Plain **TypeScript** projects (`bc-controladdin-typescript-template`)
  * **React + TypeScript** projects (`bc-controladdin-react-ts-template`)
  * **React + Vite + TypeScript** projects (`bc-controladdin-react-vite-ts-template`)
  * **Svelte + Vite + TypeScript** projects (`bc-controladdin-svelte-vite-ts-template`)
  * **Vue + Vite + TypeScript** projects (`bc-controladdin-vue-vite-ts-template`)
* Fully automated setup — no manual file copying
* Choose your **package manager** (`npm`, `yarn`, or `pnpm`)

---

## 🚀 Installation

You can run it directly with `npx` (no installation required):

```bash
npm create typescript-bc -y
```

```bash
npx create-typescript-bc -y
```

Or install globally:

```bash
npm install -g create-typescript-bc
```

Then use it anywhere with:

```bash
create-typescript-bc
```

---

## 🧰 Usage

When you run the command, you’ll be guided through a few prompts
The tool will then:

1. Create a new folder with your chosen **project name**
2. Copy the selected **template** into it
3. Install dependencies using your selected **package manager**
4. Optionally **initialize Git** and **open VS Code**

---

## 🧠 Requirements

* **Node.js** ≥ 18
* **Git** installed and available in your PATH
* (Optional) **VS Code CLI (`code`)** if you want to open the project automatically

If Git or the VS Code CLI is missing, the tool will guide you accordingly.

---

## 🏗 Example

```bash
npm create typescript-bc -y
```

Example output:

```
Welcome to Typescript-BC Project Generator!
? What type of project do you want to create? > bc-controladdin-typescript-template
? What's the name of your project? > customer-chart
? Initialize a git repository? > Yes
? Which package manager to use? > npm
Creating new project: customer-chart...
Installing dependencies with npm...
Successfully created react-ts-bc project.
? Do you want to open the new folder with Visual Studio Code? Open with `code` > Yes
Opened project in VS Code.
```

Now, just run inside your new project:

```bash
npm run build
```

The bundled output file `<projectname>.bundle.js` can be copied directly into your Business Central add-in folder.

---

## 🧩 Repository

GitHub: [Florian-Noever/create-typescript-bc](https://github.com/Florian-Noever/create-typescript-bc)

Bug reports and feature requests are welcome via [Issues](https://github.com/Florian-Noever/create-typescript-bc/issues).
