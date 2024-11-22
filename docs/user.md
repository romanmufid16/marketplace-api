# User API SPEC

Base URL : http://localhost:3000/api/v1

## Register API Spec

Endpoint : POST /users/register

Request Body :

```json
{
  "name": "User",
  "email": "user@example.com",
  "password": "secret123"
}
```

Response Body :

```json
{
  "success": true,
  "message": "Register Successfully",
  "result" : {
    "name": "User",
    "email": "user@example.com"
  }
}
```

Response Error :

```json
{
  "success": false,
  "errors": "Error..." // Some errors message
}
```

## Login API Spec

Endpoint : POST /users/auth

Request Body :

```json
{
  "email": "user@example.com",
  "password": "secret123"
}
```

Response Body : 

```json
{
  "success": true,
  "message": "Login successfully",
  "result" : {
    "token": "JWT_TOKEN"
  }
}
```

Response Error :

```json
{
  "success": false,
  "errors": "Error..." // Some errors message  
}
```