import * as default_config from './default/default-config';
  export const Config={
  DEFAULT_CONFIG:{
    apiEndpoint:'/api', //'https://m.showbahis103.com/apiv3',
    prodApiEndpoint: '/api',
    frontEndUrl: 'https://totobo1.com/',
    appName: 'Totobo Online Shop',
    fevicon: '/assets/default/favicon.ico',
    header: {
      brand: {
        logo: '/assets/default/logo.svg',
        logoPng:
          'https://res.cloudinary.com/aviabird/image/upload/h_250/v1539065176/aviacommerce/logo/main.png',
        name: 'Totobo',
        height: '40',
        width: '135'
      },
      searchPlaceholder: 'Search',
      showGithubRibon: false
    },
    showDummyCardInfo: true,
    // Following are the test crediantials for payubiz payment gateway.
    payuBizSalt: 'eCwWELxi',
    payuBizKey: 'gtKFFx',
    freeShippingAmount: 50,
    currency_symbol: '$', // USD $
    PaymentMethodCod: 'COD',
    PaymentMethodPayubiz: 'Payubiz',
    defaultPaymentMethod: 'Payubiz',
    reviewsDisplayLimit: 5,
  
    ...default_config.DEFAULT_META_DATA,
    ...default_config.DEFAULT_APP_DATA
  }
}
