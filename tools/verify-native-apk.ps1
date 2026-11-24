[CmdletBinding()]
param([Parameter(Mandatory)][string]$Apk)

$ErrorActionPreference = 'Stop'
Add-Type -AssemblyName System.IO.Compression.FileSystem
$packageFile = (Resolve-Path -LiteralPath $Apk).Path
$archive = [IO.Compression.ZipFile]::OpenRead($packageFile)
try {
    $entries = @($archive.Entries | ForEach-Object FullName)
    $legacy = @($entries | Where-Object {
        $_ -match '(?i)(^|/)(web-ui|node_modules|ui-backup)(/|$)|^assets/(player/|himitsu/reader\.|third-party-ui-notices\.txt)|^assets/.*\.(html?|m?js|css|tsx?|map|zip)$'
    })
    if ($legacy) { throw ("Legacy interface files found in APK: " + ($legacy -join ', ')) }
    foreach ($license in @('GPL-3.0.txt','kuromoji-LICENSE.md','kuromoji-NOTICE.md')) {
        if ($entries -notcontains "assets/himitsu/licenses/$license") { throw "Missing offline license: $license" }
    }
    Write-Output ("Verified {0}: {1} entries, no legacy web resources." -f [IO.Path]::GetFileName($packageFile),$entries.Count)
} finally {
    $archive.Dispose()
}
