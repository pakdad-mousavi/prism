CREATE TABLE `campaign` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`title` text NOT NULL,
	`icon` text,
	`status` text DEFAULT 'active',
	`created_at` integer DEFAULT (unixepoch() * 1000) NOT NULL,
	`updated_at` integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE `focus_run` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`mission_id` integer,
	`created_at` integer DEFAULT (unixepoch() * 1000) NOT NULL,
	`started_at` integer NOT NULL,
	`ended_at` integer,
	`planned_minutes` integer NOT NULL,
	`status` text DEFAULT 'running' NOT NULL,
	`device_id` text NOT NULL,
	`offline_created` integer NOT NULL,
	`sync_status` text DEFAULT 'pending',
	FOREIGN KEY (`mission_id`) REFERENCES `mission`(`id`) ON UPDATE no action ON DELETE set null
);
--> statement-breakpoint
CREATE TABLE `focus_run_pause` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`run_id` integer NOT NULL,
	`paused_at` integer NOT NULL,
	`resumed_at` integer,
	FOREIGN KEY (`run_id`) REFERENCES `focus_run`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `mission` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`title` text NOT NULL,
	`description` text,
	`scale` text NOT NULL,
	`campaign_id` integer,
	`is_auto_mission` integer NOT NULL,
	`estimated_minutes` integer,
	`target_sessions` integer,
	`completed_sessions` integer DEFAULT 0,
	`priority` integer DEFAULT 0,
	`status` text DEFAULT 'active' NOT NULL,
	`order_index` integer DEFAULT 0,
	`created_at` integer DEFAULT (unixepoch() * 1000) NOT NULL,
	`updated_at` integer NOT NULL,
	`completed_at` integer DEFAULT (unixepoch() * 1000) NOT NULL,
	FOREIGN KEY (`campaign_id`) REFERENCES `campaign`(`id`) ON UPDATE no action ON DELETE set null
);
--> statement-breakpoint
CREATE TABLE `streak_day` (
	`day` integer PRIMARY KEY NOT NULL,
	`focused_minutes` integer NOT NULL,
	`run_count` integer NOT NULL,
	`last_run_id` integer,
	`heatmap_level` integer DEFAULT 0 NOT NULL,
	`created_at` integer DEFAULT (unixepoch() * 1000) NOT NULL,
	`updated_at` integer NOT NULL,
	FOREIGN KEY (`last_run_id`) REFERENCES `focus_run`(`id`) ON UPDATE no action ON DELETE set null
);
--> statement-breakpoint
CREATE INDEX `idx_streak_updated` ON `streak_day` (`updated_at`);--> statement-breakpoint
CREATE TABLE `sync_queue` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`table_name` text NOT NULL,
	`row_id` integer NOT NULL,
	`operation` text NOT NULL,
	`payload` text NOT NULL,
	`retry_count` integer DEFAULT 0 NOT NULL,
	`syncStatus` text DEFAULT 'pending' NOT NULL,
	`created_at` integer DEFAULT (unixepoch() * 1000) NOT NULL,
	`updated_at` integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE `user_local` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`username` text,
	`email` text,
	`cloud_id` text,
	`last_synced_at` integer,
	`device_id` text NOT NULL,
	`theme` text DEFAULT 'prismRed' NOT NULL,
	`created_at` integer DEFAULT (unixepoch() * 1000) NOT NULL,
	`updated_at` integer NOT NULL
);
