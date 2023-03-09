insert into 
	users 
	(username, 
	first_name,
	last_name,
	email,
	"password",
	is_approved,
	is_admin,
	is_deleted)
values 
	('splitseam', 'Luke', 'Boyett', 'lboyett@gmail.com', 'luke', true, true, false),
	('macjac16', 'Jackson', 'Boyett', 'jackson.boyett@gmail.com', 'jackson', true, true, false),
	('dillfunk', 'Dill', 'Funk', 'dillfunk@gmail.com', 'dill', true, false, false),
	('diddydootdat', 'Diddy', 'Doodat', 'diddydoodat@yahoo.com', 'diddy', true, false, false),
	('stunkbeagle', 'Stunk', 'Beagle', 'stunkbeagle@gmail.com', 'stunk', false, false, false);


insert into 
	exits 
		("name" , 
		object_type, 
		exit_type, 
		exp_req, 
		legality,
		bust_factor, 
		height_impact, 
		height_landing, 
		lat, 
		lng, 
		city, 
		region,
		country_code, 
		country_name, 
		hiking_time_hrs, 
		hiking_time_mins, 
		approach_diff, 
		description, 
		access_approach, 
		landing_area, 
		submitted_by, 
		is_reviewed, 
		is_deleted)
values
	('Perrine Bridge', 'span', B'100' , 'beginner', 'legal', '0', 486, 486, 42.60083705751931, -114.45351304083016,
	'Twin Falls', 'Idaho', 'US', 'United States', 0, 25, '0',
	'One of the most famous objects in the world. Many beginners learn how to BASE jump here. But dont be fooled, the Bridge is not as safe as it may seem, and jumpers
	should still exercise caution when jumping.', 
	'You can either walk out or climb out. The walk out takes about 20 minutes to a parking lot in the bottom of the canyon where jumpers can get picked up.
	Jumpers can also climb out of the canyon. It is a fairly steep hike and requires fitness.', 
	'Landing area next to river. Extremely open area, but it is common for beginner jumpers to land in the trees. It is advised to land in the water in case of emergency.', 
	1, true, false),
	('Tombstone', 'earth', B'100', 'intermediate', 'legal', '0', 515, 550, 38.52926, -109.593778,
	'Moab', 'Utah', 'US', 'United States', 0, 45, '0',
	'This is the classic jump in Moab. For many people, it the first cliff that they jump. A beautiful cliff face that looks just like a Tombstone, when you jump this exit, 
	you hope its name is not any kind of foreshadowing.', 
	'Approach is known for being somewhat confusing. There are many possible turns, and the rocks make navigation difficult. See photos for directions to the exit.', 
	'It is illegal to land on the road. Park rangers have been known to give jumpers tickets. That being said, the road is a good out if you cant make it across the trees to
	the actual landing area.', 
	2, true, false),
	('Marys Gash', 'earth', B'100', 'intermediate', 'legal', '0', 475, 1100, 38.516284, -109.999808,
	'Moab', 'Utah', 'US', 'United States', 0, 20, '0',
	'This is another classic jump in Moab. It is one of the most accessible jumps in Mineral Bottom, about an hour drive from downtown Moab. Usually people will jump this as a sunset load as the view of the sunset is incredible, and it is an easy hike.', 
	'At the parking lot, start walking towards the canyon and hug the cliff on the left. The exit is all the way at the end of the cliff on the left, so just go as far as you can.', 
	'You can land on the road or in the fields next to the road, but watch out for boulders. The landing area is wide open, but it is somewhat of a flight, so if you pull dirty low on this exit you might have to land in a boulder field.', 
	2, true, false);

insert into
	comments
		("comment", 
		author, 
		"exit", 
		created_at, 
		updated_at, 
		is_deleted)
values
	('This is a message on exit 1 made by user 1', 1, 1, now(), now(), false),
	('This is a message on exit 1 made by user 3', 3, 1, now(), now(), false),
	('This is a message on exit 2 made by user 2', 2, 2, now(), now(), false);

insert into 
	images
		(submitted_by, 
		"exit", 
		url,
		key,
		is_main, 
		is_deleted)
values
	(1, 1, 'https://lboyett-exitmap-v2.s3.eu-central-1.amazonaws.com/1678201453002-4xpe01htcleydtcjv.webp','1678201453002-4xpe01htcleydtcjv.webp', true, false),
	(1, 2, 'https://lboyett-exitmap-v2.s3.eu-central-1.amazonaws.com/1678201515892-4xpe01htcleydup2s.webp','1678201515892-4xpe01htcleydup2s.webp', true, false);
	(1, 3, 'https://lboyett-exitmap-v2.s3.eu-central-1.amazonaws.com/1678201515892-4xpe01htcleydup2s.webp','1678201515892-4xpe01htcleydup2s.webp', true, false);





	
	