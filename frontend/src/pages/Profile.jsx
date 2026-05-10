import { useEffect, useState } from "react";

import { Link } from "react-router-dom";

import Layout from "../components/Layout";

import { useAuth } from "../context/AuthContext";

import API from "../api/axios";

function Profile() {
  const { user } = useAuth();

  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetchMyPosts();
  }, []);

  const fetchMyPosts = async () => {
    try {
      const { data } = await API.get(
        "/posts/my-posts",
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );

      setPosts(data);

    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout title="Profile">

      <div className="max-w-4xl mx-auto">

        {/* User Info */}
        <div className="flex items-center gap-5">

          <div className="w-20 h-20 rounded-full bg-[#2A2A2A] flex items-center justify-center text-3xl font-bold">
            {user?.name?.charAt(0)}
          </div>

          <div>

            <h1 className="text-4xl font-bold">
              {user?.name}
            </h1>

            <p className="text-[#9B9B9B] mt-2">
              {user?.email}
            </p>

          </div>

        </div>

        {/* Divider */}
        <div className="h-px bg-[#2B2B2B] my-14" />

        {/* Posts */}
        <div>

          <div className="flex items-center justify-between mb-8">

            <h2 className="text-2xl font-semibold">
              My Posts
            </h2>

            <p className="text-sm text-[#9B9B9B]">
              {posts.length} posts
            </p>

          </div>

          {posts.length === 0 ? (

            <div className="border border-[#2B2B2B] rounded-2xl p-8 text-center">

              <p className="text-[#9B9B9B]">
                You haven’t published any posts yet.
              </p>

              <Link
                to="/create"
                className="
                  inline-flex
                  mt-5
                  h-10 px-5
                  items-center
                  rounded-xl
                  bg-white text-black
                  font-medium
                "
              >
                Create Post
              </Link>

            </div>

          ) : (

            <div className="space-y-3">

              {posts.map((post) => (

                <div
                  key={post._id}
                  className="
                    p-5 rounded-2xl
                    border border-[#2B2B2B]
                    hover:bg-[#222222]
                    transition
                  "
                >

                  <Link to={`/post/${post._id}`}>

                    <h2 className="text-2xl font-semibold">
                      {post.title}
                    </h2>

                    <p className="text-[#9B9B9B] mt-3 leading-7 line-clamp-2">
                      {post.content}
                    </p>

                  </Link>

                  <div className="flex items-center gap-3 mt-6">

                    <Link
                      to={`/edit/${post._id}`}
                      className="
                        h-10 px-4
                        rounded-xl
                        border border-[#2B2B2B]
                        hover:bg-[#2A2A2A]
                        flex items-center
                        transition
                      "
                    >
                      Edit
                    </Link>

                  </div>

                </div>
              ))}

            </div>

          )}

        </div>

      </div>

    </Layout>
  );
}

export default Profile;