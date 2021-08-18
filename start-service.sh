#!/bin/sh

echo "image buildを開始します"
docker-compose build

echo "コンテナを立ち上げます"
docker-compose up -d

echo "migrateを実行"
docker-compose exec technical_task_backend python manage.py migrate

echo "migrationを確認"
docker-compose exec technical_task_backend python manage.py showmigrations

