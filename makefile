build:
	sudo docker-compose up -d && npm install && npm install supervisor -g

dev:
	supervisor ./bin/www

stop:
	sudo docker-compose stop 
