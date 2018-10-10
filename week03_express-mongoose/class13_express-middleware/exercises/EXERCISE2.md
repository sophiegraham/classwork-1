# Exercise 2 - Create logging express middleware

## Simple Request logger

The middleware should print the HTTP method and the path. For example:

```
GET /
```

or 

```
GET /hi
```

## Bonus - Request and Response logger

The middleware should print the HTTP method, path, and status code. For example:

```
GET / [200]
```

or 

```
GET /hi [200]
```

## Bonus - Request and Response logger with metrics

The middleware should print the HTTP method, path, status code, and response
time. For example:


```
GET / [200] - 0ms
```

or 

```
GET / [200] - 2ms
```
