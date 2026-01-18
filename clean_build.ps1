
Write-Host "Stopping Node processes..."
taskkill /F /IM node.exe /T 2>$null

Write-Host "Cleaning .next directory..."
if (Test-Path ".next") {
    Remove-Item -Recurse -Force ".next"
}

Write-Host "Cleaning node_modules cache..."
if (Test-Path "node_modules\.cache") {
    Remove-Item -Recurse -Force "node_modules\.cache"
}

Write-Host "Clean complete. You can now run 'npm run dev' again."
Write-Host "Note: If basic 'npm run dev' fails, try 'npm run dev -- -p 3001' to avoid port conflicts."
