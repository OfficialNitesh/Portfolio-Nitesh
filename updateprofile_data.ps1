# 1. Define and navigate to your repository's exact path
$repoPath = "C:\Users\realo\Downloads\Portfolio Nitesh"
Set-Location -Path $repoPath

# 2. Ensure a 'data' directory exists
$dataPath = Join-Path -Path $repoPath -ChildPath "data"
if (!(Test-Path -Path $dataPath)) {
    New-Item -ItemType Directory -Path $dataPath | Out-Null
}

# 3. Generate a timestamp and update the JSON file
$timestamp = (Get-Date).ToUniversalTime().ToString("yyyy-MM-ddTHH:mm:ssZ")
$jsonContent = "{ `"last_sync`": `"$timestamp`", `"environment`": `"production`" }"
Set-Content -Path "$dataPath\sync-status.json" -Value $jsonContent

# 4. Stage, commit, and push using Git
git add data/sync-status.json
git commit -m "chore: sync environment status data"

# 5. Push to GitHub
git push origin main