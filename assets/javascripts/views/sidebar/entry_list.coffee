import '@/javascripts/views/list/paginated_list.coffee'

class app.views.EntryList extends app.views.PaginatedList
  @tagName: 'div'
  @className: '_list _list-sub'

  constructor: (@entries) -> super

  init: ->
    @renderPaginated()
    @activate()
    return

  render: (entries) ->
    @tmpl 'sidebarEntry', entries
