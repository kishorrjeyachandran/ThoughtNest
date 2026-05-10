export const getNotifications =
  () => {
    return (
      JSON.parse(
        localStorage.getItem(
          "notifications"
        )
      ) || []
    );
  };

export const addNotification =
  (notification) => {
    const notifications =
      getNotifications();

    notifications.unshift({
      id: Date.now(),
      createdAt:
        new Date().toISOString(),
      ...notification,
    });

    localStorage.setItem(
      "notifications",
      JSON.stringify(
        notifications.slice(0, 50)
      )
    );
  };