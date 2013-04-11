exports.CONFIG = {
  DBS: {
    main: {
      options: {
          database: 'tmtv',
          username: '',
          password: ''
      },
      uris: [
          '127.0.0.1:27017'
      ],
      url: process.env.MONGOHQ_URL
    }
  }
};
