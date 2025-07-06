@echo off
REM Automated React Portfolio Deployment Script for Windows
REM This script builds the React app and copies all necessary files to root directory

echo 🚀 Starting automated deployment...

REM Step 1: Build the React application
echo 📦 Building React application...
set NODE_OPTIONS=--openssl-legacy-provider
call npm run build

REM Check if build was successful
if errorlevel 1 (
    echo ❌ Build failed! Exiting...
    pause
    exit /b 1
)

echo ✅ Build completed successfully!

REM Step 2: Copy built files to root
echo 📁 Copying built files...
copy build\index.html .\index.html
xcopy build\static .\static /E /I /Y
copy build\service-worker.js .\service-worker.js
copy build\precache-manifest.*.js .\
copy build\asset-manifest.json .\asset-manifest.json

echo ✅ Built files copied!

REM Step 3: Copy assets from public directory
echo 📁 Copying assets from public directory...
xcopy public\css .\css /E /I /Y
xcopy public\js .\js /E /I /Y
copy public\resumeData.json .\resumeData.json
xcopy public\images .\images /E /I /Y
copy public\manifest.json .\manifest.json
copy public\favicon.ico .\favicon.ico

echo ✅ Assets copied!

REM Step 4: Clean up build directory
echo 🧹 Cleaning up...
rmdir /s /q build

echo ✅ Cleanup completed!

REM Step 5: Optional - Git operations
set /p choice=🔄 Do you want to commit and push to GitHub? (y/n): 
if /i "%choice%"=="y" (
    echo 📤 Adding files to git...
    git add -A
    
    echo 💾 Committing changes...
    git commit -m "Deploy React portfolio - %date% %time%"
    
    echo 🚀 Pushing to GitHub...
    git push origin master
    
    echo ✅ Deployment complete! Your site will be live in a few minutes.
    echo 🌐 Visit: https://kianooshsoleimani.github.io
) else (
    echo ✅ Files are ready! You can manually commit and push when ready.
)

echo 🎉 Deployment process finished!
pause 