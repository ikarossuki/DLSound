[CmdletBinding()]
param([string[]]$Tasks = @('help'))

& (Join-Path $PSScriptRoot 'build-project.ps1') -Tasks $Tasks
exit $LASTEXITCODE
