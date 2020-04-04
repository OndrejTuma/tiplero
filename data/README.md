# Specifics data structure for pages



## Every page

### Mandatory data:

- __For anonymous user__

```json
{
  "title": "Page title",
  "user": {
    "isLogged": false
  },
  "footer": {
    "links": [
      [
        {"label": "All links for first column", "url": "#"}
      ],
      [
        {"label": "All links for second column", "url": "#"}
      ],
      [
        {"label": "All links for third column", "url": "#"}
      ]
    ],
    "infoText": "<p>Napište nám na <a href=\"mailto:moje@tiplero.cz\">moje@tiplero.cz</a></p><p>Copyright &copy; 2020 Tiplero. Všechna práva vyhrazena.</p>"
  }
}
```

- __For logged in user__

```json
{
  "title": "Page title",
  "user": {
    "isLogged": true,
    "rewardsLink": "link to user page",
    "rewards": {
      "to_pay": "72,50 Kč"
    }
  },
  "footer": {
    "links": [
      [
        {"label": "All links for first column", "url": "#"}
      ],
      [
        {"label": "All links for second column", "url": "#"}
      ],
      [
        {"label": "All links for third column", "url": "#"}
      ]
    ],
    "infoText": "<p>Napište nám na <a href=\"mailto:moje@tiplero.cz\">moje@tiplero.cz</a></p><p>Copyright &copy; 2020 Tiplero. Všechna práva vyhrazena.</p>"
  },
  "menu": {
    "user": [
      {"url": "#", "icon": "wallet", "label": "All user menu items"}
    ],
    "secondary": [
      {"url": "#", "icon": "basket", "label": "Item with submenu",
        "submenu": [
          {"url": "#", "label": "All submenu links"}
        ]
      },
      {"url": "#", "icon": "note", "label": "Regular menu item"}
    ]
  }
}
```

Structure of every menu complies `/templates/components/item.twig` component. 
There is optional `icon` parameter which has to resemble name of of `/build/svg/{{ icon }}.svg`



## Anonym homepage

### Mandatory data

```json
{
  "shops": [
    {"type": "logo", "img": "./images/dummy/logo_zezula.png", "alt": "Zezula", "url": "#"},
    {"type": "info", "who": "User name", "where": "Shop name", "amount": "12 Kč"}
  ],
  "stories": [
    {"arrow": "bottom", "name": "User name", "text": "Some <strong>strong</strong> claim"}
  ]
}
```

All texts can contain valid HTML.

`shops[].type` can be either `logo` with mandatory `img`, `alt` and `url` parameters 
or `info` with mandatory `who`, `where` and `amount` parameters

`stories[].arrow` can be `top`, `right`, `bottom` and `left`



## Logged in homepage

### Mandatory data

```json
{
  "slides": [
    {"img": "https://picsum.photos/1200/300", "url": "#"}
  ],
  "discounts": {
    "top": {
      "items": [
        {"img": "https://picsum.photos/300/200", "logo": "./images/dummy/logo_footshop.png", "amount": 66, "title": "Sleva až 90 % na pánskou obuv na Footshop.cz", "bonus": "1,5 % zpět z nákupu", "until": "do 19. 1. 2020", "url": "#"}
      ],
      "url": "#"
    },
    "coupons": {
      "items": [
        {"logo": "./images/dummy/logo_footshop.png", "amount": 66, "title": "Sleva až 90 % na pánskou obuv na Footshop.cz", "bonus": "1,5 % zpět z nákupu", "until": "do 19. 1. 2020", "url": "#"}
      ],
      "url": "#"
    },
    "highest_discount": {
      "items": [
        {"img": "https://picsum.photos/300/300", "logo": "./images/dummy/logo_footshop.png", "amount": 66, "title": "Sleva až 90 % na pánskou obuv na Footshop.cz", "bonus": "1,5 % zpět z nákupu", "until": "do 19. 1. 2020", "url": "#"}
      ],
      "url": "#"
    },
    "free_delivery": {
      "items": [
        {"logo": "./images/dummy/logo_footshop.png", "amount": 66, "title": "Sleva až 90 % na pánskou obuv na Footshop.cz", "bonus": "1,5 % zpět z nákupu", "until": "do 19. 1. 2020", "url": "#"}
      ],
      "url": "#"
    }
  }
}
```

