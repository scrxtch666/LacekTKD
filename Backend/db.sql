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
  photo varchar
  best bool
  legend bool
  active bool
  category_id integer
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
  role varchar
  fighter_id integer
  role_id integer
}

Table role{
  id integer [primary key]
  role_name varchar
  // fighter, trainer, trainer class II., administrator
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

Table trainings{
  id integer [primary key]
  advanced_start timestamp
  advanced_end timestamp
  beginner_start timestamp
  beginner_end timestamp
  day_start date
  day_end date
}
// ---------------- 

Ref fighter_belt: belts.id > fighters.belts_id // many-to-one

Ref: category.id < fighters.category_id

Ref users_posts: users.id > posts.user_id // many-to-one

Ref fighters_achivements: fighters.id > achievement.fighter_id // many-to-one

Ref user_event: users.id > event.user_id // many-to-one

Ref news_newsletter: news.event_id > event.id // many-to-one

Ref news_newsletter: news.tournament_id > tournament.id   // many-to-one

Ref users_role: role.id > users.role_id   // many-to-one


Ref: news.id < newsletter.id

Ref: fighters.id < users.fighter_id 