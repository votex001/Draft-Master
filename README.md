# Draft-Master

I worked at a factory where sheet metal counting and pricing were done on slips of paper. I decided to write an application that would store customers, their prices, and the ability to create new counts.

---

## Routers

-'/' - home page
-'/drafts' - here u can add new order and count price
-'/settings' - this tab of settings is for Customer list, here u can add new and delete old customer
-'/settings/customer/:id' - here u can change customer and personal prices
-'/settings/metals' - here u can add new metals
-'/settings/metals/types' - here u can change global types of metals and price of them (its more about thickness)

---

[Here u can see demo](draft-master.netlify.app)

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Compile and Minify for Production

```sh
npm run build
```
