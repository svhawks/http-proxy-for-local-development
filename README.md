# http-proxy-for-local-development

Create SSL
https://devcenter.heroku.com/articles/ssl-certificate-self


http://blog.nodejitsu.com/http-proxy-intro/

Install
https://github.com/nodejitsu/node-http-proxy

Use gasmask to set host file:

````
127.0.0.1       localmovielala.com
127.0.0.1		embedadmin.localmovielala.com
127.0.0.1 		embed.localmovielala.com
127.0.0.1		api.localmovielala.com
````

Run ruby servers in these ports

````
'localmovielala.com': '127.0.0.1:3000',
'api.localmovielala.com': '127.0.0.1:4000',
'embed.localmovielala.com': '127.0.0.1:5000',
'embedadmin.localmovielala.com': '127.0.0.1:5001'
````

To Setup
```
mkdir -p ~/.development/proxy_server/; cd ~/.development/proxy_server/; wget https://github.com/movielala/http-proxy-for-local-development/archive/master.zip ; tar --strip-components=1 -zxf master.zip ; rm master.zip ; cd .. ; cd ..
```


Then Run
```
sudo node ~/.development/proxy_server/proxy_server.js
```

To update:
```
cd ~/.development/proxy_server/; wget https://github.com/movielala/http-proxy-for-local-development/archive/master.zip ; tar --strip-components=1 -zxf master.zip ; rm master.zip ; cd .. ; cd ..

```



 
