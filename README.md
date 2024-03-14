![productivitizer logo](img/productivitizer.png)

# Productivitizer ⚡

Productivitizer is a web application developed using Python Flask, JavaScript, SQLite, HTML, and CSS. It includes authentication functionality and three main features: Pomodoro timer, Kanban task manager, and Expense tracker.

## Table of Contents

- [Productivitizer ⚡](#productivitizer-)
  - [Table of Contents](#table-of-contents)
  - [Features](#features)
  - [Technologies Used](#technologies-used)
  - [Deployment](#deployment)
  - [Getting Started](#getting-started)
  - [Usage](#usage)
  - [Contributing](#contributing)
  - [License](#license)

## Features

1. **Pomodoro Timer:** Allows users to set work intervals and break intervals using the Pomodoro Technique.
2. **Kanban Task Manager:** Enables users to organize tasks using a Kanban board with columns like To Do, Doing, and Done.
3. **Expense Tracker:** Helps users track their expenses by adding, and viewing expenses and showing chart using `Chart.JS` api.

## Technologies Used

- **Backend**
<br>
![Python](https://img.shields.io/badge/python-3670A0?style=for-the-badge&logo=python&logoColor=ffdd54)
![Flask](https://img.shields.io/badge/flask-%23000.svg?style=for-the-badge&logo=flask&logoColor=white)
![SQLite](https://img.shields.io/badge/sqlite-%2307405e.svg?style=for-the-badge&logo=sqlite&logoColor=white)

- **Frontend**
<br>
![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
![Bootstrap](https://img.shields.io/badge/bootstrap-%238511FA.svg?style=for-the-badge&logo=bootstrap&logoColor=white)
![Chart.js](https://img.shields.io/badge/chart.js-F5788D.svg?style=for-the-badge&logo=chart.js&logoColor=white)
![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white)

- **Deployment**
<br>
![Gunicorn](https://img.shields.io/badge/gunicorn-%298729.svg?style=for-the-badge&logo=gunicorn&logoColor=white)
![Nginx](https://img.shields.io/badge/nginx-%23009639.svg?style=for-the-badge&logo=nginx&logoColor=white)
![Linux](https://img.shields.io/badge/Linux-FCC624?style=for-the-badge&logo=linux&logoColor=black)

## Deployment

The application is deployed using Gunicorn and Nginx on a virtual private server using Linux Ubuntu 22.04.4

## Getting Started

1. Clone the repository: `git clone https://github.com/slackerkids/productivitizer.git`
2. Install dependencies: `pip install -r requirements.txt`
3. Set up the database: `flask db init`
4. If you want to deploy it in production server you need to create `config.py` on instance folder. More: `https://flask.palletsprojects.com/en/3.0.x/tutorial/deploy/`
5. Run the application locally: `flask --app productivitizer run`

## Usage

- Register a new account or log in if you already have one.
- Explore the Pomodoro timer, Kanban task manager, and Expense tracker features.

## Contributing

 You're welcome for contributions to improve Productivitizer. Fork the repository and submit pull requests with your changes or enhancements.

## License

This project is licensed under the [MIT License](LICENSE).
