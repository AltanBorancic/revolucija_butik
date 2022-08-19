fx_version "cerulean"
game "gta5"

client_scripts{
    "config.lua",
    "client.lua",
}
server_scripts {
    "config.lua",
    "server.lua",
    '@oxmysql/lib/MySQL.lua',
}

author 'Seeki, Sefik, thesevenq'

files {
    "web/index.html",
    "web/script.js",
    "web/style.css",
    "web/config.js"
}

ui_page "web/index.html"