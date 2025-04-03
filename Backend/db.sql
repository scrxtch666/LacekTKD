//  https://dbdiagram.io/d

// Entity: závodníci, turnaje, zkoušky, aktuality, o nas, kontakt

// Use DBML to define your database structure
// Docs: https://dbml.dbdiagram.io/docs

Table fighters {
  id integer [primary key]
  name varchar
  surname varchar
  birth timestamp
  belts_id integer [not null]
  role integer
  photo varchar
  best bool
  legend bool
  active bool
  category_id integer
  
}

Table roles{
  id integer [primary key]
  role text
}

Table posts {
  id integer [primary key]
  title varchar
  body text [note: 'Content of the post']
  user_id integer [not null]
  status varchar
  created_at timestamp
}

Table event {
  id integer [primary key]
  title varchar
  body text [note: 'Content of the post']
  user_id integer [not null]
  status varchar
  created_at timestamp
  date timestamp
  photo varchar
}

Table contact {
  id integer [primary key]
  id_first_name varchar
  id_last_name varchar 
  licence varchar
  
}

Table category {
  id integer [primary key]
  name varchar
}

Table belts {
  id integer [primary key]
  name varchar
  cup varchar
  price varchar
  img_path varchar
  info varchar
  video_path varchar
}

Table tournament {
  id varchar [primary key]
  name varchar
  location varchar
  price integer
  type varchar
  start_date date
  end_date date
  info varchar
  img_path varchar
  users_id int
  creator_id int
}

Table users {
  id integer [primary key]
  login varchar
  password varchar
  emial varchar
  phone number
  role_id int
}

Table achievement{
  id integer [primary key]
  place varchar
  achivement_name varchar
  year integer
  fighter_id integer
}

// ---------------- 

Table sponsors{
  id integer [primary key]
  sponsor_name varchar
  url varchar
  img_path varchar
}

Table banner{
  id integer [primary key]
  banner_name varchar
  img_path varchar
}

Table newsletter{
  id integer [primary key]
  news_id integer
  email varchar
}

Table news{
  id integer [primary key]
  tournament_id int
  event_id int
}

// ---------------- 

Ref fighter_belt: belts.id > fighters.belts_id // many-to-one

Ref: fighters.role < roles.role

Ref: category.id < fighters.category_id

Ref: roles.id < users.role_id

Ref users_posts: users.id > posts.user_id // many-to-one

Ref fighters_achivements: fighters.id > achievement.fighter_id // many-to-one

Ref user_event: users.id > event.user_id // many-to-one

Ref news_newsletter: news.event_id > event.id // many-to-one

Ref news_newsletter: news.tournament_id > tournament.id   // many-to-one

Ref: news.id < newsletter.id


