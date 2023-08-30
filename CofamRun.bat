@echo off
cd C:\Users\Pablo\Desktop\Cofam2.0\cofam_front
start cmd.exe /k "npm run start"
cd C:\Users\Pablo\Desktop\Cofam2.0\cofam_back
start cmd.exe /k "node ./server"
exit
