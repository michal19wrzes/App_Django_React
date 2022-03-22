# App_Django_React
React, JS, Python, Django, REST, Djoser, mui  -->  (auth_system)

Running:
 * need google smtp auth in /authSystem/backend/auth_system/settings.py.
 * need node.js module.
 
IN /authSystem/frontend/ dir:
  - npm install
  - npm run build
  - copy build dir from /frontend to /authSystem/backend dir.

IN /authSystem/backend/ dir:
  - py manage.py makemigrations accounts 
  - py manage.py migrate
  - py manage.py runserver


