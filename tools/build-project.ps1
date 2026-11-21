# DLSound: use existing tools and keep all generated state in this project.
# Gradle offline/cache policy: https://docs.gradle.org/current/userguide/dependency_caching.html
[CmdletBinding()]
param(
    [string[]]$Tasks = @('help'),
    [string]$GradleDir = 'C:\Users\Public\Android\Gradle\gradle-9.5.1',
    [string]$JavaDir = 'D:\Idea\jdk\jdk-21.0.9',
    [string]$SdkDir = 'C:\Users\Public\Android\Sdk',
    [switch]$UseApprovedDependencies
)

$ErrorActionPreference = 'Stop'
$physicalProjectRoot = [IO.Path]::GetFullPath((Join-Path $PSScriptRoot '..'))
$projectRoot = $physicalProjectRoot
$mappedDrive = $null
$savedEnvironment = @{}
$locationPushed = $false
$exitStatus = 1
try {
# Java worker argument files on this Windows installation cannot load a non-ASCII classpath.
# A temporary SUBST alias changes only the spelling; all files still reside in the workspace.
if ($physicalProjectRoot -match '[^\x00-\x7F]') {
    foreach ($candidate in @('H', 'J', 'K', 'L', 'M', 'N')) {
        if (-not (Get-PSDrive -Name $candidate -ErrorAction SilentlyContinue)) {
            & "$env:SystemRoot\System32\subst.exe" ($candidate + ':') $physicalProjectRoot
            if ($LASTEXITCODE -eq 0) {
                $mappedDrive = $candidate + ':'
                $projectRoot = $mappedDrive + '\'
                break
            }
        }
    }
    if ($null -eq $mappedDrive) { throw 'No temporary ASCII drive alias is available.' }
}
$localRoot = Join-Path $projectRoot '.local'
$androidRoot = Join-Path $projectRoot 'android'
$gradleCommand = Join-Path $GradleDir 'bin\gradle.bat'
foreach ($requiredPath in @($gradleCommand, (Join-Path $JavaDir 'bin\java.exe'), (Join-Path $SdkDir 'platform-tools\adb.exe'))) {
    if (-not (Test-Path -LiteralPath $requiredPath)) { throw "Existing tool not found: $requiredPath" }
}
foreach ($task in $Tasks) {
    if ($task.StartsWith('-')) { throw 'Tasks must be task names, not command-line options.' }
}
if ($UseApprovedDependencies) {
    $approval = Get-Content -LiteralPath (Join-Path $projectRoot 'docs\dependency-request.json') -Raw | ConvertFrom-Json
    if ($approval.request_id -ne 'D002' -or $approval.status -ne 'approved') {
        throw 'The required dependency download approval has not been recorded.'
    }
}

$taskEnvironment = @{
    JAVA_HOME = $JavaDir
    ANDROID_HOME = $SdkDir
    ANDROID_SDK_ROOT = $SdkDir
    GRADLE_USER_HOME = (Join-Path $localRoot 'gradle')
    ANDROID_USER_HOME = (Join-Path $localRoot 'android-user')
    TEMP = (Join-Path $localRoot 'tmp')
    TMP = (Join-Path $localRoot 'tmp')
    JAVA_OPTS = ('-Dfile.encoding=UTF-8 "-Djava.io.tmpdir={0}" "-Duser.home={1}"' -f (Join-Path $localRoot 'tmp'), (Join-Path $localRoot 'home'))
}
foreach ($directory in @('gradle', 'android-user', 'tmp', 'home', 'project-cache')) {
    New-Item -ItemType Directory -Path (Join-Path $localRoot $directory) -Force | Out-Null
}
$cacheSnapshot = Join-Path $localRoot 'reused-deps'
if (Test-Path -LiteralPath (Join-Path $cacheSnapshot 'modules-2')) {
    $taskEnvironment['GRADLE_RO_DEP_CACHE'] = $cacheSnapshot
} else {
    $taskEnvironment['GRADLE_RO_DEP_CACHE'] = $null
}
foreach ($name in $taskEnvironment.Keys) {
    $savedEnvironment[$name] = [Environment]::GetEnvironmentVariable($name, 'Process')
    [Environment]::SetEnvironmentVariable($name, $taskEnvironment[$name], 'Process')
}
    Push-Location -LiteralPath $projectRoot
    $locationPushed = $true
    $jvmArgs = '-Xmx3g -Dfile.encoding=UTF-8 "-Djava.io.tmpdir={0}" "-Duser.home={1}"' -f (Join-Path $localRoot 'tmp'), (Join-Path $localRoot 'home')
    $gradleArguments = @(
        '--no-daemon', '--console=plain', '--stacktrace',
        '--project-dir', $androidRoot,
        '--project-cache-dir', (Join-Path $localRoot 'project-cache'),
        '-Dorg.gradle.java.installations.auto-download=false',
        '-Pandroid.builder.sdkDownload=false',
        '-Pkotlin.compiler.execution.strategy=in-process',
        "-Dorg.gradle.jvmargs=$jvmArgs"
    ) + $Tasks
    if (-not $UseApprovedDependencies) { $gradleArguments = @('--offline') + $gradleArguments }
    & $gradleCommand @gradleArguments
    $exitStatus = $LASTEXITCODE
} finally {
    if ($locationPushed) { Pop-Location }
    foreach ($name in $savedEnvironment.Keys) {
        [Environment]::SetEnvironmentVariable($name, $savedEnvironment[$name], 'Process')
    }
    if ($mappedDrive) { & "$env:SystemRoot\System32\subst.exe" $mappedDrive /D }
}
exit $exitStatus
