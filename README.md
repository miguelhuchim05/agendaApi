# Agenda Api
## Getting started
To get the Node server running locally:
* Clone this repo
* ```npm install``` to install all required dependencies
* Create a MySql database for this Api
* Edit your ```.env``` to change the status of the ```DB_SYNC``` variable to ```true```
* ```npm run dev``` to start the local server. Tables will be created.

To insert a default user in the database run the following sql statements.
```sql
INSERT INTO `user` (`name`, `email`, `password`, `created_at`, `updated_at`) VALUES ('Demo Api', 'demoapi@gmail.com', 'toor', '2021-04-24 00:34:19', '2021-04-24 00:34:19');
INSERT INTO `agenda`.`agenda` (`lock`, `created_at`, `updated_at`, `user_id`) VALUES ('0', '2021-04-24 00:34:19', '2021-04-24 00:34:19', '1');
```

:rocket: Alternately, to quickly try out this API is online at this [IP address](http://104.236.11.147)

:metal: [Postman collection](https://drive.google.com/file/d/1KLjWD5eGszH25s09SsSW83UtDoVrv7iM/view?usp=sharing)

user: demoapi@gmail.com

password: toor