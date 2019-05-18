defmodule NearsoftconWeb.PageController do
  use NearsoftconWeb, :controller

  @demo_link Application.get_env(:nearsoftcon, :demo_link)
  @environment Mix.env()

  def index(conn, _params) do
    render(conn, "index.html", %{demo_link: @demo_link, environment: @environment})
  end

  def viewer(conn, _params) do
    render(conn, "viewer.html", %{demo_link: @demo_link, environment: @environment})
  end
end
