#!/usr/bin/env bash

# https://docs.mongodb.com/manual/reference/built-in-roles/
# https://medium.com/@MaxouMask/secured-mongodb-container-6b602ef67885

echo 'Creating application user and db'

mongo ${APP_MONGO_DB} \
        --host ${MONGO_HOST} \
        --port ${MONGO_PORT} \
        -u ${MONGO_ROOT_USER} \
        -p ${MONGO_ROOT_PASS} \
        --authenticationDatabase admin \
        --eval "db.createUser({user: '${APP_MONGO_USER}', pwd: '${APP_MONGO_PASS}', roles:[{role:'dbOwner', db: '${APP_MONGO_DB}'}]});"
