# bitcoin-app

[Live demo](https://ksenkso.github.io/bitcoin-app/)

## Project setup

```
npm install
```

### Compiles and hot-reloads for development

```
npm run serve
```

### Compiles and minifies for production

```
npm run build
```

### Run your unit tests

```
npm run test:unit
```

### Run your end-to-end tests

```
npm run test:e2e
```

### Lints and fixes files

```
npm run lint
```

## Заметки о реализации

- Есть индикатор загрузки и сообщение об отсутствии подключения;
- В таблице отображаются ссылки на адреса кошельков;

Возможны некоторые улучшения производительности и UX:

- При долгой работе приложения возможно зависание вкладки браузера из-за большого количества элементов. Это можно
  исправить при помощи виртуализации таблицы. Например, можно
  использовать [vue-virtual-scroller](https://github.com/Akryum/vue-virtual-scroller/tree/next/packages/vue-virtual-scroller).
- Помимо этого, можно показывать в таблицы только элементы в определённом временном промежутке, например. за последние
  10 минут.
- В некоторых транзакциях бывает очень много входов и выходов. Можно убирать их под спойлер внутри ячейки, если их
  количество больше некоторого N.
