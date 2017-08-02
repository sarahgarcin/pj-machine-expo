#!/bin/bash
# set -x

# settings
# find the printer $ lpstat -p
# launch with $ bash print-deamon-no-watch.sh 

# change the printer name here
printer=Canon_LBP7100C_7110C

archivebox="archivebox/"
printinbox="printbox/"

# change the interval the daemon checks the folder (in seconds)
interval=10

# create archibox and printinbox folder if they don't exist
mkdir $archivebox $printinbox

while true; do

  for step in `find $printinbox -iname "*.pdf" -type f`
  do 
  # lpr options here -> https://www.microsoft.com/resources/documentation/windows/xp/all/proddocs/en-us/lpr.mspx?mfr=true
    lpr -P $printer -o media=A4 -o fit-to-page $step
    mv -v $step $archivebox # copy in outbox (archives)
  done

  # wait
  for (( i=$interval; i>0; i--)); do
    sleep 1 &
    printf "next try in $i s \r"
    wait
    printf "                   \r"
  done
done

