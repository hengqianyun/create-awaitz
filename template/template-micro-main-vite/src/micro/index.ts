import microApp from '@micro-zoe/micro-app'

microApp.start({
  iframe: true,
  inline: true,
  'disable-memory-router': true,
  plugins: {
    // modules: {
    //   'child-app-1': [
    //     {
    //       loader(code) {
    //         if (process.env.NODE_ENV === 'de') {
    //           code = code.replace(
    //             /(from|import)(\s*['"])(\/child-app-1\/)/g,
    //             (all) => {
    //               return all.replace(
    //                 '/child-app-1/',
    //                 'http://localhost:4001/child-app-1/'
    //               )
    //             }
    //           )
    //         }
    //         return code
    //       },
    //     },
    //   ],
    // },
  },
})
