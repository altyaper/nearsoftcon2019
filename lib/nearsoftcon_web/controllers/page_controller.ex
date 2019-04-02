defmodule NearsoftconWeb.PageController do
  use NearsoftconWeb, :controller

  def index(conn, _params) do
    render(conn, "index.html")
  end
end
