const data = [
  {
    id: 'started',
    icon: 'menu_started',
    label: 'Getting Started',
    to: '/app/getting-started',
  },
  {
    id: 'account',
    icon: 'menu_account',
    label: 'Accounts',
    to: '/pages/accounts',
    subs: [
      {
        id: 'account-demo',
        label: 'Open Demo Account',
        to: '/error',
      },
      {
        id: 'account-live',
        label: 'Open Live Account',
        to: '/error',
      }
    ]
  },
  {
    id: 'fund',
    icon: 'menu_funds',
    label: 'Funds',
    to: '/pages/funds',
    subs: [
      {
        id: 'funds-deposit',
        label: 'Deposit Funds',
        to: '/pages/funds/deposit',
      },
      {
        id: 'funds-withdrawal',
        label: 'Withdrawal Funds',
        to: '/error',
      },
      {
        id: 'funds-transfer',
        label: 'Transfer Funds',
        to: '/error',
      },
      {
        id: 'funds-transactions',
        label: 'Transactions History',
        to: '/error',
      },
      {
        id: 'funds-payment',
        label: 'Payment Details',
        to: '/error',
      }
    ]
  },
  {
    id: 'profile',
    icon: 'menu_profile',
    label: 'Profile',
    to: '/pages/profile',
    subs: [
      {
        id: 'profile-update',
        label: 'Update Profile',
        to: '/error',
      },
      {
        id: 'profile-document',
        label: 'Upload Document',
        to: '/error',
      },
      {
        id: 'profile-messages',
        label: 'Messages',
        to: '/error',
      },
      {
        id: 'profile-help',
        label: 'Help Desk',
        to: '/error',
      },
      {
        id: 'profile-authentication',
        label: 'Two-Factor Authentication',
        to: '/error',
      },
      {
        id: 'profile-onboarding',
        label: 'Onboarding Questionnaire',
        to: '/error',
      },
      {
        id: 'profile-tax',
        label: 'Tax Form',
        to: '/error',
      }
    ]
  },
  {
    id: 'platform',
    icon: 'menu_platform',
    label: 'Platforms',
    to: '/pages/platforms',
    subs: [
      {
        id: 'download-mt4',
        label: 'MT4 Platform',
        to: '/error',
      },
      {
        id: 'download-mt5',
        label: 'MT5 Platform',
        to: '/error',
      },
      {
        id: 'download-web',
        label: 'Summit WebTrader',
        to: '/error',
      }
    ]
  },
  {
    id: 'economic',
    icon: 'menu_economic',
    label: 'Economic Calendar',
    to: '/error',
  }
];
export default data;
