'use strict';

module.exports = [
  {
    method: 'GET',
    path: '/export/:model',
    handler: 'export.exportToExcel',
    config: {
      policies: [
        'admin::isAuthenticatedAdmin',
        {
          name: 'plugin::content-manager.hasPermissions',
          config: { actions: ['plugin::content-manager.explorer.read'] },
        },
      ],
    },
  },
];
