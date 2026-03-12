/*
 * Prototype Data
 *
 * VR/AR prototypes and interactive experiences.
 * The /prototypes page reads this array and renders a card for each entry.
 *
 * To add a new prototype:
 * 1. Add a new object to this array
 * 2. Put the thumbnail image in public/images/projects/
 * 3. That's it -- the /prototypes page updates automatically
 */
export const projects = [
  {
    title: 'Simulated Eye Tracking',
    description:
      'Networked VR prototypes simulating avatar gaze, including blinks, saccades, and eye contact.',
    image: '/images/projects/eye-tracking.jpg',
    tags: ['Quest 2', 'Multiplayer', 'Unity'],
    url: 'https://vimeo.com/1171249822',
    embed: '<div style="padding:75% 0 0 0;position:relative;"><iframe src="https://player.vimeo.com/video/1171249822?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479" frameborder="0" allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share" referrerpolicy="strict-origin-when-cross-origin" style="position:absolute;top:0;left:0;width:100%;height:100%;" title="eye and talking"></iframe></div>',
  },
  {
    title: 'Cubed',
    description:
      "VR puzzle game where players solve a 3x3 Rubik's Cube from inside the cube in zero gravity.",
    image: '/images/projects/cubed.jpg',
    tags: ['VR', 'Puzzle', 'Quest'],
    url: 'https://vimeo.com/351245498?fl=ip&fe=ec',
    embed: '<div style="padding:100% 0 0 0;position:relative;"><iframe src="https://player.vimeo.com/video/351245498?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479" frameborder="0" allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share" referrerpolicy="strict-origin-when-cross-origin" style="position:absolute;top:0;left:0;width:100%;height:100%;" title="Cubed Gameplay Sample"></iframe></div>',
  },
  {
    title: 'Salvo',
    description:
      'Minimalist VR game inspired by Missile Command to explore hand-tracking based gameplay.',
    image: '/images/projects/salvo.jpg',
    tags: ['Quest', 'Game', 'VR'],
    url: 'https://vimeo.com/479151157?fl=ip&fe=ec',
    embed: '<div style="padding:100% 0 0 0;position:relative;"><iframe src="https://player.vimeo.com/video/479151157?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479" frameborder="0" allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share" referrerpolicy="strict-origin-when-cross-origin" style="position:absolute;top:0;left:0;width:100%;height:100%;" title="Salvo"></iframe></div>',
  },
];
