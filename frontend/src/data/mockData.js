// Avatar URLs
const avatars = {
  sarah: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=face',
  james: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face',
  elena: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=100&h=100&fit=crop&crop=face',
  michael: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop&crop=face',
  priya: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=100&h=100&fit=crop&crop=face',
  david: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=100&h=100&fit=crop&crop=face',
  jenny: 'https://images.unsplash.com/photo-1611432579699-484f7990b127?w=100&h=100&fit=crop&crop=face',
  alex: 'https://images.unsplash.com/photo-1627161683077-e34782c24d81?w=100&h=100&fit=crop&crop=face',
};

export const contacts = [
  {
    id: 'sarah',
    name: 'Sarah Mitchell',
    avatar: avatars.sarah,
    lastMessage: 'Can you send the updated report?',
    time: '4 m',
    unread: 5,
    pinned: true,
    online: true,
    status: 'Product Manager at TechCo',
  },
  {
    id: 'james',
    name: 'James Parker',
    avatar: avatars.james,
    lastMessage: 'Our team needs to prepare the quarterly...',
    time: '15 m',
    unread: 0,
    pinned: true,
    online: true,
    status: 'Senior Developer',
    delivered: true,
  },
  {
    id: 'elena',
    name: 'Elena Rodriguez',
    avatar: avatars.elena,
    lastMessage: 'The design mockups look great!',
    time: '9:31 am',
    unread: 0,
    pinned: false,
    online: false,
    status: 'UX Designer',
  },
  {
    id: 'michael',
    name: 'Michael Chen',
    avatar: avatars.michael,
    lastMessage: 'Let me check the budget allocation',
    time: '24 m',
    unread: 0,
    pinned: true,
    online: true,
    status: 'Finance Director',
  },
  {
    id: 'priya',
    name: 'Priya Sharma',
    avatar: avatars.priya,
    lastMessage: 'Meeting rescheduled to 3 PM',
    time: '9:31 am',
    unread: 0,
    pinned: false,
    online: false,
    status: 'HR Manager',
  },
  {
    id: 'david',
    name: 'David Thompson',
    avatar: avatars.david,
    lastMessage: 'The client presentation went well',
    time: 'Yesterday',
    unread: 0,
    pinned: false,
    online: false,
    status: 'Sales Director',
  },
  {
    id: 'jenny',
    name: 'Jenny Li',
    avatar: avatars.jenny,
    lastMessage: 'I want to ask you to pick up...',
    time: '9:52 am',
    unread: 3,
    pinned: false,
    online: true,
    status: 'Marketing Lead',
  },
  {
    id: 'alex',
    name: 'Alex Morgan',
    avatar: avatars.alex,
    lastMessage: 'The server migration is complete',
    time: 'Yesterday',
    unread: 0,
    pinned: false,
    online: false,
    status: 'DevOps Engineer',
  },
];

