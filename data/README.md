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
      {"label": "All links in footer", "url": "#"}
    ]
  }
}
```

- __For logged in user__

```json
{
  "title": "Page title",
  "user": {
    "isLogged": true,
    "rewards": {
      "to_pay": "72,50 Kč"
    }
  },
  "footer": {
    "links": [
      {"label": "All links in footer", "url": "#"}
    ]
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



## User page

### Mandatory data

```json
{
  "user": {
    "isLogged": true,
    "name": "User full name",
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

 

