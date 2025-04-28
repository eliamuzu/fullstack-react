```mermaid
sequenceDiagram 
    participant browser
    participant server

    browser ->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note
    activate server
    server -->> browser: REDIRECT /exampleapp/notes
    note over browser,server: The server asks the browser to make a GET request <br/> to the address provided in the location fied of the response
    deactivate server

    browser ->> server: GET https://studies.cs.helsinki.fi/exampleapp/notes
    activate server
    server -->> browser: HTML Document
    deactivate server

    browser ->> server: GET https://studies.cs.helsinki.fi/exampleapp/main.css
    activate server
    server -->> browser: The CSS file
    deactivate server

    browser ->> server: GET https://studies.cs.helsinki.fi/exampleapp/main.js
    activate server
    server -->> browser: The JavaScript file
    deactivate server

    note over browser, server: The browser then executes the JavaScript code which fetches <br/> the updated JSON file
    browser ->> server: GET https://studies.cs.helsinki.fi/exampleapp/data.json
    activate server
    server -->> browser: [{"content": "HTML is easy"}, ..., {"content": "newNote"}]
    deactivate server


