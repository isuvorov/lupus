pwd='/projects/.lupus'
mkdir -p $pwd/queue
chmod 777 $pwd/queue
mkdir -p $pwd/queue
chmod 777 $pwd/queue

while true
do
  filename=`ls -1 queue | sed -n '1,1p'`
  if [ "$filename" == "" ]
  then
    echo "wait"
    sleep 2
    continue
  fi

  size=${#filename}
  let size-=3
  basename=${filename:0:size}
  echo "start $basename"
  # basename=${filename:0:(-4)}
  sh $pwd/queue/$basename.sh > $pwd/queue-logs/$basename.txt 2> $pwd/queue-logs/$basename.txt
  rm $pwd/queue/$basename.sh
  echo "finish $basename"
done
