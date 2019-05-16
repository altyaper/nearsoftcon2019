defmodule NearsoftconWeb.PageController do
  use NearsoftconWeb, :controller

  @demo_link Application.get_env(:nearsoftcon, :demo_link)

  def index(conn, _params) do
    render(conn, "index.html", %{demo_link: @demo_link})
  end

  def viewer(conn, _params) do
    render(conn, "viewer.html")
  end
end
