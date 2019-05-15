defmodule NearsoftconWeb.RoomChannel do
  use Phoenix.Channel
  require Logger

  def join("room:joined", message, socket) do
    user_id = socket.assigns.user_id
    :timer.send_interval(5000, :ping)
    send(self(), {:after_join, user_id})
    {:ok, socket}
  end

  def handle_info(:ping, socket) do
    push socket, "new:ping", %{user: "SYSTEM", body: "ping"}
    {:noreply, socket}
  end

  def handle_in("change:slide", slide, socket) do
    slide = slide["slide"]["indexh"]
    broadcast! socket, "change:slide", %{slide: slide}
    {:noreply, socket}
  end

  def handle_in("visibility:change", visibility, socket) do
    user_id = socket.assigns.user_id
    broadcast! socket, "visibility:change", %{visibility: visibility, user_id: user_id}
    {:noreply, socket}
  end

  def handle_in("api:sound", _message, socket) do
    broadcast! socket, "api:sound", %{}
    {:noreply, socket}
  end

  def handle_in("ppt:default", _message, socket) do
    broadcast! socket, "ppt:default", %{}
    {:noreply, socket}
  end

  def handle_in("battery:api", battery, socket) do
    user_id = socket.assigns.user_id
    broadcast! socket, "battery:api", %{battery: battery, user_id: user_id}
    {:noreply, socket}
  end

  def handle_in("location:api", position, socket) do
    user_id = socket.assigns.user_id
    broadcast! socket, "location:api", %{position: position, user_id: user_id}
    {:noreply, socket}
  end

  def handle_in("audiovideo:api", audiovideo, socket) do
    user_id = socket.assigns.user_id
    broadcast! socket, "audiovideo:api", %{audiovideo: audiovideo, user_id: user_id}
    {:noreply, socket}
  end

  def handle_in("orientation:api", orientation, socket) do
    user_id = socket.assigns.user_id
    broadcast! socket, "orientation:api", %{orientation: orientation, user_id: user_id}
    {:noreply, socket}
  end

  def handle_in("ambient:api", ambient, socket) do
    user_id = socket.assigns.user_id
    broadcast! socket, "ambient:api", %{ambient: ambient, user_id: user_id}
    {:noreply, socket}
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
