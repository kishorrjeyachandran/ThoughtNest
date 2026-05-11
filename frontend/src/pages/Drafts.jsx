import {
  useEffect,
  useState,
} from "react";

import {
  Link,
} from "react-router-dom";

import Layout from "../components/Layout";

import API from "../api/axios";

import {
  useAuth,
} from "../context/AuthContext";

import {
  FilePenLine,
} from "lucide-react";

function Drafts() {

  const { user } =
    useAuth();

  const [posts, setPosts] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    fetchDrafts();
  }, []);

  // FETCH DRAFTS
  const fetchDrafts =
    async () => {

      try {

        const { data } =
          await API.get(
            "/posts/drafts",
            {
              headers: {
                Authorization:
                  `Bearer ${user.token}`,
              },
            }
          );

        setPosts(data);

      } catch (error) {

        console.log(error);

      } finally {

        setLoading(false);
      }
    };

  return (
    <Layout title="Drafts">

      <div className="w-full max-w-4xl mx-auto">

        {/* Header */}
        <div className="mb-12">

          <div className="flex items-center gap-3">

            <FilePenLine size={36} />

            <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
              Drafts
            </h1>

          </div>

          <p className="text-[#707070] dark:text-[#9B9B9B] mt-4">
            Continue writing unfinished stories.
          </p>

        </div>

        {/* Content */}
        {loading ? (

          <p className="text-[#707070] dark:text-[#9B9B9B]">
            Loading drafts...
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
              No drafts yet.
            </p>

          </div>

        ) : (

          <div className="space-y-4">

            {posts.map((post) => (

              <Link
                key={post._id}
                to={`/edit/${post._id}`}
              >

                <article
                  className="
                    border border-[#E5E5E5]
                    dark:border-[#2B2B2B]
                    rounded-2xl
                    p-5
                    hover:bg-[#F7F7F7]
                    dark:hover:bg-[#222222]
                    transition
                  "
                >

                  {/* Title */}
                  <h2 className="text-2xl font-semibold">

                    {post.title ||
                      "Untitled Draft"}

                  </h2>

                  {/* Content */}
                  <p
                    className="
                      text-[#707070]
                      dark:text-[#9B9B9B]
                      mt-3
                      line-clamp-2
                      leading-7
                    "
                  >

                    {post.content
                      ?.replace(
                        /<[^>]+>/g,
                        ""
                      )}

                  </p>

                  {/* Date */}
                  <p
                    className="
                      text-sm
                      text-[#909090]
                      dark:text-[#707070]
                      mt-4
                    "
                  >

                    Last edited • {" "}
                    {new Date(
                      post.updatedAt
                    ).toLocaleDateString()}

                  </p>

                </article>

              </Link>
            ))}

          </div>

        )}

      </div>

    </Layout>
  );
}

export default Drafts;