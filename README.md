# **Restream test**
### Установка

Для запуска проекта вам потребуется [Node.js](https://nodejs.org/en/).
#### Для установки необходимо запустить

```sh
$ npm install
```
#### Или если вы используете [yarn](https://yarnpkg.com/lang/en/)
```sh
$ yarn install
```

#### Для запуска

```sh
$ gulp
```
#### Для подготовки к интеграции выполнить


```sh
$ gulp prod
```
###### Файлы будут находиться в каталоге /prod.
# 
##### В проекте используются:
* [Pug](https://pugjs.org/api/getting-started.html) - Шаблонизатор
* [Sass](https://sass-lang.com/) - Препроцессор CSS
* Постпроцессоры СSS:
    * autoprefixer
    * css-mqpacker
    * cssnano