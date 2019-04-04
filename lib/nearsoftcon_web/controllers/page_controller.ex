defmodule NearsoftconWeb.PageController do
  use NearsoftconWeb, :controller

  def index(conn, _params) do
    render(conn, "index.html")
  end

  def viewer(conn, _params) do
    render(conn, "viewer.html")
  end
end
