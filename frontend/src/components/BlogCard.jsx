import { MessageCircle } from "lucide-react";

function BlogCard() {
  return (
    <div className="border border-[#2F2F2F] rounded-2xl overflow-hidden hover:bg-[#202020] transition">

      <img
        src="https://images.unsplash.com/photo-1499750310107-5fef28a66643"
        alt="blog"
        className="w-full h-52 object-cover"
      />

      <div className="p-5">

        <p className="text-xs text-[#9B9B9B] mb-3">
          Technology
        </p>

        <h2 className="text-2xl font-semibold leading-snug">
          Building modern full-stack applications
        </h2>

        <p className="text-[#9B9B9B] mt-4 leading-relaxed text-sm">
          Learn how to create scalable and elegant web
          applications using React, Node.js, and MongoDB.
        </p>

        <div className="flex items-center gap-2 mt-5 text-sm text-[#9B9B9B]">
          <MessageCircle size={15} />
          12 comments
        </div>

      </div>
    </div>
  );
}

export default BlogCard;