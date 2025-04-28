```mermaid
sequenceDiagram 
    participant browser
    participant server

    browser ->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note_spa
    activate server
    note over server: The server receives the content in JSON and executes<br/>code from spa.js preventing the default REDIRECT <br/> but updates the data.json with the new message and renders it
    server -->> browser: [..., {"content": "wait"}]
