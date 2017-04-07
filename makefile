build:
	sudo docker-compose up -d && pm2 /src/bin/www

dev:
	sudo docker-compose up -d && supervisor /src/bin/www

stop:
	sudo docker-compose stop 
