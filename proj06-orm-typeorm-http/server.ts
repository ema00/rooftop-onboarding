import initializeApp from './app'

initializeApp().then( (app) => {

    app.listen(3000)

}).catch(error => {
    console.log(error)

    throw error
})
