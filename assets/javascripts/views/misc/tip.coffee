import '@/javascripts/views/misc/notif.coffee'

class app.views.Tip extends app.views.Notif
  @className: '_notif _notif-tip'

  @defautOptions:
    autoHide: false

  render: ->
    @html @tmpl("tip#{@type}")
    return
