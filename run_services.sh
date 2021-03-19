error_msg="Wrong input"

if [ -z "$1" ]; then
  echo "$error_msg"
else
  case $1 in
  -dev)
    echo "Starting all services..."
    docker-compose up -d node-db node-rabbitmq node-mongo
    ;;
  -prod)
    echo "Starting all services and server..."
    docker-compose up -d --build node-db node-rabbitmq node-mongo node-sample
    sleep 1
    docker exec -it node-sample bash -c "npm run migrate"
    docker exec -it node-sample bash -c "npm run seeders"
    ;;
  -test)
    echo "Starting all test services..."
    docker-compose up -d node-test-db node-rabbitmq node-mongo
    sleep 1
    docker exec -it node-test-db psql -U postgres -d postgres -c "DROP DATABASE node_sample;"
    docker exec -it node-test-db psql -U postgres -d postgres -c "CREATE DATABASE node_sample;"
    ;;
  *) echo "Not valid option" ;;
  esac
fi
