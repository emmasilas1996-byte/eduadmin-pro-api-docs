// docusaurus.config.js
// Drop this into a Docusaurus project root to configure the EduAdmin Pro API docs site.

const config = {
  title: 'EduAdmin Pro API',
  tagline: 'School management, programmatically.',
  url: 'https://docs.eduadminpro.com',
  baseUrl: '/',
  favicon: 'img/favicon.ico',

  themeConfig: {
    navbar: {
      title: 'EduAdmin Pro',
      items: [
        { type: 'doc', docId: 'introduction', label: 'Docs', position: 'left' },
        { href: 'https://eduadminpro.com', label: 'Back to App', position: 'right' },
      ],
    },
    footer: {
      style: 'dark',
      copyright: `Copyright © ${new Date().getFullYear()} EduAdmin Pro`,
    },
    prism: {
      theme: require('prism-react-renderer/themes/github'),
      darkTheme: require('prism-react-renderer/themes/dracula'),
    },
  },

  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          routeBasePath: '/',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      },
    ],
  ],
};

module.exports = config;

// ─────────────────────────────────────────────────────────────────────────────
// sidebars.js
// ─────────────────────────────────────────────────────────────────────────────

const sidebars = {
  apiSidebar: [
    'introduction',
    'quickstart',
    {
      type: 'category',
      label: 'Authentication',
      items: ['auth/authentication'],
    },
    {
      type: 'category',
      label: 'Students',
      items: ['students/students'],
    },
    {
      type: 'category',
      label: 'Staff',
      items: ['staff/staff'],
    },
    {
      type: 'category',
      label: 'Fees & Payments',
      items: ['fees/fees'],
    },
    {
      type: 'category',
      label: 'Grades & Results',
      items: ['grades/grades'],
    },
    {
      type: 'category',
      label: 'Classes & Subjects',
      items: ['classes/classes'],
    },
    {
      type: 'category',
      label: 'Administration',
      items: ['admin/admin'],
    },
  ],
};

module.exports = sidebars;
