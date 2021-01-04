# vendor
import '@/javascripts/vendor/index';

# lib
import '@/javascripts/lib/index'

# app
import '@/javascripts/app/index'

# collection
import '@/javascripts/collections/index'

# models
import '@/javascripts/models/index'

# views
import '@/javascripts/views/index'

import '@/javascripts/templates/index'


init = ->
  document.removeEventListener 'DOMContentLoaded', init, false

  if document.body
    app.init()
  else
    setTimeout(init, 42)

document.addEventListener 'DOMContentLoaded', init, false
