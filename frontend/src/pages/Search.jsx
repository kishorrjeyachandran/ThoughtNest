import { useEffect, useState } from "react";

import { Link, useSearchParams } from "react-router-dom";

import Layout from "../components/Layout";

import API from "../api/axios";

function Search() {
  const [searchParams] = useSearchParams();

  const query = searchParams.get("q") || "";

  const [posts, setPosts] = useState([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchResults();
  }, [query]);

  const fetchResults = async () => {
    try {
      setLoading(true);

      const { data } = await API.get(
        `/posts/search?search=${query}`
      );

      setPosts(data);

    } catch (error) {
      console.log(error);

    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout title="Search">

      <div className="max-w-4xl mx-auto">

        <h1 className="text-4xl font-bold tracking-tight">
          Search Results
        </h1>

        <p className="text-[#9B9B9B] mt-4">
          Results for: "{query}"
        </p>

        <div className="mt-12">

          {loading ? (

            <p className="text-[#9B9B9B]">
              Searching...
            </p>

          ) : posts.length === 0 ? (

            <p className="text-[#9B9B9B]">
              No articles found.
            </p>

          ) : (

            <div className="space-y-3">

              {posts.map((post) => (

                <Link
                  key={post._id}
                  to={`/post/${post._id}`}
                >

                  <article
                    className="
                      p-5 rounded-2xl
                      border border-[#2B2B2B]
                      hover:bg-[#222222]
                      transition
                    "
                  >

                    <p className="text-sm text-[#9B9B9B]">
                      {post.author?.name}
                    </p>

                    <h2 className="text-2xl font-semibold mt-3">
                      {post.title}
                    </h2>

                    <p className="text-[#9B9B9B] mt-3 leading-7 line-clamp-2">
                      {post.content}
                    </p>

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

export default Search;