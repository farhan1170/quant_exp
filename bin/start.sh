export NODE_PATH=$NODE_PATH:$PWD/server
export NODE_PATH=$NODE_PATH:$PWD


echo $NODE_PATH
NBS_CURR_PROJECT_PATH=$PWD
export TZ='Asia/Kolkata'


if [ ! $NODE_LAUNCH_SCRIPT ]; then
  export NODE_LAUNCH_SCRIPT="node $NBS_CURR_PROJECT_PATH/main.js"
fi


$NODE_LAUNCH_SCRIPT