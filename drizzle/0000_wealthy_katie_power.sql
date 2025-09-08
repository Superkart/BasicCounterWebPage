CREATE TABLE `high_scores` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`date` text DEFAULT (current_timestamp) NOT NULL,
	`score` integer NOT NULL
);
