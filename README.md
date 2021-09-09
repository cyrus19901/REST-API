# REST-API

This code basically exposes the following enpdoint

## API to get back the content of the snippet 
GET http://127.0.0.1:3000/snippets/:snippet_name
Example
```
curl -X POST \
  http://127.0.0.1:3000/snippets \
  -H 'Content-Type: application/json' \
  -d '{
	"name": "recipe",
	"expires_in": 30,
	"snippet": "2 apple"
}'
```

Response:
```
{
    "url": "http://127.0.0.1:3000/recipe",
    "name": "recipe",
    "expires": "2021-09-09T01:56:49.385Z",
    "snippet": "2 apple"
}

```

## API to save the snippet 
POST http://127.0.0.1:3000/snippets

Example
```
curl -X POST \
  http://127.0.0.1:3000/snippets \
  -H 'Content-Type: application/json' \
  -d '{
	"name": "recipe",
	"expires_in": 30,
	"snippet": "2 apple"
}'
```

Response 
```
{
    "url": "http://127.0.0.1:3000/snippets/recipe",
    "name": "recipe",
    "expires": "2021-09-09T02:06:29.250Z",
    "snippet": "2 apple"
}
```

## API to add a like to the snippet 
POST http://127.0.0.1:3000/snippets/:snippet_name/like


Example
```
curl -X POST \
  http://127.0.0.1:3000/snippets/recipe/like 

  ```

  Response 
```
{
    "url": "http://127.0.0.1:3000/snippets/recipe",
    "name": "recipe",
    "expires": "2021-09-09T02:06:29.250Z",
    "snippet": "2 apple",
    "like": 1
}
```

## How to run ?
Install the basic pacakge of `express` and `nodemon` (dev envieonment)

Once all packages are installed you can start the project like

`node stellar.js`

