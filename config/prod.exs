use Mix.Config

config :nearsoftcon, NearsoftconWeb.Endpoint,
  http: [:inet6, port: System.get_env("PORT") || 4000],
  url: [host: "ivory-dramatic-steed.gigalixirapp.com", port: 80],
  cache_static_manifest: "priv/static/cache_manifest.json",
  server: true,
  secret_key_base: "${SECRET_KEY_BASE}"

config :nearsoftcon, Nearsoftcon.Repo,
  adapter: Ecto.Adapters.Posgres,
  url: "${DATABASE_URL}",
  database: "",
  ssl: true,
  pool_size: 1

config :logger, level: :info
