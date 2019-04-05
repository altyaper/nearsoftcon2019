defmodule NearsoftconWeb.Router do
  use NearsoftconWeb, :router

  @salt Application.get_env(:nearsoftcon, :circle_salt)
  @secret_link Application.get_env(:nearsoftcon, :secret_link)

  pipeline :browser do
    plug :accepts, ["html"]
    plug :fetch_session
    plug :fetch_flash
    plug :protect_from_forgery
    plug :put_secure_browser_headers
    plug :put_user_token
  end

  defp put_user_token(conn, _) do
    random_string = NearsoftCon.RandomToken.randomizer(5)
    token = Phoenix.Token.sign(conn, @salt, random_string)
    assign(conn, :user_token, token)
  end

  pipeline :api do
    plug :accepts, ["json"]
  end

  scope "/", NearsoftconWeb do
    pipe_through :browser
    get "/"<>@secret_link, PageController, :index
    get "/viewer", PageController, :viewer
  end

  # Other scopes may use custom stacks.
  # scope "/api", NearsoftconWeb do
  #   pipe_through :api
  # end
end
