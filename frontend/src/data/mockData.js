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


// Dummy audio URL for call recordings
export const DUMMY_AUDIO_URL = 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3';

// Call transcripts keyed by call log ID
export const callTranscripts = {
  cl1: {
    subject: 'Quarterly Report Review & Deadline',
    messages: [
      { id: 1, sender: 'caller', text: 'Hi Kiki, I need to discuss the quarterly report.', time: '09:15' },
      { id: 2, sender: 'kiki', text: 'Of course, Sarah! What specifically would you like to go over?', time: '09:15' },
      { id: 3, sender: 'caller', text: 'The revenue numbers for Q3 seem off. Can you pull up the comparison data?', time: '09:16' },
      { id: 4, sender: 'kiki', text: 'I see the discrepancy. It looks like the European market figures weren\'t included in the initial draft.', time: '09:17' },
      { id: 5, sender: 'caller', text: 'That explains it. Can you update the report and send it before the 2 PM meeting?', time: '09:18' },
      { id: 6, sender: 'kiki', text: 'Absolutely. I\'ll have the corrected version with all regional data ready by noon.', time: '09:19' },
    ],
  },
  cl2: {
    subject: 'Sprint Planning & Backend Integration',
    messages: [
      { id: 1, sender: 'caller', text: 'Kiki, we need to finalize the sprint backlog for next week.', time: '08:42' },
      { id: 2, sender: 'kiki', text: 'Sure James. I\'ve drafted the priority items. Want me to walk through them?', time: '08:43' },
      { id: 3, sender: 'caller', text: 'Yes please. Also, the backend team flagged some API issues.', time: '08:44' },
      { id: 4, sender: 'kiki', text: 'I noticed that too. The authentication endpoint needs refactoring. I\'d suggest we allocate 3 story points for it.', time: '08:45' },
      { id: 5, sender: 'caller', text: 'Agreed. Let\'s also add the database migration task.', time: '08:46' },
    ],
  },
  cl3: {
    subject: 'Dashboard UI Redesign Feedback',
    messages: [
      { id: 1, sender: 'caller', text: 'Kiki, I\'ve updated the dashboard wireframes based on yesterday\'s feedback.', time: '07:30' },
      { id: 2, sender: 'kiki', text: 'Great Elena! I\'ll review them right away. Any specific areas you want me to focus on?', time: '07:31' },
      { id: 3, sender: 'caller', text: 'The navigation flow and the color accessibility compliance.', time: '07:32' },
      { id: 4, sender: 'kiki', text: 'The navigation looks much smoother now. I\'d suggest increasing the contrast ratio on the secondary buttons though.', time: '07:33' },
    ],
  },
  cl4: {
    subject: 'Q4 Budget Allocation & Engineering Costs',
    messages: [
      { id: 1, sender: 'caller', text: 'Kiki, I have the updated Q4 budget figures. Can we review them?', time: '16:20' },
      { id: 2, sender: 'kiki', text: 'Of course, Michael. I\'ve been expecting these. What\'s the total allocation?', time: '16:21' },
      { id: 3, sender: 'caller', text: 'We\'ve got 15% more for engineering but marketing took a slight cut.', time: '16:22' },
      { id: 4, sender: 'kiki', text: 'The engineering increase makes sense given our infrastructure plans. How much was the marketing reduction?', time: '16:23' },
      { id: 5, sender: 'caller', text: 'About 8%. We\'ll need to optimize our ad spend accordingly.', time: '16:24' },
      { id: 6, sender: 'kiki', text: 'I can prepare an optimized marketing budget proposal that prioritizes high-ROI channels.', time: '16:25' },
    ],
  },
  cl5: {
    subject: 'New Hire Orientation Schedule',
    messages: [
      { id: 1, sender: 'caller', text: 'Quick update on the new hire starting Monday.', time: '14:05' },
      { id: 2, sender: 'kiki', text: 'Hi Priya! Is everything set for the orientation?', time: '14:05' },
      { id: 3, sender: 'caller', text: 'Almost. I need to reschedule the meeting to 3 PM. Can you update the calendar?', time: '14:06' },
    ],
  },
  cl6: {
    subject: 'Social Media Campaign Performance Analysis',
    messages: [
      { id: 1, sender: 'caller', text: 'Kiki, the campaign numbers are in and they look amazing!', time: '11:15' },
      { id: 2, sender: 'kiki', text: 'That\'s exciting, Jenny! Which platforms performed best?', time: '11:16' },
      { id: 3, sender: 'caller', text: 'LinkedIn had a 45% engagement increase. Instagram was up 30%.', time: '11:17' },
      { id: 4, sender: 'kiki', text: 'Those are exceptional numbers! The targeted content strategy is clearly working.', time: '11:18' },
      { id: 5, sender: 'caller', text: 'Can you compile a detailed report? I want to present this to the board next week.', time: '11:19' },
      { id: 6, sender: 'kiki', text: 'I\'ll have a comprehensive deck ready with ROI analysis and recommendations for scaling.', time: '11:20' },
    ],
  },
  cl7: {
    subject: 'Client Proposal Follow-up & Next Steps',
    messages: [
      { id: 1, sender: 'caller', text: 'Good news, Kiki! The client signed off on the proposal.', time: '15:00' },
      { id: 2, sender: 'kiki', text: 'Fantastic, David! When do they want to kick things off?', time: '15:01' },
      { id: 3, sender: 'caller', text: 'Next quarter. They want a detailed implementation timeline.', time: '15:02' },
      { id: 4, sender: 'kiki', text: 'I\'ll draft a phased rollout plan with milestones and deliverables.', time: '15:03' },
      { id: 5, sender: 'caller', text: 'Perfect. Also need to set up a joint kickoff meeting with their technical team.', time: '15:04' },
    ],
  },
  cl8: {
    subject: 'Server Migration Quick Check',
    messages: [
      { id: 1, sender: 'caller', text: 'Hey Kiki, just a quick ping. Is the migration verified?', time: '10:30' },
      { id: 2, sender: 'kiki', text: 'Yes Alex, all systems are green. Zero downtime achieved!', time: '10:30' },
    ],
  },
  cl9: {
    subject: 'Stakeholder Presentation Prep',
    messages: [
      { id: 1, sender: 'caller', text: 'Kiki, I need help preparing for the stakeholder presentation.', time: '13:45' },
      { id: 2, sender: 'kiki', text: 'Sure Sarah! What\'s the focus this time?', time: '13:46' },
      { id: 3, sender: 'caller', text: 'Product roadmap and customer retention metrics.', time: '13:47' },
      { id: 4, sender: 'kiki', text: 'I\'ll pull together the retention data and roadmap visuals. When\'s the presentation?', time: '13:48' },
    ],
  },
  cl10: {
    subject: 'Code Review & Deployment Pipeline',
    messages: [
      { id: 1, sender: 'caller', text: 'Kiki, the code review for the payment module is pending.', time: '09:00' },
      { id: 2, sender: 'kiki', text: 'I\'ll prioritize it, James. Any specific concerns?', time: '09:01' },
      { id: 3, sender: 'caller', text: 'Security validation on the checkout flow needs extra scrutiny.', time: '09:02' },
      { id: 4, sender: 'kiki', text: 'Understood. I\'ll do a thorough security audit and check for edge cases.', time: '09:03' },
      { id: 5, sender: 'caller', text: 'Also, can we set up automated testing for the deployment pipeline?', time: '09:04' },
    ],
  },
  cl11: {
    subject: 'Mobile App Design System Update',
    messages: [
      { id: 1, sender: 'caller', text: 'Kiki, I want to standardize our mobile design system.', time: '17:30' },
      { id: 2, sender: 'kiki', text: 'Great initiative, Elena! Are we looking at component-level consistency?', time: '17:31' },
      { id: 3, sender: 'caller', text: 'Yes, typography, spacing, and color tokens need to be unified.', time: '17:32' },
      { id: 4, sender: 'kiki', text: 'I\'ll create a design token library that maps to our existing web system.', time: '17:33' },
    ],
  },
  cl12: {
    subject: 'Annual Budget Planning Kickoff',
    messages: [
      { id: 1, sender: 'caller', text: 'Kiki, it\'s time to start the annual budget planning process.', time: '12:15' },
      { id: 2, sender: 'kiki', text: 'Ready to go, Michael. I\'ve gathered last year\'s actuals for comparison.', time: '12:16' },
      { id: 3, sender: 'caller', text: 'Good. We need to account for the new product launch costs.', time: '12:17' },
    ],
  },
  cl13: {
    subject: 'Employee Benefits Program Review',
    messages: [
      { id: 1, sender: 'caller', text: 'Kiki, we need to review the employee benefits package for renewal.', time: '08:45' },
      { id: 2, sender: 'kiki', text: 'I\'ve compiled the utilization data from last year, Priya.', time: '08:46' },
      { id: 3, sender: 'caller', text: 'What\'s the overall satisfaction score?', time: '08:47' },
      { id: 4, sender: 'kiki', text: '87% overall, with dental and wellness programs being the most valued.', time: '08:48' },
    ],
  },
  cl14: {
    subject: 'Content Calendar Q2 Planning',
    messages: [
      { id: 1, sender: 'caller', text: 'Let\'s plan the Q2 content calendar, Kiki.', time: '16:00' },
      { id: 2, sender: 'kiki', text: 'I\'ve drafted a preliminary schedule. Should we focus on product launches or thought leadership?', time: '16:01' },
      { id: 3, sender: 'caller', text: 'A mix of both. 60% product, 40% thought leadership.', time: '16:02' },
      { id: 4, sender: 'kiki', text: 'Perfect balance. I\'ll map out the themes and assign deadlines.', time: '16:03' },
      { id: 5, sender: 'caller', text: 'Great, and include the trade show promotion in March.', time: '16:04' },
    ],
  },
  cl15: {
    subject: 'Enterprise Deal Negotiation Update',
    messages: [
      { id: 1, sender: 'caller', text: 'Kiki, the enterprise client wants to renegotiate terms.', time: '11:00' },
      { id: 2, sender: 'kiki', text: 'What are their main concerns, David?', time: '11:01' },
      { id: 3, sender: 'caller', text: 'Pricing tier and SLA guarantees.', time: '11:02' },
    ],
  },
  cl16: {
    subject: 'Infrastructure Scaling Plan',
    messages: [
      { id: 1, sender: 'caller', text: 'Kiki, we need to plan for the traffic spike next month.', time: '14:30' },
      { id: 2, sender: 'kiki', text: 'I\'ve been monitoring the trends, Alex. We should autoscale the compute instances.', time: '14:31' },
      { id: 3, sender: 'caller', text: 'Agreed. Also need to upgrade the CDN capacity.', time: '14:32' },
      { id: 4, sender: 'kiki', text: 'I\'ll prepare a scaling blueprint with cost projections.', time: '14:33' },
    ],
  },
  cl17: {
    subject: 'Product Roadmap Strategy Session',
    messages: [
      { id: 1, sender: 'caller', text: 'Kiki, let\'s review the product roadmap for the next two quarters.', time: '10:00' },
      { id: 2, sender: 'kiki', text: 'I\'ve prepared a priority matrix based on customer feedback and market analysis.', time: '10:01' },
      { id: 3, sender: 'caller', text: 'What are the top three requested features?', time: '10:02' },
      { id: 4, sender: 'kiki', text: 'Advanced analytics dashboard, API integrations marketplace, and real-time collaboration tools.', time: '10:03' },
      { id: 5, sender: 'caller', text: 'Let\'s fast-track the analytics dashboard. It aligns with our enterprise push.', time: '10:04' },
    ],
  },
  cl18: {
    subject: 'CI/CD Pipeline Optimization',
    messages: [
      { id: 1, sender: 'caller', text: 'Kiki, our build times have increased significantly.', time: '09:15' },
      { id: 2, sender: 'kiki', text: 'I noticed that too, James. The test suite seems to be the bottleneck.', time: '09:16' },
      { id: 3, sender: 'caller', text: 'Can we parallelize the tests?', time: '09:17' },
    ],
  },
  cl19: {
    subject: 'Design System Color Accessibility Audit',
    messages: [
      { id: 1, sender: 'caller', text: 'Kiki, we need an accessibility audit on our color palette.', time: '13:00' },
      { id: 2, sender: 'kiki', text: 'I\'ll run a WCAG AA compliance check on all our UI components, Elena.', time: '13:01' },
      { id: 3, sender: 'caller', text: 'Focus on the form elements and call-to-action buttons first.', time: '13:02' },
    ],
  },
  cl20: {
    subject: 'Vendor Contract Renewal Discussion',
    messages: [
      { id: 1, sender: 'caller', text: 'The cloud vendor contract is up for renewal next month, Kiki.', time: '15:45' },
      { id: 2, sender: 'kiki', text: 'I\'ve compared pricing from three major providers, Michael.', time: '15:46' },
      { id: 3, sender: 'caller', text: 'What\'s the most cost-effective option?', time: '15:47' },
      { id: 4, sender: 'kiki', text: 'Staying with the current provider with a 3-year commitment saves us 22%.', time: '15:48' },
    ],
  },
  cl21: {
    subject: 'Team Training Program Setup',
    messages: [
      { id: 1, sender: 'caller', text: 'Kiki, we need to set up a training program for the new tools.', time: '10:30' },
      { id: 2, sender: 'kiki', text: 'I can design a 4-week curriculum, Priya. What tools are we covering?', time: '10:31' },
      { id: 3, sender: 'caller', text: 'The new project management suite and the updated CRM.', time: '10:32' },
    ],
  },
  cl22: {
    subject: 'Brand Refresh Campaign Brief',
    messages: [
      { id: 1, sender: 'caller', text: 'Kiki, let\'s discuss the brand refresh campaign.', time: '08:00' },
      { id: 2, sender: 'kiki', text: 'I\'ve outlined three creative directions, Jenny. Want to review them?', time: '08:01' },
      { id: 3, sender: 'caller', text: 'Yes, let\'s go with the modern minimalist approach.', time: '08:02' },
    ],
  },
  cl23: {
    subject: 'Partnership Pipeline Review',
    messages: [
      { id: 1, sender: 'caller', text: 'Kiki, how\'s the partnership pipeline looking?', time: '16:15' },
      { id: 2, sender: 'kiki', text: 'We have 5 active leads and 2 near close, David.', time: '16:16' },
      { id: 3, sender: 'caller', text: 'Excellent. Which ones are closest to signing?', time: '16:17' },
      { id: 4, sender: 'kiki', text: 'TechVentures and GlobalSync. Both expected to close this week.', time: '16:18' },
    ],
  },
  cl24: {
    subject: 'Security Incident Response Drill',
    messages: [
      { id: 1, sender: 'caller', text: 'Kiki, we need to schedule the quarterly security drill.', time: '11:45' },
      { id: 2, sender: 'kiki', text: 'I\'ll coordinate with the security team, Alex. What scenario this time?', time: '11:46' },
      { id: 3, sender: 'caller', text: 'Simulated ransomware attack with full incident response.', time: '11:47' },
    ],
  },
  cl25: {
    subject: 'Customer Success Metrics Deep Dive',
    messages: [
      { id: 1, sender: 'caller', text: 'Kiki, let\'s do a deep dive into customer success metrics.', time: '09:00' },
      { id: 2, sender: 'kiki', text: 'I\'ve prepared the NPS trends, churn analysis, and expansion revenue data, Sarah.', time: '09:01' },
      { id: 3, sender: 'caller', text: 'What\'s our current NPS score?', time: '09:02' },
      { id: 4, sender: 'kiki', text: '72, which is up from 65 last quarter. The onboarding improvements made a significant impact.', time: '09:03' },
    ],
  },
};

// Static waveform data (deterministic heights for the audio player)
export const waveformData = [
  12, 18, 25, 30, 22, 35, 28, 40, 32, 18, 25, 38, 42, 30, 20, 35, 28, 45, 38, 22,
  15, 30, 42, 35, 28, 20, 38, 32, 45, 40, 25, 18, 35, 42, 30, 22, 38, 28, 15, 40,
  35, 22, 30, 45, 38, 25, 42, 20, 32, 35, 18, 40, 28, 38, 22, 45, 30, 35, 25, 42,
  20, 38, 32, 28, 45, 35, 22, 40, 30, 18, 42, 25, 35, 38, 28, 20, 45, 32, 22, 40,
];
