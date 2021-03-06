import '@/javascripts/views/misc/notif.coffee'

class app.views.News extends app.views.Notif
  @className += ' _notif-news'

  @defautOptions:
    autoHide: 30000

  init: ->
    @unreadNews = @getUnreadNews()
    @show() if @unreadNews.length
    @markAllAsRead()
    return

  render: ->
    @html app.templates.notifNews(@unreadNews)
    return

  getUnreadNews: ->
    return [] unless time = @getLastReadTime()

    for news in app.news
      break if new Date(news[0]).getTime() <= time
      news

  getLastNewsTime: ->
    if app.news.length
      new Date(app.news[0][0]).getTime()

  getLastReadTime: ->
    app.settings.get 'news'

  markAllAsRead: ->
    app.settings.set 'news', @getLastNewsTime()
    return
