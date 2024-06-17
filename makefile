DB_NAME=showcase_test
SQL_SCRIPT = ${shell pwd}/init-db.sql

start_postgres:
	@echo "Starting PostgreSQL..."
	@sudo systemctl start postgresql
	@sudo systemctl enable postgresql

create_db:
	@echo "Creating DB..."
	@sudo -i -u postgres psql -c "DROP DATABASE IF EXISTS $(DB_NAME);"
	@sudo -i -u postgres psql -c "CREATE DATABASE $(DB_NAME);"

run_sql_script:
	@echo "Running SQL script $(SQL_SCRIPT)..."
	@sudo -i -u postgres psql -d $(DB_NAME) -f $(SQL_SCRIPT)

db_connect:
	@sudo -i -u postgres psql -d $(DB_NAME)

.PHONY: server_deps
server_deps:
	@cd ./server && npm ci	

.PHONY: client_deps
client_deps:
	@cd ./client && npm ci

.PHONY: deps
deps: server_deps client_deps

.PHONY: client_start
client_start: 
	@cd ./client && npm run start

.PHONY: server_start
server_start: 
	@cd ./server && npm run start	

.PHONY: start


.PHONY: start_postgres create_db run_sql_script


