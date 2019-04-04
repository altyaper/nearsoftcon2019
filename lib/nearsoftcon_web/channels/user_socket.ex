defmodule NearsoftconWeb.UserSocket do
  use Phoenix.Socket

  ## Channels
  channel "room:*", NearsoftconWeb.RoomChannel

  def connect(params, socket, _connect_info) do
    {:ok, assign(socket, :user_id, params["user_id"])}
  end

  def id(socket), do: socket.assigns.user_id
end
