# Lab_1_Team_Development

## Отчет о создании веб-сервиса для управления пользователями с использованием Flask и SQLite

### Введение
В этом отчете я расскажу о процессе создания веб-сервиса для управления пользователями с использованием Flask и SQLite. Этот проект был выполнен в рамках учебного задания и позволил мне глубже понять основы веб-разработки, работу с базами данных и использование фреймворка Flask.

### Шаг 1: Установка необходимых инструментов
Первым шагом было установить Python и необходимые библиотеки. Я создала виртуальное окружение для изоляции зависимостей проекта и установил Flask и SQLite.

### Шаг 2: Создание структуры проекта
Я создала структуру каталогов для проекта, чтобы организовать файлы. Это включало создание папки для шаблонов и основного файла приложения.

### Шаг 3: Настройка базы данных
В файле init_db.py я настроила соединение с базой данных SQLite и создала таблицу для хранения информации о пользователях. Это было важно, так как без базы данных невозможно хранить и извлекать данные.

### Шаг 4: Создание основного приложения Flask
В файле app.py я реализовала основную логику приложения. Я настроила маршруты для отображения списка пользователей и добавления новых.
Здесь я создала два маршрута: один для отображения списка пользователей и другой для добавления нового пользователя. Использование функции get_db_connection() позволяет легко управлять соединениями с базой данных.

### Шаг 5: Запуск приложения
После завершения всех этапов я запустил приложение с помощью команды: python app.py

Создание веб-сервиса для управления пользователями с использованием Flask и SQLite было увлекательным и познавательным опытом. Я научилась работать с базами данных, создавать маршруты и шаблоны, а также взаимодействовать с пользователями через веб-интерфейс. Этот проект не только улучшил мои навыки программирования, но и дал мне представление о том, как работают веб-приложения в реальном мире.
