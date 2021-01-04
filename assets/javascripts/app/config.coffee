app.config =
  db_filename: 'db.json'
  default_docs: APP.default_docs 
  docs_origin: APP.docs_origin
  env: process.env.NODE_ENV
  history_cache_size: 10
  index_filename: 'index.json'
  index_path: '/'
  max_results: 50
  production_host: 'devdocs.io'
  search_param: 'q'
  sentry_dsn: APP.sentry_dsn,
  version: APP.version
  release: APP.release_time
  mathml_stylesheet: APP.cdn_origin + '/mathml.css'
  service_worker_path: '/service-worker.js'
  service_worker_enabled: process.env.NODE_ENV == 'production'
