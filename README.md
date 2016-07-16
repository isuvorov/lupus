Inspirated by:
* https://github.com/developit/express-es6-rest-api/


http://expressjs.com/en/advanced/best-practice-security.html
http://expressjs.com/en/advanced/best-practice-performance.html
https://strongloop.com/strongblog/compare-node-js-logging-winston-bunyan/?_ga=1.261653007.308269509.1461336254



# Auth
`Authorization Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1NzU1NjU0YWYxZjJmODA1N2JhM2U3NWUiLCJ1c2VybmFtZSI6ImFkbWluIiwibmFtZSI6IkFkbWluIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNDY1MjU2Mzc2fQ._eEmsRtL_FuFOwVAtDf5GYio2YSvJwFB0lkSEMxkkbQ`
or
`?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1NzU1NjU0YWYxZjJmODA1N2JhM2U3NWUiLCJ1c2VybmFtZSI6ImFkbWluIiwibmFtZSI6IkFkbWluIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNDY1MjU2Mzc2fQ._eEmsRtL_FuFOwVAtDf5GYio2YSvJwFB0lkSEMxkkbQ`


"fatal" (60): The service/app is going to stop or become unusable now. An operator should definitely look into this soon.
"error" (50): Fatal for a particular request, but the service/app continues servicing other requests. An operator should look at this soon(ish).
"warn" (40): A note on something that should probably be looked at by an operator eventually.
"info" (30): Detail on regular operation.
"debug" (20): Anything else, i.e. too verbose to be included in "info" level.
"trace" (10): Logging from external libraries used by your app or very detailed application logging.


Что из себя представляет модуль
Что такое мидлвара?
Что такое контроллер?
Универсальный роут?  Resourse ENDPOINT
Возможность писать красивые АПИ ?


Controller is middleware (req) => (new Promise())
сам контроллер не должен принимать решение об отдаче данных клиенту
Router is Express router
