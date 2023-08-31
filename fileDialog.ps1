Add-Type -AssemblyName System.windows.forms
$dialog = New-Object System.Windows.Forms.OpenFileDialog
[void]$dialog.ShowDialog()
$dialog.FileName