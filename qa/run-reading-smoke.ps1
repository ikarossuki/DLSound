[CmdletBinding()]
param([Parameter(Mandatory)][string]$Serial, [Parameter(Mandatory)][string]$EvidenceName, [switch]$Review)

$ErrorActionPreference = 'Stop'
$PSNativeCommandUseErrorActionPreference = $true
if ($EvidenceName -notmatch '^[a-zA-Z0-9_-]+$') { throw 'Use a plain evidence name.' }
$projectRoot = [IO.Path]::GetFullPath((Join-Path $PSScriptRoot '..'))
$adb = 'C:\Users\Public\Android\Sdk\platform-tools\adb.exe'
$devices = & $adb devices
if (-not ($devices -match ('^' + [regex]::Escape($Serial) + '\s+device\b'))) {
    throw 'The explicitly selected test device is not online.'
}
$testApk = Get-ChildItem -LiteralPath (Join-Path $projectRoot 'android\app\lite\build\outputs\apk\androidTest\nowearModern\debug') -Filter *.apk | Select-Object -First 1
if (-not $testApk) { throw 'Build the local instrumentation APK first.' }
$evidence = Join-Path $projectRoot 'artifacts\device-qa'
[IO.Directory]::CreateDirectory($evidence) | Out-Null
& $adb -s $Serial install -r $testApk.FullName
if ($LASTEXITCODE -ne 0) { throw 'Test APK installation failed.' }
if ($Review) {
    $fixtureDir = '/sdcard/Music/DLSoundReview'
    & $adb -s $Serial shell mkdir -p $fixtureDir
    & $adb -s $Serial shell touch "$fixtureDir/.nomedia"
    foreach ($name in @('DLMatrix-mp3-vtt.mp3','DLMatrix-wav-vtt.wav')) {
        & $adb -s $Serial shell cp "/sdcard/Music/DLSoundMatrix/$name" "$fixtureDir/$name"
        if ($LASTEXITCODE -ne 0) { throw "Required emulator fixture is missing: $name" }
    }
    $result = & $adb -s $Serial shell am instrument -w -e phase review local.dlsound.player.test/com.github.anrimian.musicplayer.qa.LearningSmokeInstrumentation
    $result | Set-Content -LiteralPath (Join-Path $evidence "$EvidenceName-review.txt") -Encoding utf8
    if (($result -join "`n") -notmatch 'PASS 19 offset safe-integer boundary') { throw ($result -join "`n") }
    $result
    return
}
$phaseError = $null
try {
    foreach ($phase in @('edit', 'verify')) {
        $result = & $adb -s $Serial shell am instrument -w -e phase $phase local.dlsound.player.test/com.github.anrimian.musicplayer.qa.LearningSmokeInstrumentation
        $result | Set-Content -LiteralPath (Join-Path $evidence "$EvidenceName-$phase.txt") -Encoding utf8
        if (($result -join "`n") -notmatch "PASS reading correction $phase") { throw ($result -join "`n") }
        Write-Output "PASS $phase"
    }
} catch {
    $phaseError = $_
}
try {
    $result = & $adb -s $Serial shell am instrument -w -e phase restore local.dlsound.player.test/com.github.anrimian.musicplayer.qa.LearningSmokeInstrumentation
    $result | Set-Content -LiteralPath (Join-Path $evidence "$EvidenceName-restore.txt") -Encoding utf8
    if (($result -join "`n") -notmatch 'PASS reading correction restore') { throw ($result -join "`n") }
    Write-Output 'PASS restore'
} catch {
    if ($phaseError) { throw "$phaseError / Restore failed: $_" }
    throw
}
if ($phaseError) { throw $phaseError }
