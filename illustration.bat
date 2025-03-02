@echo off

start cmd /k "python algorithm.py"

timeout /t 5 /nobreak

start cmd /k "node server.js"

pause
