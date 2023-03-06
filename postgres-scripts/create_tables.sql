create table users (
	_id int generated always as identity primary key not null,
	username varchar(30) not null unique,
	first_name varchar(255),
	last_name varchar(255),
	email citext not null unique,
	password varchar(255) not null,
	is_approved boolean not null default false,
	is_admin boolean not null default false,
	is_deleted boolean not null default false,
	created_at timestamptz(0) not null default now()
);

create type object_type as enum ('building', 'antenna', 'span', 'earth', 'other');
create type exp_req as enum ('beginner','intermediate','advanced', 'expert');
create type legality as enum ('legal','semi','illegal');
create type bust_factor as enum ('0','0.5','1');
create type approach_diff as enum ('0','0.5','1');


create table exits (
	_id int generated always as identity primary key not null,
	name varchar(255),
	object_type object_type,
	exit_type bit(3),
	exp_req exp_req ,
	legality legality,
	bust_factor bust_factor ,
	height_impact int default 0,
	height_landing int default 0,
	lat numeric(16,14),
	lng numeric(17,14),
	city varchar(255),
	region varchar(255),
	country_code varchar(2),
	country_name varchar(255),
	hiking_time_hrs int default 0,
	hiking_time_mins int default 0,
	approach_diff approach_diff,
	description varchar(10000),
	access_approach varchar(10000),
	landing_area varchar(10000),
	submitted_by int  references users (_id) on delete restrict on update restrict,
	is_reviewed boolean default false,
	is_deleted boolean default false,
	created_at timestamptz(0) not null default now()
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
	url varchar(2083) not null,
	is_main boolean default false,
	is_deleted boolean default false,
	created_at timestamptz(0) not null default now()
);
