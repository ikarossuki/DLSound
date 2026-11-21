[CmdletBinding()]
param()
$ErrorActionPreference = 'Stop'
$projectRoot = [IO.Path]::GetFullPath((Join-Path $PSScriptRoot '..'))
$uiRoot = Join-Path $projectRoot 'web-ui'
$modules = Join-Path $uiRoot 'node_modules'
if (-not (Test-Path -LiteralPath (Join-Path $modules 'vite\bin\vite.js'))) {
    throw 'Existing UI dependencies are missing. This script does not install or download anything.'
}
Push-Location -LiteralPath $uiRoot
try {
    & node (Join-Path $modules 'typescript\bin\tsc') --noEmit
    if ($LASTEXITCODE -ne 0) { throw 'UI type checking failed.' }
    & node --test tests/timeline.test.mjs tests/directories.test.mjs
    if ($LASTEXITCODE -ne 0) { throw 'UI logic checks failed.' }
    & node (Join-Path $modules 'vite\bin\vite.js') build --configLoader native
    if ($LASTEXITCODE -ne 0) { throw 'UI asset build failed.' }
} finally { Pop-Location }
