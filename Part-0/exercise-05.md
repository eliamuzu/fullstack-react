```mermaid
sequenceDiagram 
    participant browser
    participant server

    browser ->>server: POST https://studies.cs.helsinki.fi/exampleapp/spa
    activate server
    server -->> browser: The HTML document
    deactivate server

    browser ->> server: GET https://studies.cs.helsinki.fi/exampleapp/main.css
    activate server
    server -->> browser: The CSS file
    deactivate server

    browser ->> server: GET https://studies.cs.helsinki.fi/exampleapp/spa.js
    activate server
    server -->> browser: The JavaScript file
    deactivate server

    note over browser, server: The browser then executes the JavaScript code which fetches <br/> and renders the  JSON file
    browser ->> server: GET https://studies.cs.helsinki.fi/exampleapp/data.json
    activate server
    server -->> browser: [{"content": "HTML is easy", "date": "2025-04-2"}, ...]
    deactivate server



