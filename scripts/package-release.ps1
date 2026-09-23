# Run from any directory with PowerShell 5.1 or newer.
$ErrorActionPreference = 'Stop'
Add-Type -AssemblyName System.IO.Compression.FileSystem
$repoRoot = Split-Path -Parent $PSScriptRoot
$manifest = Get-Content -LiteralPath (Join-Path $repoRoot 'manifest.json') -Raw | ConvertFrom-Json
if ($manifest.version -notmatch '^\d+(\.\d+){0,3}$') {
    throw 'Invalid manifest version.'
}

# Explicit allowlist: adding files to the repository never adds them to a release.
# Keep LICENSE with the distributed code.
$releaseFiles = @(
    'manifest.json', 'newtab.html', 'newtab.js', 'image-cache.js',
    'options.html', 'options.js', 'LICENSE',
    'icons/favicon-16x16.png', 'icons/favicon-32x32.png',
    'icons/favicon-48x48.png', 'icons/favicon-128x128.png', 'icons/favicon.ico',
    'images/background.jpg', 'images/my-doodle.gif'
)
foreach ($relativePath in $releaseFiles) {
    if (-not (Test-Path -LiteralPath (Join-Path $repoRoot $relativePath) -PathType Leaf)) {
        throw "Missing release file: $relativePath"
    }
}
$dist = Join-Path $repoRoot 'dist'
New-Item -ItemType Directory -Path $dist -Force | Out-Null
$zipPath = Join-Path $dist "DoodleTab-$($manifest.version).zip"
$stream = [System.IO.File]::Open($zipPath, [System.IO.FileMode]::Create)
try {
    $archive = New-Object System.IO.Compression.ZipArchive($stream, [System.IO.Compression.ZipArchiveMode]::Create)
    try {
        foreach ($relativePath in $releaseFiles) {
            [System.IO.Compression.ZipFileExtensions]::CreateEntryFromFile(
                $archive, (Join-Path $repoRoot $relativePath), $relativePath,
                [System.IO.Compression.CompressionLevel]::Optimal
            ) | Out-Null
        }
    } finally {
        $archive.Dispose()
    }
} finally {
    $stream.Dispose()
}
Write-Output "Created $zipPath ($($releaseFiles.Count) files)"
