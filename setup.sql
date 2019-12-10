
# Steps: 
psql -d postgres -U me 
CREATE DATABASE calendar3000;
\c calendar3000; 


CREATE TABLE people (
id SERIAL PRIMARY KEY,
name VARCHAR(40)
);     
insert into people (name) values ('finch'), ('wren'); 


CREATE TABLE events (
id SERIAL,
fk_id integer REFERENCES people(id) ON DELETE CASCADE,
data JSON,
CONSTRAINT color CHECK (length(data->>'color') > 0 AND (data->>'color') IS NOT NULL ),
CONSTRAINT date CHECK (length(data->>'date') > 0 AND (data->>'date') IS NOT NULL ),
CONSTRAINT note CHECK (length(data->>'note') IS NOT NULL ),
PRIMARY KEY (id,fk_id)
);

insert into events (fk_id, data ) VALUES (1, '{
"date": "2019-11-13",
"color": "#ff0000", 
"note":"Example entry. This is a note. It could be empty. That would be OK. Remember to escape apostrophes!"
}')


        
CREATE TABLE holidays (
id SERIAL PRIMARY KEY,
year INTEGER,
data JSONB
);


# REMEBER TO escape the ' marks by doubling them up

INSERT INTO holidays(year, data) VALUES(2019, '[
["2019-01-01","New Year''s Day","Federal Holiday"],
["2019-01-19","Robert E. Lee''s Birthday","State holiday"],
["2019-01-21","Martin Luther King Jr. Day","Federal Holiday"],
["2019-02-12","Lincoln''s Birthday","Local observance"],
["2019-02-18","Presidents'' Day","Federal Holiday"],
["2019-03-05","Shrove Tuesday/Mardi Gras","State holiday"],
["2019-03-10","Daylight Saving Time starts","Clock change/Daylight Saving Time"],
["2019-04-02","Pascua Florida Day","Local observance"],
["2019-05-27","Memorial Day","Federal Holiday"],
["2019-06-03","Jefferson Davis'' Birthday","Local observance"],
["2019-07-04","Independence Day","Federal Holiday"],
["2019-09-02","Labor Day","Federal Holiday"],
["2019-10-14","Columbus Day","Federal Holiday"],
["2019-11-03","Daylight Saving Time ends","Clock change/Daylight Saving Time"],
["2019-11-11","Veterans Day","Federal Holiday"],
["2019-11-28","Thanksgiving Day","Federal Holiday"],
["2019-12-25","Christmas Day","Federal Holiday"]
]');





INSERT INTO holidays(year, data) VALUES(2020, '[
["2020-01-01","New Year''s Day","Federal Holiday"],
["2020-01-19","Robert E. Lee''s Birthday","State holiday"],
["2020-01-20","Martin Luther King Jr. Day","Federal Holiday"],
["2020-02-12","Lincoln''s Birthday","Local observance"],
["2020-02-17","Presidents'' Day","Federal Holiday"],
["2020-02-25","Shrove Tuesday/Mardi Gras","State holiday"],
["2020-03-08","Daylight Saving Time starts","Clock change/Daylight Saving Time"],
["2020-04-02","Pascua Florida Day","Local observance"],
["2020-05-25","Memorial Day","Federal Holiday"],
["2020-06-03","Jefferson Davis'' Birthday","Local observance"],
["2020-07-03","Independence Day observed","Federal Holiday"],
["2020-07-04","Independence Day","Federal Holiday"],
["2020-09-07","Labor Day","Federal Holiday"],
["2020-10-12","Columbus Day","Local observance"],
["2020-11-01","Daylight Saving Time ends","Clock change/Daylight Saving Time"],
["2020-11-11","Veterans Day","Federal Holiday"],
["2020-11-26","Thanksgiving Day","Federal Holiday"],
["2020-12-25","Christmas Day","Federal Holiday"]
]');


INSERT INTO holidays(year, data) VALUES(2021, '[
["2021-01-01","New Year''s Day","Federal Holiday"],
["2021-01-18","Martin Luther King Jr. Day","Federal Holiday"],
["2021-01-19","Robert E. Lee''s Birthday","State holiday"],
["2021-02-12","Lincoln''s Birthday","Local observance"],
["2021-02-15","Presidents'' Day","Federal Holiday"],
["2021-02-16","Shrove Tuesday/Mardi Gras","State holiday"],
["2021-03-14","Daylight Saving Time starts","Clock change/Daylight Saving Time"],
["2021-04-02","Pascua Florida Day","Local observance"],
["2021-04-26","Confederate Heroes'' Day","Local observance"],
["2021-05-01","Lei Day","Local observance"],
["2021-05-31","Memorial Day","Federal Holiday"],
["2021-06-03","Jefferson Davis'' Birthday","Local observance"],
["2021-07-04","Independence Day","Federal Holiday"],
["2021-07-05","Independence Day observed","Federal Holiday"],
["2021-09-06","Labor Day","Federal Holiday"],
["2021-11-07","Daylight Saving Time ends","Clock change/Daylight Saving Time"],
["2021-11-11","Veterans Day","Federal Holiday"],
["2021-11-25","Thanksgiving Day","Federal Holiday"],
["2021-12-24","Christmas Day observed","Federal Holiday"],
["2021-12-25","Christmas Day","Federal Holiday"],
["2021-12-31","New Year''s Day observed","Federal Holiday"]
]');


