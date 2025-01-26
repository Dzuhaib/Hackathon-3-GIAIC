// /app/blog/page.tsx
'use client';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import client from '@/app/sanityClient';

interface BlogPost {
  _id: string;
  title: string;
  slug: {
    current: string;
  };
  content: Array<any>;
  publishedAt: string;
  image?: {
    asset: {
      _id: string;
      url: string;
    };
  };
}

const BlogPage: React.FC = () => {
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      setLoading(true);
      const query = `
        *[_type == "blog"] | order(publishedAt desc) {
          _id,
          title,
          slug,
          content,
          publishedAt,
          image {
            asset -> {
              _id,
              url
            }
          }
        }
      `;
      const data = await client.fetch(query);
      setBlogs(data);
      setLoading(false);
    };

    fetchBlogs();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {/* Hero Section */}
      <div className="flex items-center bg4-center bg4-cover h-[320px] flex-col justify-center bg-[url('/images/shopbg.png')] bg-cover">
        <Image src="/icons/shop1.png" height={70} width={70} alt="Blog Icon" />
        <h1 className="text-[48px] font-semibold">Blog</h1>
      </div>

      {/* Blog Section */}
      <div className="flex pt-20 pb-5 px-20">
        {/* Blog Posts */}
        <div className="w-[70%]">
          {blogs.map((blog) => (
            <div className="px-4 mb-8" key={blog._id}>
              {blog.image && (
                <Image
                  className="pb-5"
                  src={blog.image.asset.url}
                  width={1000}
                  height={500}
                  alt={blog.title}
                />
              )}
              <h1 className="font-semibold text-[24px] py-2">{blog.title}</h1>
              <p className="pt-3">
                {blog.content[0]?.children[0]?.text || 'No content available...'}
              </p>
              <Link href={`/blog/${blog.slug.current}`}>
                <button className="bg-transparent mb-5 text-black border-b-[1px] my-2 border-black">
                  Read more
                </button>
              </Link>
            </div>
          ))}
        </div>

        {/* Sidebar */}
        <div className="w-[30%] pl-10">
          {/* Search */}
          <div className="relative mb-5">
            <input
              type="text"
              placeholder="Search"
              className="w-full py-3 pl-4 pr-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-black"
            />
            <div className="absolute inset-y-0 right-0 flex items-center pr-3">
              <Image
                src="/icons/search.png"
                alt="Search Icon"
                width={20}
                height={20}
              />
            </div>
          </div>

          {/* Categories */}
          <div className="px-4 mb-8">
            <h2 className="text-[24px] mb-4 font-semibold">Categories</h2>
            <div className="flex mb-4 text-gray-400 justify-between px-2 py-2">
              <h4>Crafts</h4>
              <p>2</p>
            </div>
            <div className="flex mb-4 text-gray-400 justify-between px-2 py-2">
              <h4>Furniture</h4>
              <p>5</p>
            </div>
            <div className="flex mb-4 text-gray-400 justify-between px-2 py-2">
              <h4>Home Decor</h4>
              <p>3</p>
            </div>
            {/* Add other categories here */}
          </div>

          {/* Latest Posts */}
          <div className="px-4">
            <h2 className="text-[24px] mb-4 font-semibold">Latest Posts</h2>
            {blogs.slice(0, 5).map((blog) => (
              <div className="flex gap-4 mb-4 px-2 py-2" key={blog._id}>
                {blog.image && (
                  <Image
                    className="rounded-md"
                    src={blog.image.asset.url}
                    width={50}
                    height={50}
                    alt={blog.title}
                  />
                )}
                <div>
                  <Link href={`/blog/${blog.slug.current}`}>
                    <h3 className="font-semibold">{blog.title}</h3>
                  </Link>
                  <p>{new Date(blog.publishedAt).toLocaleDateString()}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogPage;