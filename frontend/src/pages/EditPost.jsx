import {
  useEffect,
  useState,
} from "react";

import {
  useNavigate,
  useParams,
} from "react-router-dom";

import {
  Sparkles,
} from "lucide-react";

import Editor from "../components/Editor";

import Layout from "../components/Layout";

import API from "../api/axios";

import { useAuth } from "../context/AuthContext";

import {
  titleSuggestions,
  introSuggestions,
} from "../utils/aiSuggestions";

function EditPost() {
  const { id } = useParams();

  const navigate = useNavigate();

  const { user } = useAuth();

  const [title, setTitle] =
    useState("");

  const [content, setContent] =
    useState("");

  const [coverImage, setCoverImage] =
    useState("");

  const [loading, setLoading] =
    useState(true);

  // FETCH POST
  useEffect(() => {
    const fetchPost = async () => {
      try {
        const { data } =
          await API.get(
            `/posts/${id}`
          );

        setTitle(data.title);

        setContent(data.content);

        setCoverImage(
          data.coverImage || ""
        );

      } catch (error) {
        console.log(error);

      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  // UPDATE POST
  const handleUpdate =
    async () => {
      try {
        await API.put(
          `/posts/${id}`,
          {
            title,
            content,
            coverImage,
          },
          {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          }
        );

        navigate(
          `/post/${id}`
        );

      } catch (error) {
        alert(
          error.response?.data
            ?.message ||
            "Update failed"
        );
      }
    };

  // AI TITLE
  const generateTitle = () => {
    const random =
      titleSuggestions[
        Math.floor(
          Math.random() *
            titleSuggestions.length
        )
      ];

    setTitle(random);
  };

  // AI INTRO
  const generateIntro = () => {
    const random =
      introSuggestions[
        Math.floor(
          Math.random() *
            introSuggestions.length
        )
      ];

    setContent((prev) =>
      prev
        ? `${prev}\n\n${random}`
        : random
    );
  };

  if (loading) {
    return (
      <Layout title="Edit Post">

        <p className="text-[#707070] dark:text-[#9B9B9B]">
          Loading editor...
        </p>

      </Layout>
    );
  }

  return (
    <Layout title="Edit Post">

      <div className="w-full max-w-4xl mx-auto">

        {/* AI Assistant */}
        <div className="flex flex-wrap gap-3 mb-8">

          <button
            onClick={generateTitle}
            className="
              h-10 px-4 rounded-xl
              border border-[#E5E5E5]
              dark:border-[#2B2B2B]
              hover:bg-[#F5F5F5]
              dark:hover:bg-[#222222]
              flex items-center gap-2
              text-sm
              transition
            "
          >

            <Sparkles size={16} />

            <span>Generate Title</span>

          </button>

          <button
            onClick={generateIntro}
            className="
              h-10 px-4 rounded-xl
              border border-[#E5E5E5]
              dark:border-[#2B2B2B]
              hover:bg-[#F5F5F5]
              dark:hover:bg-[#222222]
              flex items-center gap-2
              text-sm
              transition
            "
          >

            <Sparkles size={16} />

            <span>Generate Intro</span>

          </button>

        </div>

        {/* Cover */}
        <input
          type="text"
          placeholder="Cover image URL..."
          value={coverImage}
          onChange={(e) =>
            setCoverImage(
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
            text-sm
            mb-8
          "
        />

        {/* Preview */}
        {coverImage && (

          <img
            src={coverImage}
            alt="cover"
            className="
              w-full
              h-[260px]
              md:h-[380px]
              object-cover
              rounded-2xl
              mb-10
            "
          />

        )}

        {/* Title */}
        <input
          type="text"
          placeholder="Untitled"
          value={title}
          onChange={(e) =>
            setTitle(
              e.target.value
            )
          }
          className="
            w-full
            bg-transparent
            outline-none
            text-4xl md:text-6xl
            font-bold
            tracking-tight
            placeholder:text-[#5A5A5A]
            leading-tight
          "
        />

        {/* Content */}
        {/* Content */}
<Editor
  content={content}
  setContent={setContent}
/>

        {/* Actions */}
        <div className="flex justify-end mt-10">

          <button
            onClick={handleUpdate}
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

export default EditPost;