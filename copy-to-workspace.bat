@echo off
echo ========================================================
echo Syncing Saurabh Pigeon Net Website to Chrome Demo 2...
echo ========================================================
set "SRC=C:\Users\SHIVAM KR\SaurabhPigeonNet"
set "DST=C:\Users\SHIVAM KR\OneDrive\Documents\OneDrive\Documents\Desktop\Suraj Kumar\Chrome\Demo\2"

echo Copying root files and media gallery (50 images, 12 videos)...
xcopy "%SRC%\*" "%DST%\" /E /I /Y /Q

echo.
echo ========================================================
echo Sync Complete! All files, photos and videos copied.
echo ========================================================
pause
