# Technical Challange

## Description:

URL Structure:

{URL}/backend/api/

`backend/api/admin/`

`backend/api/users/`

`backend/api/questions/`

`backend/api/challenges/`

`backend/api/tips/`

`backend/api/programs/`

`backend/api/auth/token/`

`backend/api/auth/token/refresh/`

`backend/api/auth/token/verify/`

`backend/api/docs/`

`backend/api/tests/`


## Drop migrations and db:

`docker exec -ti final-project_backend_1 bash`

`ls */migrations/00*`

`find . -path "*/migrations/*.py" -not -name "__init__.py" -delete`
`find . -path "*/migrations/*.pyc"  -delete` 

`python manage.py makemigrations`

`python manage.py migrate`

If you need to delete the db:


`docker exec -ti final-project_db_1 bash`

`su postgres`

`psql`

`DROP SCHEMA public CASCADE;`

`CREATE SCHEMA public;`



