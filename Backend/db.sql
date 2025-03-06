//  https://dbdiagram.io/d

// Use DBML to define your database structure
// Docs: https://dbml.dbdiagram.io/docs

Table follows {
  following_user_id integer
  followed_user_id integer
  created_at timestamp 
}

Table fighters {
  id integer [primary key]
  first_name varchar
  second_name varchar
  birth timestamp
  belt text
  role integer
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

Ref user_posts: posts.user_id > fighters.id // many-to-one

Ref: fighters.id < follows.following_user_id

Ref: fighters.id < follows.followed_user_id

Ref: fighters.role < roles.role

