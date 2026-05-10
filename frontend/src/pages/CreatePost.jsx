import {
  useEffect,
  useState,
} from "react";

import Editor from "../components/Editor";

import { useNavigate } from "react-router-dom";

import uploadImage from "../utils/uploadImage";

import Layout from "../components/Layout";

import {
  Sparkles,
  ImagePlus,
} from "lucide-react";

import API from "../api/axios";

import { useAuth } from "../context/AuthContext";

import {
  titleSuggestions,
  introSuggestions,
} from "../utils/aiSuggestions";

function CreatePost() {
  const navigate = useNavigate();

  const { user } = useAuth();

  const [title, setTitle] = useState(
    localStorage.getItem(
      "draft-title"
    ) || ""
  );

  const [content, setContent] =
    useState(
      localStorage.getItem(
        "draft-content"
      ) || ""
    );

  const [coverImage, setCoverImage] =
    useState(
      localStorage.getItem(
        "draft-cover"
      ) || ""
    );

  const [saving, setSaving] =
    useState(false);

  const [uploading, setUploading] =
    useState(false);

  const [isDraft, setIsDraft] =
    useState(false);

  const [aiLoading, setAiLoading] =
    useState(false);

  // AUTO SAVE
  useEffect(() => {
    setSaving(true);

    const timer = setTimeout(() => {
      localStorage.setItem(
        "draft-title",
        title
      );

      localStorage.setItem(
        "draft-content",
        content
      );

      localStorage.setItem(
        "draft-cover",
        coverImage
      );

      setSaving(false);
    }, 700);

    return () =>
      clearTimeout(timer);
  }, [title, content, coverImage]);

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
        ? `${prev}<p>${random}</p>`
        : `<p>${random}</p>`
    );
  };

  // IMAGE UPLOAD
  const handleImageUpload =
    async (e) => {
      const file =
        e.target.files[0];

      if (!file) return;

      try {
        setUploading(true);

        const imageUrl =
          await uploadImage(file);

        setCoverImage(imageUrl);

      } catch (error) {
        alert(
          "Image upload failed"
        );

      } finally {
        setUploading(false);
      }
    };

  // AI GENERATE
  const handleAIGenerate =
    async () => {
      try {
        if (!title.trim()) {
          alert(
            "Enter a title first"
          );

          return;
        }

        setAiLoading(true);

        const { data } =
          await API.post(
            "/ai/generate",
            {
              prompt: `Write a professional blog article about: ${title}`,
            },
            {
              headers: {
                Authorization: `Bearer ${user.token}`,
              },
            }
          );

        setContent(data.text);

      } catch (error) {
        alert(
          "AI generation failed"
        );

      } finally {
        setAiLoading(false);
      }
    };

  // CLEAR DRAFT
  const clearDraft = () => {
    localStorage.removeItem(
      "draft-title"
    );

    localStorage.removeItem(
      "draft-content"
    );

    localStorage.removeItem(
      "draft-cover"
    );

    setTitle("");
    setContent("");
    setCoverImage("");
  };

  // PUBLISH
  const handlePublish =
    async (draftMode = false) => {
      try {
        const { data } =
          await API.post(
            "/posts",
            {
              title,
              content,
              coverImage,
              isDraft: draftMode,
            },
            {
              headers: {
                Authorization: `Bearer ${user.token}`,
              },
            }
          );

        clearDraft();

        if (draftMode) {
          navigate("/drafts");
        } else {
          navigate(
            `/post/${data._id}`
          );
        }

      } catch (error) {
        alert(
          error.response?.data
            ?.message ||
            "Failed to publish"
        );
      }
    };

  return (
    <Layout title="New Post">

      <div className="w-full max-w-4xl mx-auto">

        {/* Top Bar */}
        <div className="flex items-center justify-between mb-8">

          <p className="text-sm text-[#707070] dark:text-[#9B9B9B]">

            {saving
              ? "Saving draft..."
              : "Draft saved"}

          </p>

          <button
            onClick={clearDraft}
            className="
              text-sm
              text-red-400
              hover:underline
            "
          >
            Clear Draft
          </button>

        </div>

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

            <span>
              Generate Title
            </span>

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

            <span>
              Generate Intro
            </span>

          </button>

          <button
            onClick={handleAIGenerate}
            disabled={aiLoading}
            className="
              h-10 px-4 rounded-xl
              bg-black dark:bg-white
              text-white dark:text-black
              text-sm font-medium
              hover:opacity-90
              transition
            "
          >

            {aiLoading
              ? "Generating..."
              : "Generate with AI"}

          </button>

        </div>

        {/* Upload */}
        <div className="mb-8">

          <label
            className="
              h-12 px-5 rounded-xl
              border border-[#E5E5E5]
              dark:border-[#2B2B2B]
              hover:bg-[#F5F5F5]
              dark:hover:bg-[#222222]
              flex items-center gap-2
              justify-center
              text-sm
              cursor-pointer
              transition
              w-fit
            "
          >

            <ImagePlus size={18} />

            <span>
              {uploading
                ? "Uploading..."
                : "Upload Cover Image"}
            </span>

            <input
              type="file"
              accept="image/*"
              onChange={
                handleImageUpload
              }
              hidden
            />

          </label>

        </div>

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
        <Editor
          content={content}
          setContent={setContent}
        />

        {/* Actions */}
        <div className="flex items-center justify-end gap-3 mt-10">

          {/* Save Draft */}
          <button
            onClick={() =>
              handlePublish(true)
            }
            className="
              h-11 px-5 rounded-xl
              border border-[#E5E5E5]
              dark:border-[#2B2B2B]
              hover:bg-[#F5F5F5]
              dark:hover:bg-[#222222]
              transition
            "
          >
            Save Draft
          </button>

          {/* Publish */}
          <button
            onClick={() =>
              handlePublish(false)
            }
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
            Publish
          </button>

        </div>

      </div>

    </Layout>
  );
}

export default CreatePost;