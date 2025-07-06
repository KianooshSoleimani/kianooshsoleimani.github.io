# 🚀 Automated Deployment Guide

This guide explains how to use the automated deployment system for your React portfolio.

## 📋 Available Methods

### 1. Using NPM Scripts (Recommended)

```bash
# Build and copy files only
npm run deploy

# Build, copy files, and push to GitHub
npm run deploy-and-push

# Just copy files (if you already have a build)
npm run copy-files
```

### 2. Using Shell Script (Mac/Linux)

```bash
# Run the deployment script
./deploy.sh
```

### 3. Using Batch Script (Windows)

```cmd
# Run the deployment script
deploy.bat
```

## 🔄 What the Automation Does

1. **Builds the React app** with legacy OpenSSL support
2. **Copies built files** to root directory:
   - `index.html`
   - `static/` folder (JS & CSS)
   - `service-worker.js`
   - `precache-manifest.*.js`
   - `asset-manifest.json`

3. **Copies assets** from `public/` to root:
   - `css/` folder
   - `js/` folder
   - `images/` folder
   - `resumeData.json`
   - `manifest.json`
   - `favicon.ico`

4. **Cleans up** the build directory
5. **Optionally commits and pushes** to GitHub

## 🛠️ Manual Commands

If you prefer to run commands manually:

```bash
# Build the app
NODE_OPTIONS="--openssl-legacy-provider" npm run build

# Copy files (after build)
npm run copy-files

# Commit and push
git add -A
git commit -m "Deploy React portfolio"
git push origin master
```

## 📝 Script Details

### NPM Scripts in package.json

- `build`: Builds the React app with legacy OpenSSL support
- `copy-files`: Copies all necessary files to root directory
- `deploy`: Runs build + copy-files
- `deploy-and-push`: Runs deploy + git operations

### Shell Scripts

- `deploy.sh`: Interactive deployment script for Mac/Linux
- `deploy.bat`: Interactive deployment script for Windows

## 🎯 Quick Start

1. **Make changes** to your React code
2. **Run deployment**:
   ```bash
   npm run deploy-and-push
   ```
3. **Wait a few minutes** for GitHub Pages to update
4. **Visit**: [https://kianooshsoleimani.github.io](https://kianooshsoleimani.github.io)

## 🔧 Troubleshooting

- **Build fails**: Check if Node.js version is compatible
- **Files not copying**: Ensure `public/` directory exists
- **Git push fails**: Check if you're logged in to GitHub

## 📦 Files Created/Updated

After running deployment, these files will be in root:
- `index.html` (React app)
- `static/` (JS & CSS)
- `css/`, `js/`, `images/` (assets)
- `resumeData.json` (your data)
- Service worker files

## 🌟 Benefits

- **One command deployment**
- **No manual file copying**
- **Automatic cleanup**
- **Git integration**
- **Cross-platform support** 