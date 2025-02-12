# Short.LY Express API

## endpoints
- `GET /api/uls`
- `POST /api/uls/`
- `PUT /api/uls/:id`
- `DELETE /api/uls/:id`

## Notes:
- Using Express Router for `/api/url`
- Injecting Pool into router at runtime so `new Pool()` is only called once
- Avoided comments for "obvious" code. That can be a matter of opinion tho