import {
  useState,
} from "react";

import Layout from "../components/Layout";

import {
  useAuth,
} from "../context/AuthContext";

function Settings() {
  const { user } = useAuth();

  const [name, setName] =
    useState(
      user?.name || ""
    );

  const [bio, setBio] =
    useState(
      localStorage.getItem(
        "user-bio"
      ) || ""
    );

  const [avatar, setAvatar] =
    useState(
      localStorage.getItem(
        "user-avatar"
      ) || ""
    );

  const handleSave = () => {
    localStorage.setItem(
      "user-bio",
      bio
    );

    localStorage.setItem(
      "user-avatar",
      avatar
    );

    alert(
      "Profile updated"
    );
  };

  return (
    <Layout title="Settings">

      <div className="w-full max-w-3xl mx-auto">

        {/* Header */}
        <div className="mb-12">

          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
            Settings
          </h1>

          <p className="text-[#707070] dark:text-[#9B9B9B] mt-4">
            Customize your profile.
          </p>

        </div>

        {/* Avatar */}
        <div className="mb-10">

          {avatar && (

            <img
              src={avatar}
              alt="avatar"
              className="
                w-24 h-24 rounded-full
                object-cover
                mb-5
              "
            />

          )}

          <input
            type="text"
            placeholder="Avatar image URL..."
            value={avatar}
            onChange={(e) =>
              setAvatar(
                e.target.value
              )
            }
            className="
              w-full h-12
              bg-[#F5F5F5]
              dark:bg-[#202020]
              border border-[#E5E5E5]
              dark:border-[#2B2B2B]
              rounded-xl
              px-4
              outline-none
              focus:border-[#3A3A3A]
            "
          />

        </div>

        {/* Name */}
        <div className="mb-8">

          <label className="text-sm text-[#707070] dark:text-[#9B9B9B]">
            Name
          </label>

          <input
            type="text"
            value={name}
            onChange={(e) =>
              setName(
                e.target.value
              )
            }
            className="
              w-full h-12 mt-2
              bg-[#F5F5F5]
              dark:bg-[#202020]
              border border-[#E5E5E5]
              dark:border-[#2B2B2B]
              rounded-xl
              px-4
              outline-none
              focus:border-[#3A3A3A]
            "
          />

        </div>

        {/* Bio */}
        <div>

          <label className="text-sm text-[#707070] dark:text-[#9B9B9B]">
            Bio
          </label>

          <textarea
            value={bio}
            onChange={(e) =>
              setBio(
                e.target.value
              )
            }
            placeholder="Tell readers about yourself..."
            className="
              w-full
              min-h-[160px]
              mt-2
              bg-[#F5F5F5]
              dark:bg-[#202020]
              border border-[#E5E5E5]
              dark:border-[#2B2B2B]
              rounded-2xl
              p-4
              outline-none
              resize-none
              focus:border-[#3A3A3A]
            "
          />

        </div>

        {/* Save */}
        <div className="flex justify-end mt-10">

          <button
            onClick={handleSave}
            className="
              h-11 px-5
              rounded-xl
              bg-black dark:bg-white
              text-white dark:text-black
              font-medium
              hover:opacity-90
              transition
            "
          >
            Save Changes
          </button>

        </div>

      </div>

    </Layout>
  );
}

export default Settings;