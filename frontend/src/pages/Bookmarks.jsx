import {
  useEffect,
  useState,
} from "react";

import {
  Link,
} from "react-router-dom";

import Layout from "../components/Layout";

import API from "../api/axios";

import getAvatar from "../utils/avatar";

import calculateReadingTime from "../utils/readingTime";

function Bookmarks() {
  const [posts, setPosts] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    fetchBookmarks();
  }, []);

  const fetchBookmarks =
    async () => {
      try {
        const bookmarkedIds =
          JSON.parse(
            localStorage.getItem(
              "bookmarkedPosts"
            )
          ) || [];

        const { data } =
          await API.get("/posts");

        const filtered =
          data.filter((post) =>
            bookmarkedIds.includes(
              post._id
            )
          );

        setPosts(filtered);

      } catch (error) {
        console.log(error);

      } finally {
        setLoading(false);
      }
    };

  return (
    <Layout title="Bookmarks">

      <div className="w-full max-w-4xl mx-auto">

        {/* Header */}
        <div className="mb-12">

          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
            Saved Articles
          </h1>

          <p className="text-[#707070] dark:text-[#9B9B9B] mt-4">
            Your personal reading collection.
          </p>

        </div>

        {/* Content */}
        {loading ? (

          <p className="text-[#707070] dark:text-[#9B9B9B]">
            Loading bookmarks...
          </p>

        ) : posts.length === 0 ? (

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
              No bookmarked posts yet.
            </p>

          </div>

        ) : (

          <div className="space-y-5">

            {posts.map((post) => (

              <Link
                key={post._id}
                to={`/post/${post._id}`}
              >

                <article
                  className="
                    rounded-2xl
                    overflow-hidden
                    border border-[#E5E5E5]
                    dark:border-[#2B2B2B]
                    hover:bg-[#F7F7F7]
                    dark:hover:bg-[#222222]
                    transition
                  "
                >

                  {/* Cover */}
                  {post.coverImage && (

                    <img
                      src={post.coverImage}
                      alt="cover"
                      className="
                        w-full
                        h-[220px]
                        md:h-[280px]
                        object-cover
                      "
                    />

                  )}

                  <div className="p-5 md:p-6">

                    {/* Meta */}
                    <div
                      className="
                        flex items-center gap-3
                        text-sm
                        text-[#707070]
                        dark:text-[#9B9B9B]
                      "
                    >

                      <img
                        src={getAvatar(
                          post.author?.name
                        )}
                        alt="avatar"
                        className="
                          w-8 h-8 rounded-full
                          object-cover
                        "
                      />

                      <span>
                        {post.author?.name}
                      </span>

                      <div className="w-1 h-1 rounded-full bg-[#5A5A5A]" />

                      <span>
                        {calculateReadingTime(
                          post.content
                        )}
                      </span>

                    </div>

                    {/* Title */}
                    <h2
                      className="
                        text-2xl font-semibold
                        mt-5
                        leading-snug
                      "
                    >
                      {post.title}
                    </h2>

                    {/* Preview */}
                    <p
                      className="
                        text-[#707070]
                        dark:text-[#9B9B9B]
                        mt-3
                        leading-7
                        line-clamp-3
                      "
                    >
                      {post.content}
                    </p>

                  </div>

                </article>

              </Link>
            ))}

          </div>

        )}

      </div>

    </Layout>
  );
}

export default Bookmarks;