# This file is responsible for configuring your application
# and its dependencies with the aid of the Mix.Config module.
#
# This configuration file is loaded before any dependency and
# is restricted to this project.

# General application configuration
use Mix.Config

config :nearsoftcon,
  ecto_repos: [Nearsoftcon.Repo],
  circle_salt: System.get_env("circle_salt"),
  secret_link: System.get_env("secret_admin"),
  demo_link: "bit.ly/nearsoftcon2019",
  ngrok: "http://192.168.1.65:4000/3uzeb1OCXXcZdUDne0aGgicKc5qa5NW6byYN67j20tBAoAHJPJcAlhOwvYGxjrCI8fDWKyGVExGEqtfnq3fJuxYKC8XvmMJyeat1QOt3L8d3hCZQrt0QkyIjjzipcWp9uDFn3ixxRHHT95TXdLMJClDjBTc7Pvlen0jB1KoX4wKgrb3yPbclGy2BG69MQC1m1eBEEPe9#/"

# Configures the endpoint
config :nearsoftcon, NearsoftconWeb.Endpoint,
  url: [host: "localhost"],
  secret_key_base: "24YBxcFMdtHPsilYrOd2uwD43YeOGDMvZ+rbF1DDSiAeKNyRCTWw3Y/DLg0b39+0",
  render_errors: [view: NearsoftconWeb.ErrorView, accepts: ~w(html json)],
  pubsub: [name: Nearsoftcon.PubSub, adapter: Phoenix.PubSub.PG2]

# Configures Elixir's Logger
config :logger, :console,
  format: "$time $metadata[$level] $message\n",
  metadata: [:request_id]

# Use Jason for JSON parsing in Phoenix
config :phoenix, :json_library, Jason

# Import environment specific config. This must remain at the bottom
# of this file so it overrides the configuration defined above.
import_config "#{Mix.env()}.exs"
