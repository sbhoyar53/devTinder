# DevTinder Apis

# userAuth
- POST /signup
- POST /login
- POST /logout

# profileRouter
- GET profile/view
- Patch profile/update
- patch profile/password

## connectionRequestRouter
- POST /request/send/interested/:id
- POST /request/send/ignored/:id
- POST /request/review/accepted/:id
- POST /request/review/rejected/:id

## userRouter
- GET /user/connections
- GET /user/requests
- GET /user/Feed - get other users profiles

Status:  ignore, interested , accpted , rejected 