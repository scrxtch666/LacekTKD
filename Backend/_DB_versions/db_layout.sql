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
  img_path varchar
  best bool
  legend bool
  active bool
  category_id integer
  actual_weight_category int
}


Table event { // aktualita
  id integer [primary key]
  title varchar
  body text [note: 'Content of the post']
  user_id integer [not null]
  status varchar
  created_at timestamp
  date timestamp
  photo varchar
}

Table tournament_registration{
  id integer [primary key]
  fighter_id int
  tournament_id int
  note varchar
  status varchar
  place integer
}

Table category {
  id integer [primary key]
  name varchar
  min int
  max int
  // youth, cadet, junior, senior, ultra
 // ?enum
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
  type_id varchar
  start_date date
  end_date date
  info varchar
  img_path varchar
  users_id int // autor
  registrable_date date
}

Table users {
  id integer [primary key]
  login varchar
  password varchar
  emial varchar
  phone number
  fighter_id integer
  role_id integer
}

Table role{
  id integer [primary key]
  role_name varchar
  // fighter, trainer, trainer class II., administrator
}



Table type{
  id integer [primary key]
  name varchar
  // soustředění, zkouška na pásky, zápas...
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


Table subscriber_email{
  id integer [primary key]
  email varchar
  active bool
  news_id int
  token varchar
}

Table trainings{
  id integer [primary key]
  day_start date
  day_end date
  type varchar
  time_start time
  time_end time
}
// ---------------- 

Ref fighter_belt: belts.id > fighters.belts_id // many-to-one
// Jeden závodník může mít jeden pásek, jeden pásek může mít více závodníků -> 1:N
Ref: category.id < fighters.category_id
// Jeden závodník může být v jedné kategorii a v jedné kategorii může být více závodníků -> 1:N
// Více závodníků může mít více úspěschů -> M:N 
Ref user_event: users.id > event.user_id 
// Jeden user má více eventů a jeden event má více userů -> 1:N
// ???
// ???
Ref users_role: role.id > users.role_id   
// Jeden uživatel má jednu roli a jedna role má více uživatelů -> 1:N
// Jedna novinka má více subscriberů a více novinek má jednoho subscribera -> M:N
Ref: tournament.type_id < type.id
// Jeden turnaj má jeden typ a jeden typ má více turnajů -> 1:N
Ref: fighters.id < users.fighter_id 
// Jeden fighter má jedno user_id a jedno user_id má jednoho fightera -> 1:1
Ref tournament_reg: fighters.id > tournament_registration.fighter_id 
// Jeden fighter může mít registraci na více akcí a více akcí může mít registraci na jednoho fightera -> M:N
Ref tournament_reg: tournament.id > tournament_registration.tournament_id 
// ??? -> M:N
Ref user_tournament: tournament.users_id > users.id 
// Jeden uživatel může vytvožit více tournamentů a více turnamentů může být vytvořeno jedním uživatelem -> M:N
// 1:N


