defmodule NearsoftconWeb.RoomChannel do
  use Phoenix.Channel
  require Logger

  def join("room:joined", message, socket) do
    user_id = socket.assigns.user_id
    send(self(), {:after_join, user_id})
    {:ok, socket}
  end

  def handle_info({:after_join, user_id}, socket) do
    broadcast! socket, "user:entered", %{user_id: user_id}
    push socket, "join", %{status: "connected"}
    {:noreply, socket}
  end

  def terminate(reason, socket) do
    broadcast! socket, "user:leave", %{user_id: socket.assigns.user_id}
    :ok
  end

end
