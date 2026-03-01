INSERT INTO mission (
  title,
  description,
  scale,
  is_auto_mission,
  priority,
  status,
  updated_at
)
VALUES
(
  'Learn How PRISM Works',
  'Complete a few focus sessions to understand how the system works.',
  'task',
  1,
  0,
  'active',
  unixepoch() * 1000
),
(
  'Build Your First Focus Streak',
  'Try to complete multiple sessions today to start your streak.',
  'operation',
  1,
  1,
  'active',
  unixepoch() * 1000
),
(
  'Plan Your First Campaign',
  'Create a larger goal and organize missions under it.',
  'operation',
  1,
  2,
  'active',
  unixepoch() * 1000
);