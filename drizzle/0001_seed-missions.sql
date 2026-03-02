INSERT INTO mission (
  title,
  description,
  scale,
  is_auto_mission,
  estimated_minutes,
  target_sessions,
  priority,
  order_index,
  status,
  updated_at
)
VALUES
(
  'Learn the Focus System',
  'Run your first focus session to understand how the timer works.',
  'task',
  0,
  25,
  1,
  0,
  2,
  'active',
  unixepoch() * 1000
),
(
  'Clean Your Workspace',
  'Remove distractions from your desk or digital workspace.',
  'task',
  0,
  15,
  1,
  1,
  1,
  'active',
  unixepoch() * 1000
),
(
  'Plan Today''s Work',
  'Write down the most important tasks you want to complete today.',
  'task',
  0,
  20,
  1,
  2,
  0,
  'active',
  unixepoch() * 1000
),
(
  'Build a 3 Session Streak',
  'Complete three focus sessions today to start building momentum.',
  'task',
  0,
  75,
  3,
  1,
  1,
  'on hold',
  unixepoch() * 1000
),
(
  'Deep Work Block',
  'Schedule a longer uninterrupted focus period.',
  'operation',
  0,
  90,
  3,
  2,
  0,
  'on hold',
  unixepoch() * 1000
),
(
  'Install the PRISM productivity app',
  'The first step to using prism is installing it, download the app from the website.',
  'task',
  0,
  20,
  1,
  0,
  1,
  'completed',
  unixepoch() * 1000
),
(
  'Visit the missions page',
  'See what the missions page has to offer.',
  'task',
  0,
  60,
  2,
  1,
  0,
  'completed',
  unixepoch() * 1000
);