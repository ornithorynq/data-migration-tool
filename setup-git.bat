@echo off
echo Setting up Git repository for Data Migration Tool Prototype...
echo.

echo Initializing Git repository...
git init

echo Adding .gitignore...
git add .gitignore

echo Adding source code files...
git add app/ components/ hooks/ lib/ public/ styles/ *.json *.ts *.mjs *.d.ts README.md

echo Creating initial commit...
git commit -m "Initial commit: Data Migration Tool Prototype"

echo.
echo Git repository setup complete!
echo.
echo Next steps:
echo 1. Create a new repository on GitHub/GitLab called 'data-migration-prototype'
echo 2. Add the remote origin: git remote add origin <repository-url>
echo 3. Push to remote: git push -u origin main
echo.
pause
