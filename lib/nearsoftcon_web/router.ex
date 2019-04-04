defmodule NearsoftconWeb.Router do
  use NearsoftconWeb, :router

  @salt Application.get_env(:nearsoftcon, :circle_salt)

  pipeline :browser do
    plug :accepts, ["html"]
    plug :fetch_session
    plug :fetch_flash
    plug :protect_from_forgery
    plug :put_secure_browser_headers
    plug :put_user_token
  end

  defp put_user_token(conn, _) do
    random_string = randomizer(5)
    IO.inspect("Esto es mi salt")
    IO.inspect(@salt)
    token = Phoenix.Token.sign(conn, @salt, random_string)
    assign(conn, :user_token, token)
  end

  def randomizer(length, type \\ :all) do
    alphabets = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
    numbers = "0123456789"

    lists =
      cond do
        type == :alpha -> alphabets <> String.downcase(alphabets)
        type == :numeric -> numbers
        type == :upcase -> alphabets
        type == :downcase -> String.downcase(alphabets)
        true -> alphabets <> String.downcase(alphabets) <> numbers
      end
      |> String.split("", trim: true)

    do_randomizer(length, lists)
  end

  @doc false
  defp get_range(length) when length > 1, do: (1..length)
  defp get_range(length), do: [1]

  @doc false
  defp do_randomizer(length, lists) do
    get_range(length)
    |> Enum.reduce([], fn(_, acc) -> [Enum.random(lists) | acc] end)
    |> Enum.join("")
  end

  pipeline :api do
    plug :accepts, ["json"]
  end

  scope "/", NearsoftconWeb do
    pipe_through :browser

    get "/", PageController, :index
    get "/viewer", PageController, :viewer
  end

  # Other scopes may use custom stacks.
  # scope "/api", NearsoftconWeb do
  #   pipe_through :api
  # end
end
