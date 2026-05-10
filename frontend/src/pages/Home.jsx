import {
  useEffect,
  useState,
} from "react";

import {
  Link,
} from "react-router-dom";

import {
  Code2,
  Globe,
  Sparkles,
  ArrowRight,
  ExternalLink,
} from "lucide-react";

import Layout from "../components/Layout";

import API from "../api/axios";

function Home() {
  const [posts, setPosts] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const { data } =
          await API.get("/posts");

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

      <div className="w-full max-w-6xl mx-auto">

        {/* Hero */}
        <section
          className="
            relative
            overflow-hidden
            rounded-[32px]
            border border-[#E5E5E5]
            dark:border-[#2B2B2B]
            bg-gradient-to-b
            from-[#FAFAFA]
            to-white
            dark:from-[#202020]
            dark:to-[#191919]
            p-8 md:p-14
          "
        >

          {/* Glow */}
          <div
            className="
              absolute
              top-[-120px]
              right-[-120px]
              w-[280px]
              h-[280px]
              rounded-full
              bg-black/5
              dark:bg-white/5
              blur-3xl
            "
          />

          <div className="relative z-10 max-w-3xl">

            <div
              className="
                inline-flex
                items-center
                gap-2
                px-4 py-2
                rounded-full
                border border-[#E5E5E5]
                dark:border-[#2B2B2B]
                bg-white/80
                dark:bg-[#202020]/80
                text-sm
                mb-6
              "
            >

              <Sparkles size={15} />

              <span>
                AI-powered writing platform
              </span>

            </div>

            <div className="text-5xl md:text-7xl mb-6">
              ✍️
            </div>

            <h1
              className="
                text-4xl md:text-6xl
                font-bold
                tracking-tight
                leading-tight
              "
            >
              Welcome to ThoughtNest
            </h1>

            <p
              className="
                text-[#707070]
                dark:text-[#9B9B9B]
                text-lg
                md:text-xl
                leading-9
                mt-8
                max-w-2xl
              "
            >
              A modern publishing platform for developers,
              creators, and storytellers to share ideas with
              a clean and focused writing experience.
            </p>

            {/* CTA */}
            <div className="flex flex-wrap gap-4 mt-10">

              <Link
                to="/create"
                className="
                  h-12 px-6 rounded-2xl
                  bg-black dark:bg-white
                  text-white dark:text-black
                  flex items-center gap-2
                  font-medium
                  hover:scale-[1.02]
                  transition
                "
              >

                <span>
                  Start Writing
                </span>

                <ArrowRight size={18} />

              </Link>

              <Link
                to="/articles"
                className="
                  h-12 px-6 rounded-2xl
                  border border-[#E5E5E5]
                  dark:border-[#2B2B2B]
                  hover:bg-[#F5F5F5]
                  dark:hover:bg-[#222222]
                  flex items-center
                  font-medium
                  transition
                "
              >
                Explore Articles
              </Link>

            </div>

          </div>

        </section>

        {/* Stats */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-8">

          <div
            className="
              rounded-3xl
              border border-[#E5E5E5]
              dark:border-[#2B2B2B]
              p-7
              bg-[#FAFAFA]
              dark:bg-[#202020]
            "
          >

            <p className="text-[#707070] dark:text-[#9B9B9B] text-sm">
              Articles Published
            </p>

            <h2 className="text-4xl font-bold mt-3">
              {posts.length}
            </h2>

          </div>

          <div
            className="
              rounded-3xl
              border border-[#E5E5E5]
              dark:border-[#2B2B2B]
              p-7
              bg-[#FAFAFA]
              dark:bg-[#202020]
            "
          >

            <p className="text-[#707070] dark:text-[#9B9B9B] text-sm">
              AI Writing Assistant
            </p>

            <h2 className="text-4xl font-bold mt-3">
              Enabled
            </h2>

          </div>

          <div
            className="
              rounded-3xl
              border border-[#E5E5E5]
              dark:border-[#2B2B2B]
              p-7
              bg-[#FAFAFA]
              dark:bg-[#202020]
            "
          >

            <p className="text-[#707070] dark:text-[#9B9B9B] text-sm">
              Draft System
            </p>

            <h2 className="text-4xl font-bold mt-3">
              Active
            </h2>

          </div>

        </section>

        {/* Articles */}
        <section className="mt-20">

          <div className="flex items-center justify-between mb-10">

            <div>

              <h2 className="text-3xl font-bold tracking-tight">
                Recent Articles
              </h2>

              <p className="text-[#707070] dark:text-[#9B9B9B] mt-2">
                Fresh thoughts from the community.
              </p>

            </div>

            <p className="text-sm text-[#707070] dark:text-[#9B9B9B]">
              {posts.length} posts
            </p>

          </div>

          {loading ? (

            <p className="text-[#707070] dark:text-[#9B9B9B]">
              Loading posts...
            </p>

          ) : posts.length === 0 ? (

            <div
              className="
                border border-[#E5E5E5]
                dark:border-[#2B2B2B]
                rounded-3xl
                p-10
                text-center
              "
            >

              <p className="text-[#707070] dark:text-[#9B9B9B]">
                No posts yet.
              </p>

            </div>

          ) : (

            <div className="space-y-4">

              {posts.map((post) => (

                <Link
                  key={post._id}
                  to={`/post/${post._id}`}
                >

                  <article
                    className="
                      group
                      border border-[#E5E5E5]
                      dark:border-[#2B2B2B]
                      rounded-3xl
                      p-6 md:p-8
                      hover:bg-[#F7F7F7]
                      dark:hover:bg-[#222222]
                      transition
                    "
                  >

                    {/* Meta */}
                    <div
                      className="
                        flex flex-wrap
                        items-center gap-3
                        text-sm
                        text-[#707070]
                        dark:text-[#9B9B9B]
                      "
                    >

                      <span>
                        {post.author?.name}
                      </span>

                      <div className="w-1 h-1 rounded-full bg-[#A0A0A0]" />

                      <span>
                        {new Date(
                          post.createdAt
                        ).toLocaleDateString()}
                      </span>

                    </div>

                    {/* Title */}
                    <h2
                      className="
                        text-2xl md:text-3xl
                        font-semibold
                        mt-5
                        leading-tight
                        group-hover:translate-x-1
                        transition
                      "
                    >
                      {post.title}
                    </h2>

                    {/* Content */}
                    <p
                      className="
                        text-[#707070]
                        dark:text-[#9B9B9B]
                        mt-4
                        leading-8
                        line-clamp-2
                      "
                    >
                      {post.content
                        ?.replace(
                          /<[^>]+>/g,
                          ""
                        )}
                    </p>

                  </article>

                </Link>
              ))}

            </div>

          )}

        </section>

        {/* Developer Section */}
        <section
          className="
            mt-24
            rounded-[32px]
            border border-[#E5E5E5]
            dark:border-[#2B2B2B]
            p-8 md:p-12
            bg-[#FAFAFA]
            dark:bg-[#202020]
          "
        >

          <div className="grid md:grid-cols-2 gap-10 items-center">

           {/* Left */}
<div>

  {/* Profile */}
  <div className="flex items-center gap-5 mb-8">

    <img
      src="/pfp.jpeg"
      alt="Developer"
      className="
        w-24 h-24
        rounded-3xl
        object-cover
        border border-[#E5E5E5]
        dark:border-[#2B2B2B]
        shadow-lg
      "
    />

    <div>

      <p className="text-sm text-[#707070] dark:text-[#9B9B9B] uppercase tracking-[0.2em]">
        Developer
      </p>

      <h2 className="text-3xl md:text-4xl font-bold tracking-tight mt-2">
        Kishor Jeyachandran
      </h2>

    </div>

  </div>

  <p className="text-[#707070] dark:text-[#9B9B9B] leading-8 text-lg">
    Full-stack developer focused on building modern,
    scalable, and visually polished web applications
    using React, Node.js, MongoDB, and AI integrations.
  </p>

</div>

            {/* Right */}
            <div
              className="
                rounded-3xl
                border border-[#E5E5E5]
                dark:border-[#2B2B2B]
                p-8
                bg-white
                dark:bg-[#191919]
              "
            >

              <div className="space-y-5">

                <div>
                  <p className="text-sm text-[#707070] dark:text-[#9B9B9B]">
                    Stack
                  </p>

                  <h3 className="text-xl font-semibold mt-2">
                    MERN • Tailwind • AI • Vite
                  </h3>
                </div>

                <div>
                  <p className="text-sm text-[#707070] dark:text-[#9B9B9B]">
                    Focus
                  </p>

                  <h3 className="text-xl font-semibold mt-2">
                    Full-stack SaaS & UI Engineering
                  </h3>
                </div>

              </div>

            </div>

          </div>

        </section>

        {/* Social Links */}
        <div
  className="
    fixed
    bottom-6
    right-6
    flex items-center gap-3
    z-50
  "
>

  <a
    href="https://github.com/kishorrjeyachandran"
    target="_blank"
    rel="noreferrer"
    className="
      w-11 h-11 rounded-2xl
      border border-[#E5E5E5]
      dark:border-[#2B2B2B]
      bg-white/90
      dark:bg-[#202020]/90
      backdrop-blur-md
      flex items-center justify-center
      hover:scale-105
      transition
    "
  >
    <Code2 size={19} />
  </a>

  <a
    href="https://linkedin.com"
    target="_blank"
    rel="noreferrer"
    className="
      w-11 h-11 rounded-2xl
      border border-[#E5E5E5]
      dark:border-[#2B2B2B]
      bg-white/90
      dark:bg-[#202020]/90
      backdrop-blur-md
      flex items-center justify-center
      hover:scale-105
      transition
    "
  >
    <ExternalLink size={19} />
  </a>

  <a
    href="https://portfolio-rose-delta-62.vercel.app/"
    target="_blank"
    rel="noreferrer"
    className="
      w-11 h-11 rounded-2xl
      border border-[#E5E5E5]
      dark:border-[#2B2B2B]
      bg-white/90
      dark:bg-[#202020]/90
      backdrop-blur-md
      flex items-center justify-center
      hover:scale-105
      transition
    "
  >
    <Globe size={19} />
  </a>

</div>

      </div>

    </Layout>
  );
}

export default Home;