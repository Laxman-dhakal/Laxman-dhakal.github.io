@echo off
title Auto Deploy Website - Laxman Dhakal Portfolio
color 0A
cls
echo ===================================================
echo     🚀 LAXMAN DHAKAL PORTFOLIO - AUTO DEPLOYER 🚀
echo ===================================================
echo.
echo [1/3] Checking for changes...
git status -s

echo.
echo [2/3] Staging and committing changes...
git add -A
for /f "tokens=2-4 delims=/ " %%a in ('date /t') do (set mydate=%%c-%%a-%%b)
for /f "tokens=1-2 delims=/:" %%a in ('time /t') do (set mytime=%%a:%%b)
git commit -m "Auto update: %mydate% %mytime%"

echo.
echo [3/3] Pushing to GitHub (Auto-deploy to Live Hosting)...
git push origin main

echo.
echo ===================================================
echo   ✅ SUCCESS: Website has been pushed to GitHub!
echo   ⚡ GitHub Actions will now automatically build
echo      and update your live website in ~30 seconds!
echo ===================================================
echo.
pause
