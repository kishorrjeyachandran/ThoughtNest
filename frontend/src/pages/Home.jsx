import { useEffect, useState } from "react";

import { Link } from "react-router-dom";

import Layout from "../components/Layout";

import getAvatar from "../utils/avatar";

import API from "../api/axios";

import calculateReadingTime from "../utils/readingTime";

function Home() {
  const [posts, setPosts] = useState([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const { data } = await API.get("/posts");

        setPosts(data);

      } catch (error) {
        console.log(error);

      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  return (
    <Layout title="Home">

      <div className="w-full max-w-4xl mx-auto">

        {/* Hero */}
        <div>

          <div className="text-5xl md:text-7xl mb-6">
            ✍️
          </div>

          <h1 className="text-4xl md:text-5xl font-bold tracking-tight leading-tight">
            Welcome to ThoughtNest
          </h1>

          <p className="text-[#9B9B9B] text-base md:text-lg leading-8 mt-6 max-w-2xl">
            A minimal writing platform for sharing thoughts,
            ideas, and stories with a calm reading experience.
          </p>

        </div>

        {/* Divider */}
        <div className="h-px bg-[#2B2B2B] my-10 md:my-14" />

        {/* Articles */}
        <div>

          <div className="flex items-center justify-between mb-8">

            <h2 className="text-xl md:text-2xl font-semibold">
              Recent Articles
            </h2>

            <p className="text-sm text-[#9B9B9B]">
              {posts.length} posts
            </p>

          </div>

          {loading ? (

            <p className="text-[#9B9B9B]">
              Loading posts...
            </p>

          ) : posts.length === 0 ? (

            <p className="text-[#9B9B9B]">
              No posts yet.
            </p>

          ) : (

            <div className="space-y-5">

              {posts.map((post) => (

                <Link
                  key={post._id}
                  to={`/post/${post._id}`}
                >

                  <article
                    className="
                      group
                      rounded-2xl
                      overflow-hidden
                      border border-[#2B2B2B]
                      hover:bg-[#222222]
                      transition
                      cursor-pointer
                    "
                  >

                    {/* Cover Image */}
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

                    {/* Content */}
                    <div className="p-4 md:p-6">

                      {/* Meta */}
                      <div className="flex items-center gap-3 text-sm text-[#707070] dark:text-[#9B9B9B]">

  <img
    src={getAvatar(post.author?.name)}
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
    {new Date(
      post.createdAt
    ).toLocaleDateString()}
  </span>

</div>

                      {/* Title */}
                      <h2 className="text-xl md:text-2xl font-semibold mt-4 leading-snug">
                        {post.title}
                      </h2>

                      {/* Content Preview */}
                      <p className="text-[#9B9B9B] mt-3 leading-7 line-clamp-3">
                        {post.content}
                      </p>

                    </div>

                  </article>

                </Link>
              ))}

            </div>

          )}

        </div>

      </div>

    </Layout>
  );
}

export default Home;