Discount item `discounts[name].items[]` have optional `img` parameter 

`discounts[name].url` is for button that redirects to more discounts

Old structure for slides data (in case you decide to use it):
```json
{"img": "https://picsum.photos/1200/300", "logo": "./images/dummy/logo_booking.png", "title": "Víkendové lyžování. Až 15 % zpět ", "text": "Exkluzivně, jen přes Tiplero.com", "url": "#"}
```



## Shop detail page

## Mandatory data

```json
{
  "breadcrumbs": [
    {"url": "#", "label": "Breadcrumb items"}
  ],
  "shop": {
    "id": "1234",
    "favorite": false,
    "logo": "./images/dummy/logo_aliexpress.png",
    "title": "AliExpress",
    "url": "#",
    "range": "0-10",
    "rating": {
      "amount": 4.1,
      "count": 781
    },
    "links": [
      {"label": "Slevy", "url": "#"},
      {"label": "O obchodu", "url": "#"},
      {"label": "Články", "url": "#"}
    ]
  },
  "discounts": [
    {"img": "https://picsum.photos/300/200", "amount": 66, "title": "Sleva až 90 % na pánskou obuv na Footshop.cz", "bonus": "1,5 % zpět z nákupu", "until": "do 19. 1. 2020", "url": "#"},
    {"amount": 66, "title": "Sleva až 90 % na pánskou obuv na Footshop.cz", "bonus": "1,5 % zpět z nákupu", "until": "do 19. 1. 2020", "url": "#"}
  ],
  "cashbacks": [
    {"label": "All cashback offers", "amount": 10}
  ],
  "related_shops": [
    {"logo": "./images/dummy/logo_expert.png", "title": "All related shops", "url": "shop_detail.html", "discount": 1.5}
  ],
  "shop_intro": [
    {"title": "Heading", "text": "Some <strong>interesting</strong> text"}
  ]
}
```

`shop.id` will be send to add-to-favorite endpoint 
`dicounts[]` item has the same structure as in Logged in homepage `discounts[name].items[]` 
because it uses the same component `/templates/components/discount.twig`.
The only difference is that here, it does not have defined `logo` parameter

`shop_intro` has information blocks about current shop. `shop_intro[].text` can also contain valid HTML for additional formatting



## User page

### Mandatory data

```json
{
  "user": {
    "isLogged": true,
    "name": "User full name",
    "rewardsLink": "link to user page",
    "rewards": {
      "to_pay": "72,50 Kč",
      "registered": "12,50 Kč",
      "bonus": "0,50 Kč",
      "overview": {
        "all": [
          {"success": false, "tooltip": "Tooltip message", "logo": "./images/dummy/logo_notino.png", "reward": "0 Kč", "info": "Odměna za nákup", "registered": "27. 1. 2020", "confirmed": "27. 1. 2020"},
          {"success": true, "logo": "./images/dummy/logo_aliexpress.png", "reward": "3740,61 Kč", "info": "Odměna za nákup", "registered": "27. 1. 2020", "confirmed": "27. 1. 2020"}
        ],
        "waiting": [
          {"success": true, "logo": "./images/dummy/logo_aliexpress.png", "reward": "3740,61 Kč", "info": "Odměna za nákup", "registered": "27. 1. 2020", "confirmed": "27. 1. 2020"}          
        ],
        "confirmed": []
      }
    },
    "menu": [
      {"active": true, "url": "#", "icon": "wallet", "label": "Active menu item"},
      {"url": "#", "icon": "card", "label": "Another menu item"}
    ]
  }
}
```

### Optional data

```json
{
  "user": {
    "image": "https://picsum.photos/100/100",
    "rewards": {
      "total_gain": "3740,61 Kč"
    },
    "profile_completion": [
      {"label": "Step active", "done": true},
      {"label": "Step inactive", "done": false},
      {"label": "It can be a link too", "url": "#", "done": false}
    ]
  }
}
```

If you set `user.image` the placeholder will be replaced by it.

If you set `user.rewards.total_gain` it will show right under user name.

If you set `user.profile_completion` it will show information under profile menu about profile completion. 
Progress circle will be calculated automatically from `done` attributes.

 

