# kiwi

Sweet Services

### Endpoints

- `POST /kiwi/email`

- Header

  - Authorization : "Bearer JD8as9d..."

- Body
  - hackers: Array of hacker objects
  - template: Email templates to be used

```
{
    template: "email_template",
    hackers:[
        {
            "email":"example@email.com",
            "first_name":"Bob",
            "last_name":"Hope"
        }
    ]
}
```

---

- `GET /kiwi/token`

Request a token to use for the service routes.

- Query: `email` & `pass`

_example request_

`http://localhost:3005/kiwi/token?email=example@email.com&password=$biensupernice`

```
{
    "success": true,
    "data": {
        "token": "eyJhbGciOiJIUz...."
    }
}
```
