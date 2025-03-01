@echo off
setlocal EnableDelayedExpansion

start "Algorithm" cmd /k "python main.py"
set PYTHON_PID=%!

timeout /t 5

start "Server" cmd /k "node server.js"
set NODE_PID=%!

:: Wait for Ctrl+C
:loop
timeout /t 1 >nul
goto loop

:cleanup
taskkill /PID %PYTHON_PID% /F
taskkill /PID %NODE_PID% /F
exit

:: Handle Ctrl+C
trap cleanup INT
