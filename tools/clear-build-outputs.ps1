<#
.SYNOPSIS
Clear the build directory immediately below each tracked Android Gradle module.
.DESCRIPTION
Gradle's offline dependency store (.local/gradle), downloaded Maven artifacts
(downloads), emulator data, signing keys and archived APKs reside outside these
directories. Use -WhatIf to print the exact module outputs before cleaning.
#>
[CmdletBinding(SupportsShouldProcess)]
param()

$ErrorActionPreference = 'Stop'
$root = (Resolve-Path -LiteralPath (Join-Path $PSScriptRoot '..')).Path
$android = Join-Path $root 'android'
$scripts = @(git -C $root ls-files -- 'android/build.gradle.kts' 'android/**/build.gradle.kts')
if ($LASTEXITCODE -ne 0 -or $scripts -notcontains 'android/build.gradle.kts') {
    throw 'Cannot identify Android modules in this Git checkout.'
}

foreach ($script in $scripts) {
    $module = Split-Path $script -Parent
    $output = Join-Path $root "$module/build"
    if (-not (Test-Path -LiteralPath $output)) { continue }
    $actual = (Resolve-Path -LiteralPath $output).Path
    if ($actual -ne [IO.Path]::GetFullPath($output) -or
        -not $actual.StartsWith($android + '\', [StringComparison]::OrdinalIgnoreCase)) {
        throw "Unexpected module output path: $actual"
    }
    for ($dir = Get-Item -LiteralPath $actual; $dir.FullName -ne $root; $dir = $dir.Parent) {
        if ($dir.Attributes -band [IO.FileAttributes]::ReparsePoint) {
            throw "Linked directory in output path: $($dir.FullName)"
        }
    }
    $tracked = @(git -C $root ls-files -- ($module.Replace('\', '/') + '/build/'))
    if ($LASTEXITCODE -ne 0 -or $tracked.Count) { throw "Could not confirm untracked output: $actual" }
    if ($PSCmdlet.ShouldProcess($actual, 'Clear Gradle output')) {
        $entries = @(Get-ChildItem -LiteralPath $actual -Force -Recurse)
        foreach ($entry in $entries) {
            if (-not $entry.FullName.StartsWith($actual + '\', [StringComparison]::OrdinalIgnoreCase) -or
                ($entry.Attributes -band [IO.FileAttributes]::ReparsePoint) -or $entry.Name -eq '.git') {
                throw "Unexpected entry inside module output: $($entry.FullName)"
            }
        }
        foreach ($file in $entries.Where({ -not $_.PSIsContainer })) { $file.Delete() }
        foreach ($child in ($entries.Where({ $_.PSIsContainer }) | Sort-Object { $_.FullName.Length } -Descending)) {
            [IO.Directory]::Delete($child.FullName, $false)
        }
        [IO.Directory]::Delete($actual, $false)
    }
}
