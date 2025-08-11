Write-Host "Setting up Git repository for Data Migration Tool Prototype..." -ForegroundColor Green
Write-Host ""

Write-Host "Initializing Git repository..." -ForegroundColor Yellow
git init

Write-Host "Adding .gitignore..." -ForegroundColor Yellow
git add .gitignore

Write-Host "Adding source code files..." -ForegroundColor Yellow
git add app/, components/, hooks/, lib/, public/, styles/, *.json, *.ts, *.mjs, *.d.ts, README.md

Write-Host "Creating initial commit..." -ForegroundColor Yellow
git commit -m "Initial commit: Data Migration Tool Prototype"

Write-Host ""
Write-Host "Git repository setup complete!" -ForegroundColor Green
Write-Host ""
Write-Host "Next steps:" -ForegroundColor Cyan
Write-Host "1. Create a new repository on GitHub/GitLab called 'data-migration-prototype'" -ForegroundColor White
Write-Host "2. Add the remote origin: git remote add origin <repository-url>" -ForegroundColor White
Write-Host "3. Push to remote: git push -u origin main" -ForegroundColor White
Write-Host ""
Write-Host "Press any key to continue..."
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