export const messages = {
  sarah: [
    { id: 1, sender: 'sarah', text: 'Hey! Have you finished the quarterly report?', time: '08:30', type: 'text' },
    { id: 2, sender: 'me', text: 'Almost done, just finalizing the charts', time: '08:32', type: 'text' },
    { id: 3, sender: 'sarah', text: 'Great, the stakeholders meeting is at 2 PM', time: '08:33', type: 'text' },
    { id: 4, sender: 'sarah', image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=400&h=300&fit=crop', time: '08:35', type: 'image', caption: 'Here is the conference room setup' },
    { id: 5, sender: 'me', text: 'Looks perfect! I\'ll have everything ready by noon', time: '08:40', type: 'text' },
    { id: 6, sender: 'sarah', text: 'Don\'t forget to include the Q3 comparison data', time: '08:42', type: 'text' },
    { id: 7, sender: 'me', text: 'Already on it. Also added the revenue projections', time: '08:45', type: 'text' },
    { id: 8, sender: 'sarah', text: 'Can you send the updated report?', time: '09:01', type: 'text' },
  ],
  james: [
    { id: 1, sender: 'james', text: 'The new sprint planning session is tomorrow', time: '08:00', type: 'text' },
    { id: 2, sender: 'me', text: 'I\'ve prepared the backlog items', time: '08:15', type: 'text' },
    { id: 3, sender: 'james', text: 'Our team needs to prepare the quarterly review as well', time: '08:50', type: 'text' },
    { id: 4, sender: 'james', type: 'audio', duration: '0:36', size: '2.0 Mb', time: '09:00' },
    { id: 5, sender: 'me', text: 'Got it. I\'ll sync with the backend team today', time: '09:10', type: 'text' },
  ],
  elena: [
    { id: 1, sender: 'elena', text: 'I\'ve uploaded the new wireframes to Figma', time: '09:00', type: 'text' },
    { id: 2, sender: 'me', text: 'Checking them now', time: '09:05', type: 'text' },
    { id: 3, sender: 'elena', image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=300&fit=crop', time: '09:10', type: 'image', caption: 'Preview of the new dashboard' },
    { id: 4, sender: 'me', text: 'The design mockups look great! Love the color scheme', time: '09:15', type: 'text' },
    { id: 5, sender: 'elena', text: 'Thanks! I\'ll finalize the mobile version today', time: '09:20', type: 'text' },
  ],
  michael: [
    { id: 1, sender: 'me', text: 'Hi Michael, can we discuss the budget for Q4?', time: '08:00', type: 'text' },
    { id: 2, sender: 'michael', text: 'Sure, I have some updates on that', time: '08:30', type: 'text' },
    { id: 3, sender: 'michael', text: 'We\'ve allocated 15% more for the engineering team', time: '08:32', type: 'text' },
    { id: 4, sender: 'me', text: 'That\'s great news! What about the marketing budget?', time: '08:35', type: 'text' },
    { id: 5, sender: 'michael', text: 'Let me check the budget allocation and get back to you', time: '08:40', type: 'text' },
  ],
  priya: [
    { id: 1, sender: 'priya', text: 'The new hire orientation is next Monday', time: '09:00', type: 'text' },
    { id: 2, sender: 'me', text: 'I\'ll prepare the welcome package', time: '09:10', type: 'text' },
    { id: 3, sender: 'priya', text: 'Meeting rescheduled to 3 PM due to conflict', time: '09:31', type: 'text' },
  ],
  david: [
    { id: 1, sender: 'david', text: 'The client loved our proposal!', time: '14:00', type: 'text' },
    { id: 2, sender: 'me', text: 'Excellent! When do they want to start?', time: '14:05', type: 'text' },
    { id: 3, sender: 'david', text: 'They want to kick off next quarter', time: '14:10', type: 'text' },
    { id: 4, sender: 'david', text: 'The client presentation went well overall', time: '14:30', type: 'text' },
  ],
  jenny: [
    { id: 1, sender: 'jenny', text: 'The social media campaign metrics are impressive', time: '09:00', type: 'text' },
    { id: 2, sender: 'me', text: 'Which platform performed best?', time: '09:05', type: 'text' },
    { id: 3, sender: 'jenny', text: 'LinkedIn had a 45% engagement increase', time: '09:10', type: 'text' },
    { id: 4, sender: 'jenny', text: 'I want to ask you to pick up the analytics report from the printer', time: '09:52', type: 'text' },
  ],
  alex: [
    { id: 1, sender: 'alex', text: 'Migration started at midnight, everything looks good', time: '07:00', type: 'text' },
    { id: 2, sender: 'me', text: 'Any downtime reported?', time: '07:30', type: 'text' },
    { id: 3, sender: 'alex', text: 'Zero downtime! The blue-green deployment worked perfectly', time: '07:35', type: 'text' },
    { id: 4, sender: 'alex', text: 'The server migration is complete and verified', time: '08:00', type: 'text' },
  ],
};

export const chatSummaries = {
  sarah: {
    summary: 'Discussion about the quarterly report preparation for the 2 PM stakeholders meeting. Sarah shared the conference room setup photo and reminded about including Q3 comparison data and revenue projections.',
    keyTopics: ['Quarterly Report', 'Stakeholders Meeting', 'Revenue Projections'],
  },
  james: {
    summary: 'Sprint planning session scheduled for tomorrow. Backlog items have been prepared. James emphasized the need to also prepare for the quarterly review alongside regular sprint work.',
    keyTopics: ['Sprint Planning', 'Quarterly Review', 'Backend Sync'],
  },
  elena: {
    summary: 'Elena shared new wireframes and dashboard previews on Figma. The design mockups received positive feedback. Mobile version finalization is planned for today.',
    keyTopics: ['Wireframes', 'Dashboard Design', 'Mobile Version'],
  },
  michael: {
    summary: 'Budget discussion for Q4. Engineering team received 15% more allocation. Marketing budget still under review and pending confirmation.',
    keyTopics: ['Q4 Budget', 'Engineering Allocation', 'Marketing Budget'],
  },
  priya: {
    summary: 'New hire orientation planned for next Monday. Welcome package preparation underway. Meeting rescheduled from original time to 3 PM.',
    keyTopics: ['Orientation', 'Welcome Package', 'Meeting Reschedule'],
  },
  david: {
    summary: 'Client proposal was well-received. They expressed interest in kicking off the project next quarter. Overall positive feedback from the presentation.',
    keyTopics: ['Client Proposal', 'Project Kickoff', 'Next Quarter'],
  },
  jenny: {
    summary: 'Social media campaign showing strong results with LinkedIn leading at 45% engagement increase. Analytics report needs to be collected from the printer.',
    keyTopics: ['Campaign Metrics', 'LinkedIn Engagement', 'Analytics Report'],
  },
  alex: {
    summary: 'Server migration completed successfully at midnight with zero downtime using blue-green deployment strategy. All systems verified and operational.',
    keyTopics: ['Server Migration', 'Zero Downtime', 'Blue-Green Deployment'],
  },
};

export const todoLists = {
  sarah: [
    { id: 1, text: 'Finalize quarterly report charts', done: true },
    { id: 2, text: 'Include Q3 comparison data', done: false },
    { id: 3, text: 'Add revenue projections', done: true },
    { id: 4, text: 'Send updated report to Sarah', done: false },
    { id: 5, text: 'Prepare for 2 PM stakeholders meeting', done: false },
  ],
  james: [
    { id: 1, text: 'Prepare backlog items for sprint planning', done: true },
    { id: 2, text: 'Sync with backend team', done: false },
    { id: 3, text: 'Review quarterly metrics', done: false },
  ],
  elena: [
    { id: 1, text: 'Review wireframes on Figma', done: true },
    { id: 2, text: 'Provide feedback on dashboard design', done: true },
    { id: 3, text: 'Check mobile version when ready', done: false },
  ],
  michael: [
    { id: 1, text: 'Discuss Q4 budget details', done: true },
    { id: 2, text: 'Follow up on marketing budget', done: false },
    { id: 3, text: 'Review engineering allocation plan', done: false },
  ],
  priya: [
    { id: 1, text: 'Prepare welcome package for new hire', done: false },
    { id: 2, text: 'Attend rescheduled 3 PM meeting', done: false },
  ],
  david: [
    { id: 1, text: 'Follow up on client proposal timeline', done: false },
    { id: 2, text: 'Plan project kickoff for next quarter', done: false },
  ],
  jenny: [
    { id: 1, text: 'Collect analytics report from printer', done: false },
    { id: 2, text: 'Compile LinkedIn engagement data', done: true },
    { id: 3, text: 'Prepare campaign summary presentation', done: false },
  ],
  alex: [
    { id: 1, text: 'Verify all systems post-migration', done: true },
    { id: 2, text: 'Document migration process', done: false },
    { id: 3, text: 'Update DNS records', done: true },
  ],
};

export const chatStats = {
  sarah: {
    totalMessages: 248,
    myMessages: 112,
    theirMessages: 136,
    totalCalls: 12,
    totalCallDuration: '3h 24m',
    lastCallDuration: '18m 32s',
    avgResponseTime: '4 min',
    sharedFiles: 23,
    sharedImages: 15,
    activedays: 45,
    firstMessage: 'Jan 15, 2025',
  },
  james: {
    totalMessages: 312,
    myMessages: 145,
    theirMessages: 167,
    totalCalls: 8,
    totalCallDuration: '2h 15m',
    lastCallDuration: '25m 10s',
    avgResponseTime: '6 min',
    sharedFiles: 34,
    sharedImages: 8,
    activedays: 60,
    firstMessage: 'Dec 3, 2024',
  },
  elena: {
    totalMessages: 189,
    myMessages: 78,
    theirMessages: 111,
    totalCalls: 5,
    totalCallDuration: '1h 40m',
    lastCallDuration: '12m 45s',
    avgResponseTime: '8 min',
    sharedFiles: 45,
    sharedImages: 32,
    activedays: 30,
    firstMessage: 'Feb 20, 2025',
  },
  michael: {
    totalMessages: 156,
    myMessages: 72,
    theirMessages: 84,
    totalCalls: 15,
    totalCallDuration: '5h 10m',
    lastCallDuration: '32m 18s',
    avgResponseTime: '12 min',
    sharedFiles: 18,
    sharedImages: 3,
    activedays: 55,
    firstMessage: 'Nov 8, 2024',
  },
  priya: {
    totalMessages: 94,
    myMessages: 42,
    theirMessages: 52,
    totalCalls: 3,
    totalCallDuration: '45m',
    lastCallDuration: '8m 20s',
    avgResponseTime: '15 min',
    sharedFiles: 7,
    sharedImages: 2,
    activedays: 20,
    firstMessage: 'Mar 5, 2025',
  },
  david: {
    totalMessages: 203,
    myMessages: 98,
    theirMessages: 105,
    totalCalls: 20,
    totalCallDuration: '6h 30m',
    lastCallDuration: '15m 05s',
    avgResponseTime: '5 min',
    sharedFiles: 28,
    sharedImages: 10,
    activedays: 70,
    firstMessage: 'Oct 12, 2024',
  },
  jenny: {
    totalMessages: 167,
    myMessages: 80,
    theirMessages: 87,
    totalCalls: 6,
    totalCallDuration: '1h 55m',
    lastCallDuration: '20m 44s',
    avgResponseTime: '7 min',
    sharedFiles: 15,
    sharedImages: 22,
    activedays: 35,
    firstMessage: 'Jan 28, 2025',
  },
  alex: {
    totalMessages: 278,
    myMessages: 130,
    theirMessages: 148,
    totalCalls: 10,
    totalCallDuration: '4h 05m',
    lastCallDuration: '28m 55s',
    avgResponseTime: '3 min',
    sharedFiles: 42,
    sharedImages: 5,
    activedays: 65,
    firstMessage: 'Nov 20, 2024',
  },
};


// Helper to create dates relative to now
function daysAgo(days, hours = 10, minutes = 30) {
  const d = new Date();
  d.setDate(d.getDate() - days);
  d.setHours(hours, minutes, 0, 0);
  return d.toISOString();
}

export const callLogs = [
  // Today (within 1 day)
  { id: 'cl1', contactId: 'sarah', date: daysAgo(0, 9, 15), duration: '26:56', isRead: false },
  { id: 'cl2', contactId: 'james', date: daysAgo(0, 8, 42), duration: '12:51', isRead: false },
  { id: 'cl3', contactId: 'elena', date: daysAgo(0, 7, 30), duration: '14:26', isRead: true },

  // Yesterday (within 1 day boundary)
  { id: 'cl4', contactId: 'michael', date: daysAgo(1, 16, 20), duration: '23:52', isRead: false },
  { id: 'cl5', contactId: 'priya', date: daysAgo(1, 14, 5), duration: '01:45', isRead: true },
  { id: 'cl6', contactId: 'jenny', date: daysAgo(1, 11, 15), duration: '20:42', isRead: false },

  // 2-3 days ago (within 7 days)
  { id: 'cl7', contactId: 'david', date: daysAgo(2, 15, 0), duration: '25:27', isRead: true },
  { id: 'cl8', contactId: 'alex', date: daysAgo(2, 10, 30), duration: '00:12', isRead: true },
  { id: 'cl9', contactId: 'sarah', date: daysAgo(3, 13, 45), duration: '04:56', isRead: false },
  { id: 'cl10', contactId: 'james', date: daysAgo(3, 9, 0), duration: '11:16', isRead: true },

  // 4-6 days ago (within 7 days)
  { id: 'cl11', contactId: 'elena', date: daysAgo(4, 17, 30), duration: '28:25', isRead: true },
  { id: 'cl12', contactId: 'michael', date: daysAgo(5, 12, 15), duration: '08:33', isRead: false },
  { id: 'cl13', contactId: 'priya', date: daysAgo(5, 8, 45), duration: '15:20', isRead: true },
  { id: 'cl14', contactId: 'jenny', date: daysAgo(6, 16, 0), duration: '32:10', isRead: true },

  // 7-14 days ago (within 1 month)
  { id: 'cl15', contactId: 'david', date: daysAgo(8, 11, 0), duration: '06:45', isRead: true },
  { id: 'cl16', contactId: 'alex', date: daysAgo(9, 14, 30), duration: '19:22', isRead: false },
  { id: 'cl17', contactId: 'sarah', date: daysAgo(10, 10, 0), duration: '42:18', isRead: true },
  { id: 'cl18', contactId: 'james', date: daysAgo(12, 9, 15), duration: '03:55', isRead: true },

  // 15-30 days ago (within 1 month)
  { id: 'cl19', contactId: 'elena', date: daysAgo(15, 13, 0), duration: '17:40', isRead: true },
  { id: 'cl20', contactId: 'michael', date: daysAgo(18, 15, 45), duration: '09:12', isRead: true },
  { id: 'cl21', contactId: 'priya', date: daysAgo(20, 10, 30), duration: '22:05', isRead: false },
  { id: 'cl22', contactId: 'jenny', date: daysAgo(22, 8, 0), duration: '05:38', isRead: true },
  { id: 'cl23', contactId: 'david', date: daysAgo(25, 16, 15), duration: '31:44', isRead: true },
  { id: 'cl24', contactId: 'alex', date: daysAgo(28, 11, 45), duration: '13:27', isRead: true },
  { id: 'cl25', contactId: 'sarah', date: daysAgo(30, 9, 0), duration: '07:55', isRead: true },
];
