import {
  useEffect,
  useState,
} from "react";

import Layout from "../components/Layout";

import {
  Bell,
  Heart,
  MessageCircle,
  UserPlus,
} from "lucide-react";

import {
  getNotifications,
} from "../utils/notifications";

function Notifications() {
  const [notifications, setNotifications] =
    useState([]);

  useEffect(() => {
    setNotifications(
      getNotifications()
    );
  }, []);

  const getIcon = (type) => {
    switch (type) {
      case "like":
        return (
          <Heart
            size={18}
            className="text-red-400"
          />
        );

      case "comment":
        return (
          <MessageCircle
            size={18}
            className="text-blue-400"
          />
        );

      case "follow":
        return (
          <UserPlus
            size={18}
            className="text-green-400"
          />
        );

      default:
        return (
          <Bell size={18} />
        );
    }
  };

  return (
    <Layout title="Notifications">

      <div className="w-full max-w-3xl mx-auto">

        {/* Header */}
        <div className="mb-12">

          <div className="flex items-center gap-3">

            <Bell size={36} />

            <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
              Notifications
            </h1>

          </div>

          <p className="text-[#707070] dark:text-[#9B9B9B] mt-4">
            Recent activity on your account.
          </p>

        </div>

        {/* Content */}
        {notifications.length === 0 ? (

          <div
            className="
              border border-[#E5E5E5]
              dark:border-[#2B2B2B]
              rounded-2xl
              p-10
              text-center
            "
          >

            <p className="text-[#707070] dark:text-[#9B9B9B]">
              No notifications yet.
            </p>

          </div>

        ) : (

          <div className="space-y-4">

            {notifications.map(
              (notification) => (

                <div
                  key={
                    notification.id
                  }
                  className="
                    border border-[#E5E5E5]
                    dark:border-[#2B2B2B]
                    rounded-2xl
                    p-5
                    flex items-start gap-4
                  "
                >

                  <div
                    className="
                      w-10 h-10 rounded-full
                      bg-[#F5F5F5]
                      dark:bg-[#222222]
                      flex items-center justify-center
                      shrink-0
                    "
                  >

                    {getIcon(
                      notification.type
                    )}

                  </div>

                  <div>

                    <p className="leading-7">
                      {
                        notification.message
                      }
                    </p>

                    <p
                      className="
                        text-sm
                        text-[#707070]
                        dark:text-[#9B9B9B]
                        mt-2
                      "
                    >
                      {new Date(
                        notification.createdAt
                      ).toLocaleString()}
                    </p>

                  </div>

                </div>
              )
            )}

          </div>

        )}

      </div>

    </Layout>
  );
}

export default Notifications;