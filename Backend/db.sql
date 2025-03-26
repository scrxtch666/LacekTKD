//  https://dbdiagram.io/d

// Entity: závodníci, turnaje, zkoušky, aktuality, o nas, kontakt

// Use DBML to define your database structure
// Docs: https://dbml.dbdiagram.io/docs

Table follows {
  following_user_id integer
  followed_user_id integer
  created_at timestamp 
}

Table fighters {
  id integer [primary key]
  name varchar
  surname varchar
  birth timestamp
  belt_id integer
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
}


Table users {
  id integer [primary key]
  login varchar
  password varchar
  role varchar
}

Ref user_posts: posts.user_id > fighters.id // many-to-one

Ref: fighters.id < follows.following_user_id

Ref: fighters.id < follows.followed_user_id

Ref: fighters.role < roles.role

Ref: belts.id < fighters.belt_id

Ref: category.id < fighters.category_id

