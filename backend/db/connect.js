const { Client } = require('pg'); 

const client = new Client({ 
    user: 'postgres', 
    host: 'localhost', 
    database: 'dark_vapor', 
    password: 'admin', 
    port: 5432, 
    }); 
    
client.connect(); 