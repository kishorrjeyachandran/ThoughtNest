import { useEffect, useState } from "react";

import {
  Link,
  useNavigate,
  useParams,
} from "react-router-dom";



import {
  Heart,
  Bookmark,
  UserPlus,
  UserCheck,
} from "lucide-react";

import Layout from "../components/Layout";

import API from "../api/axios";

import { useAuth } from "../context/AuthContext";

import calculateReadingTime from "../utils/readingTime";

import getAvatar from "../utils/avatar";

function PostDetails() {
  const { id } = useParams();

  const navigate = useNavigate();

  const { user } = useAuth();

  const [post, setPost] =
    useState(null);

  const [comments, setComments] =
    useState([]);

  const [text, setText] =
    useState("");

  const [liked, setLiked] =
    useState(false);

  const [bookmarked, setBookmarked] =
    useState(false);

  const [following, setFollowing] =
    useState(false);

  const [loading, setLoading] =
    useState(true);

  // LOAD LIKE + BOOKMARK
  useEffect(() => {
    const likedPosts =
      JSON.parse(
        localStorage.getItem(
          "likedPosts"
        )
      ) || [];

    const bookmarkedPosts =
      JSON.parse(
        localStorage.getItem(
          "bookmarkedPosts"
        )
      ) || [];

    setLiked(
      likedPosts.includes(id)
    );

    setBookmarked(
      bookmarkedPosts.includes(id)
    );
  }, [id]);

  // FOLLOW STATE
  useEffect(() => {
    if (!post?.author?._id) return;

    const followedAuthors =
      JSON.parse(
        localStorage.getItem(
          "followedAuthors"
        )
      ) || [];

    setFollowing(
      followedAuthors.includes(
        post.author._id
      )
    );
  }, [post]);

  // READING HISTORY
  useEffect(() => {
    if (!post?._id) return;

    let history =
      JSON.parse(
        localStorage.getItem(
          "readingHistory"
        )
      ) || [];

    history = history.filter(
      (item) =>
        item._id !== post._id
    );

    history.unshift(post);

    history = history.slice(0, 20);

    localStorage.setItem(
      "readingHistory",
      JSON.stringify(history)
    );
  }, [post]);

  // FETCH
  useEffect(() => {
    fetchPost();
    fetchComments();
  }, [id]);

  // FETCH POST
  const fetchPost = async () => {
    try {
      const { data } =
        await API.get(`/posts/${id}`);

      setPost(data);

    } catch (error) {
      console.log(error);

    } finally {
      setLoading(false);
    }
  };

  // FETCH COMMENTS
  const fetchComments = async () => {
    try {
      const { data } =
        await API.get(
          `/comments/${id}`
        );

      setComments(data);

    } catch (error) {
      console.log(error);
    }
  };

  // COMMENT
  const handleComment =
    async () => {
      if (!text.trim()) return;

      try {
        const { data } =
          await API.post(
            `/comments/${id}`,
            { text },
            {
              headers: {
                Authorization: `Bearer ${user.token}`,
              },
            }
          );

        setComments([
          data,
          ...comments,
        ]);

        setText("");

      } catch (error) {
        alert(
          error.response?.data
            ?.message ||
            "Failed to comment"
        );
      }
    };

  // DELETE
  const handleDelete =
    async () => {
      const confirmDelete =
        window.confirm(
          "Delete this post?"
        );

      if (!confirmDelete) return;

      try {
        await API.delete(
          `/posts/${id}`,
          {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          }
        );

        navigate("/");

      } catch (error) {
        alert(
          error.response?.data
            ?.message ||
            "Delete failed"
        );
      }
    };

  // LIKE
  const toggleLike = () => {
    const likedPosts =
      JSON.parse(
        localStorage.getItem(
          "likedPosts"
        )
      ) || [];

    let updated;

    if (liked) {
      updated =
        likedPosts.filter(
          (postId) =>
            postId !== id
        );
    } else {
      updated = [
        ...likedPosts,
        id,
      ];
    }

    localStorage.setItem(
      "likedPosts",
      JSON.stringify(updated)
    );

    setLiked(!liked);
  };

  // BOOKMARK
  const toggleBookmark = () => {
    const bookmarkedPosts =
      JSON.parse(
        localStorage.getItem(
          "bookmarkedPosts"
        )
      ) || [];

    let updated;

    if (bookmarked) {
      updated =
        bookmarkedPosts.filter(
          (postId) =>
            postId !== id
        );
    } else {
      updated = [
        ...bookmarkedPosts,
        id,
      ];
    }

    localStorage.setItem(
      "bookmarkedPosts",
      JSON.stringify(updated)
    );

    setBookmarked(
      !bookmarked
    );
  };

  // FOLLOW
  const toggleFollow = () => {
    const followedAuthors =
      JSON.parse(
        localStorage.getItem(
          "followedAuthors"
        )
      ) || [];

    let updated;

    if (following) {
      updated =
        followedAuthors.filter(
          (authorId) =>
            authorId !==
            post.author._id
        );
    } else {
      updated = [
        ...followedAuthors,
        post.author._id,
      ];
    }

    localStorage.setItem(
      "followedAuthors",
      JSON.stringify(updated)
    );

    setFollowing(!following);
  };

  if (loading) {
    return (
      <Layout title="Article">

        <p className="text-[#707070] dark:text-[#9B9B9B]">
          Loading article...
        </p>

      </Layout>
    );
  }

  if (!post) {
    return (
      <Layout title="Article">

        <p className="text-[#707070] dark:text-[#9B9B9B]">
          Article not found.
        </p>

      </Layout>
    );
  }

  return (
    <Layout title="Article">

      <article className="w-full max-w-3xl mx-auto">

        {/* Cover */}
        {post.coverImage && (

          <img
            src={post.coverImage}
            alt="cover"
            className="
              w-full
              h-[260px] md:h-[420px]
              object-cover
              rounded-2xl
              mb-10
            "
          />

        )}

        {/* Meta */}
        <div className="mb-8">

          <div className="flex items-center gap-4">

            <img
              src={getAvatar(
                post.author?.name
              )}
              alt="avatar"
              className="
                w-12 h-12 rounded-full
                object-cover
              "
            />

            <div>

              <p className="font-medium">
                {post.author?.name}
              </p>

              <div
                className="
                  flex items-center gap-3
                  text-sm
                  text-[#707070]
                  dark:text-[#9B9B9B]
                  mt-1
                "
              >

                <span>
                  {new Date(
                    post.createdAt
                  ).toLocaleDateString()}
                </span>

                <div className="w-1 h-1 rounded-full bg-[#5A5A5A]" />

                <span>
                  {calculateReadingTime(
                    post.content
                  )}
                </span>

              </div>

              {/* Follow */}
              <button
                onClick={
                  toggleFollow
                }
                className={`
                  mt-4
                  h-10 px-4 rounded-xl
                  flex items-center gap-2
                  text-sm
                  transition
                  ${
                    following
                      ? "bg-[#EAEAEA] dark:bg-[#2A2A2A]"
                      : "bg-black dark:bg-white text-white dark:text-black"
                  }
                `}
              >

                {following ? (
                  <UserCheck size={16} />
                ) : (
                  <UserPlus size={16} />
                )}

                <span>
                  {following
                    ? "Following"
                    : "Follow"}
                </span>

              </button>

            </div>

          </div>

          {/* Title */}
          <h1
            className="
              text-4xl md:text-5xl
              font-bold
              tracking-tight
              leading-tight
              mt-8
            "
          >
            {post.title}
          </h1>

          {/* Actions */}
          {user?._id ===
            post.author?._id && (

            <div className="flex items-center gap-3 mt-8">

              <Link
                to={`/edit/${post._id}`}
                className="
                  h-10 px-4
                  rounded-xl
                  border border-[#E5E5E5]
                  dark:border-[#2B2B2B]
                  hover:bg-[#F5F5F5]
                  dark:hover:bg-[#222222]
                  flex items-center
                  transition
                "
              >
                Edit
              </Link>

              <button
                onClick={
                  handleDelete
                }
                className="
                  h-10 px-4
                  rounded-xl
                  border border-red-500/20
                  text-red-400
                  hover:bg-red-500/10
                  transition
                "
              >
                Delete
              </button>

            </div>
          )}

        </div>

        {/* Markdown */}
        <div
          className="
            prose
            dark:prose-invert
            max-w-none
            prose-lg
            prose-headings:font-bold
            prose-img:rounded-2xl
          "
        >

          <div
  className="
    prose
    dark:prose-invert
    max-w-none
    prose-lg
    prose-headings:font-bold
    prose-img:rounded-2xl
    prose-p:leading-8
    prose-pre:bg-[#202020]
  "
  dangerouslySetInnerHTML={{
    __html: post.content,
  }}
/>

        </div>

        {/* Interactions */}
        <div className="flex items-center gap-4 mt-12">

          {/* Like */}
          <button
            onClick={toggleLike}
            className={`
              h-11 px-4 rounded-xl
              border flex items-center gap-2
              transition
              ${
                liked
                  ? "border-red-500/20 bg-red-500/10 text-red-400"
                  : "border-[#E5E5E5] dark:border-[#2B2B2B] hover:bg-[#F5F5F5] dark:hover:bg-[#222222]"
              }
            `}
          >

            <Heart
              size={18}
              fill={
                liked
                  ? "currentColor"
                  : "none"
              }
            />

            <span>
              {liked
                ? "Liked"
                : "Like"}
            </span>

          </button>

          {/* Bookmark */}
          <button
            onClick={
              toggleBookmark
            }
            className={`
              h-11 px-4 rounded-xl
              border flex items-center gap-2
              transition
              ${
                bookmarked
                  ? "border-blue-500/20 bg-blue-500/10 text-blue-400"
                  : "border-[#E5E5E5] dark:border-[#2B2B2B] hover:bg-[#F5F5F5] dark:hover:bg-[#222222]"
              }
            `}
          >

            <Bookmark
              size={18}
              fill={
                bookmarked
                  ? "currentColor"
                  : "none"
              }
            />

            <span>
              {bookmarked
                ? "Saved"
                : "Bookmark"}
            </span>

          </button>

        </div>

        {/* Comments */}
        <section className="mt-20">

          <h2 className="text-3xl font-bold">
            Comments
          </h2>

          {/* Comment Box */}
          {user && (

            <div className="mt-8">

              <textarea
                value={text}
                onChange={(e) =>
                  setText(
                    e.target.value
                  )
                }
                placeholder="Write a comment..."
                className="
                  w-full
                  min-h-[120px]
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

              <div className="flex justify-end mt-4">

                <button
                  onClick={
                    handleComment
                  }
                  className="
                    h-10 px-5
                    bg-black dark:bg-white
                    text-white dark:text-black
                    rounded-xl
                    font-medium
                    hover:opacity-90
                    transition
                  "
                >
                  Comment
                </button>

              </div>

            </div>
          )}

          {/* Comments */}
          <div className="mt-10 space-y-5">

            {comments.length ===
            0 ? (

              <p className="text-[#707070] dark:text-[#9B9B9B]">
                No comments yet.
              </p>

            ) : (

              comments.map(
                (comment) => (

                  <div
                    key={
                      comment._id
                    }
                    className="
                      border border-[#E5E5E5]
                      dark:border-[#2B2B2B]
                      rounded-2xl
                      p-5
                    "
                  >

                    <div className="flex items-center gap-3">

                      <img
                        src={getAvatar(
                          comment.user
                            ?.name
                        )}
                        alt="avatar"
                        className="
                          w-10 h-10 rounded-full
                          object-cover
                        "
                      />

                      <div>

                        <p className="font-medium">
                          {
                            comment.user
                              ?.name
                          }
                        </p>

                        <p
                          className="
                            text-sm
                            text-[#707070]
                            dark:text-[#9B9B9B]
                            mt-1
                          "
                        >
                          {new Date(
                            comment.createdAt
                          ).toLocaleDateString()}
                        </p>

                      </div>

                    </div>

                    <p
                      className="
                        mt-5
                        leading-8
                        text-[#1A1A1A]
                        dark:text-[#D4D4D4]
                      "
                    >
                      {
                        comment.text
                      }
                    </p>

                  </div>
                )
              )
            )}

          </div>

        </section>

      </article>

    </Layout>
  );
}

export default PostDetails;