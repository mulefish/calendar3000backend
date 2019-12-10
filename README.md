# postgres_node_nosql_notes


# Running step1: 
node index.js  
( to start the server )

# Running step2: 
Use the Postman scripts ( PostGres.postman_collection.json ) 



# Steps: 
psql -d postgres -U me 
CREATE DATABASE calendar3000;
\c calendar3000; 

CREATE TABLE mytmp (
id SERIAL PRIMARY KEY,
customer_id INTEGER,
ship_to VARCHAR (22)
);
        


CREATE TABLE holidays (
id SERIAL PRIMARY KEY,
year INTEGER,
data JSONB
);

REMEBER TO escape the ' marks by doubling them up

INSERT INTO holidays(year, data) VALUES(2019, '[
["2019-01-01","Tuesday","New Year''s Day","Federal Holiday",""],
...
["2019-12-30","Monday","Last Day of Chanukah","Jewish holiday",""],
["2019-12-31","Tuesday","New Year''s Eve","Observance",""],
["2019-12-31","Tuesday","New Year''s Eve","State holiday","LA, MI, WI"]
]');



INSERT INTO holidays(year, data) VALUES(2019, '[
["2019-01-01","Tuesday","New Year''s Day","Federal Holiday",""]
]');


`

["2019-01-06","Sunday","Epiphany","Christian",""]




INSERT INTO holidays(year, data) VALUES(2019, '[
[1,
"shoes",
"blue_shoes",
12.34,
"dollars",
5],
[1,
"shoes",
"blue_shoes",
12.34,
"dollars",
5],
]');


        