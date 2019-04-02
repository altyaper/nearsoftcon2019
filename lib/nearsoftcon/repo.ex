defmodule Nearsoftcon.Repo do
  use Ecto.Repo,
    otp_app: :nearsoftcon,
    adapter: Ecto.Adapters.Postgres
end
