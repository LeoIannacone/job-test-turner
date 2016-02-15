import express from 'express'
import path from 'path'
import logger from 'morgan'
import favicon from 'serve-favicon'
import autoprefixer from 'express-autoprefixer'
import ReactViews from 'express-react-views'
import less from 'less-middleware'

import routes from './routes'
import config from './config.json'

const app = express()

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'js')
app.engine('js', ReactViews.createEngine())

app.use(logger('dev'))

// Auto prefix CSS
app.use(less(path.join(__dirname, 'public')))
app.use(autoprefixer({browsers: config.supported_browsers, cascade: false}))
app.use(express.static(path.join(__dirname, 'public')))
app.use(favicon(path.join(__dirname, '/public/favicon.ico')))

app.use('/', routes)

// catch 404 and forward to error handler
app.use((req, res, next) => {
  var err = new Error('Not Found')
  err.status = 404
  next(err)
})

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use((err, req, res, next) => {
    res.status(err.status || 500)
    res.render('error', {
      message: err.message,
      error: err
    })
  })
}

// production error handler
// no stacktraces leaked to user
app.use((err, req, res, next) => {
  res.status(err.status || 500)
  res.render('error', {
    message: err.message,
    error: {}
  })
})

export default app
