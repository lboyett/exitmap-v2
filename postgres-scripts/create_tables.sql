create table users (
	_id int generated always as identity primary key not null,
	username varchar(30) not null unique,
	first_name varchar(255),
	last_name varchar(255),
	email citext not null unique,
	password varchar(255) not null,
	is_approved boolean not null default false,
	is_admin boolean not null default false,
	is_deleted boolean not null default false
);

create type object_type as enum ('bridge', 'antenna', 'span', 'earth', 'other');
create type exit_type as enum ('sd','ts','ws');
create type exp_req as enum ('beginner','intermediate','advanced', 'expert');
create type legality as enum ('legal','semi','illegal');
create type bust_factor as enum ('low','med','high');
create type approach_diff as enum ('easy','med','hard');


create table exits (
	_id int generated always as identity primary key not null,
	exit_name varchar(255) not null,
	object_type object_type not null,
	sd boolean not null,
	ts boolean not null, 
	ws boolean not null,
	exp_req exp_req not null,
	legality legality not null,
	bust_factor bust_factor not null,
	height_impact int not null,
	height_landing int not null,
	lat numeric(16,14) not null,
	lng numeric(17,14) not null,
	city varchar(255) not null,
	country_code varchar(2) not null,
	country_name varchar(255) not null,
	hiking_time_hrs int default 0,
	hiking_time_mins int not null,
	approach_diff approach_diff not null,
	description varchar(10000) not null,
	access_approach varchar(10000) not null,
	landing_area varchar(10000) not null,
	submitted_by int not null references users (_id) on delete restrict on update restrict,
	is_reviewed boolean not null default false,
	is_deleted boolean not null default false
);

create table comments (
	_id int generated always as identity primary key not null,
	comment varchar(2000),
	author int not null references users (_id) on delete restrict on update restrict,
	exit int not null references exits (_id) on delete restrict on update restrict,
	created_at timestamptz(0) not null default now(),
	updated_at timestamptz(0) not null default now(),
	is_deleted boolean not null default false
);

create table images (
	_id int generated always as identity primary key not null,
	submitted_by int not null references users (_id) on delete restrict on update restrict,
	exit int not null references exits (_id) on delete restrict on update restrict,
	url varchar(2083) not null unique,
	is_main boolean default false,
	is_deleted boolean default false
);