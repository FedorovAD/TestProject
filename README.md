## Описание приложения
Приложение представляет из себя Dashboard с двумя таблицами. Первая таблица - это список витрин, в которых хранится информация о названии витрины, дате ее обновления и количестве максимальных уникальных предметов в витрине. Вторая таблица хранит информацию о товарах содержащихся в витринах, а точнее: 
  - id витрины товара
  - id витрины, к которой привязан товар
  - дата создания
  - дата обновления
  - стоимость товара
  - количество

Обе таблицы реализованы с помощью Ag Grid. В таблице showcases была реализована частичная подгрузка с сервера(limit и offset), а также infinite loading (AgGrid Infinite Row Model), как и требовалось в задании. Над таблицей products добавлены 3 кнопки для добавления, обновления и удаления товара, с учетом наличия места в витрине(showcase).

При оформлении dashboard был использован шаблон [https://www.creative-tim.com/templates/react](https://www.creative-tim.com/product/material-dashboard-react).
## Установка и запуск
Для установки проекта потребуется скачать его с данного репозитория и распаковать в нужную папку на системе linux.
Вам потребуется установленный postgreSQL. 
Команды, которые требуется ввести в консоль для установки приложения:
  -  make start_postgres - для запуска PostgreSQL
  -  make create_db - для создания базы данных или сброса уже существующей
  -  make run_sql_script - для создания таблиц в базе данных и добавления в них начальных данных
  -  make deps - для установки всех зависимостей на серверной и клиентской части приложения
  -  make client_start - для запуска клентской части
  -  make server_start - для запуска сервера
## Дополнительно
Команды для запуска серверной и клиентской части лучше вводить в двух отдельных консолях.

Для обращения к базе ипользуется пользователь postgres с паролем postgres, это указано в файле db.js на серверной части приложения. 

