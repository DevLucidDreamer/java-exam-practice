param([switch]$BuildOnly)
$ErrorActionPreference = 'Stop'
$cloudflareOutput = Join-Path $PSScriptRoot 'dist'
$cloudflareFiles = @('index.html','app.js','core.js','questions.js','legacy-questions.js','lessons.js','study.js','study.css','styles.css','final-mock-exam.pdf')
foreach ($cloudflareFile in $cloudflareFiles) {
    if (!(Test-Path -LiteralPath (Join-Path $PSScriptRoot $cloudflareFile) -PathType Leaf)) {
        throw "Required asset missing: $cloudflareFile"
    }
}
New-Item -ItemType Directory -Path $cloudflareOutput -Force | Out-Null
foreach ($cloudflareFile in $cloudflareFiles) {
    Copy-Item -LiteralPath (Join-Path $PSScriptRoot $cloudflareFile) -Destination (Join-Path $cloudflareOutput $cloudflareFile)
}
if ($BuildOnly) { Write-Output "Prepared 10 site assets in $cloudflareOutput"; return }
Push-Location $PSScriptRoot
try {
    & npx --yes wrangler pages deploy ./dist --project-name java-exam-practice --branch main
    if ($LASTEXITCODE -ne 0) { throw "Cloudflare deployment failed ($LASTEXITCODE)." }
} finally { Pop-Location }
