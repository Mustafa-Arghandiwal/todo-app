# To-Do App (PHP & MySQL)

A simple to-do list web app built with **PHP, MySQL, vanilla JavaScript, and Tailwind CSS**.

## How to Set Up

### 1. Install XAMPP

### 2. Clone the Repository
Navigate to your `xampp/htdocs` folder and run: `git clone https://github.com/Mustafa-Arghandiwal/todo-app.git`

### 3. Set Up the Database
- Start Apache and MySQL in XAMPP
- Open phpMyAdmin at <https://localhost/phpmyadmin>
- Create a new database, e.g. todo_list_db
- Import the `todo_list_db.sql` file found in the cloned repository

### 4. Configure Database Connection
- Create a config.php file within your directory with your database details, e.g.
```
<?php
define('DB_HOST', 'localhost');
define('DB_USER', 'root');
define('DB_PASS', '');
define('DB_NAME', 'todo_list_db');
```

### 5. Run the app
- Ensure Apache and MySQL are running in XAMPP
- Open your browser and go to <http://localhost/todo-app>

### If you want to update the front-end:
- Navigate to your project directory and run `npm install` to install Tailwind CSS (assuming you have NodeJS installed)
- Run `npm run build-css` to build the CSS
