'use client'
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import client from '../sanityClient';

const BlogSection: React.FC = () => {
  const [posts, setPosts] = useState<any[]>([]); // Use 'any' or define a proper type

  useEffect(() => {
    const fetchPosts = async () => {
      const query = `*[_type == "blog"] | order(publishedAt desc)[0...3] {
        _id,
        title,
        slug,
        publishedAt,
        image {
          asset -> {
            _id,
            url
          }
        }
      }`;
      try {
        const data = await client.fetch(query);
        setPosts(data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div className="text-center pb-10 px-20">
      <h1 className="text-[36px] font-semibold">Our Blogs</h1>
      <p className="mt-2 text-[16px]">Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 pb-20">
        {posts.length > 0 ? (
          posts.map((post) => (
            <div key={post._id} className="items-center text-center">
              {post.image && (
                <Image
                  className='hover:shadow-md hover:rounded-md'
                  src={post.image.asset.url}
                  alt={post.title}
                  height={400}
                  width={400}
                />
              )}
              <p className="text-[18px] mt-5">{post.title}</p>
              <Link href={`/blog/${post.slug.current}`}>
                <button className="bg-transparent text-black border-b-2 my-3 text-[18px] font-light border-b-black">Read more</button>
              </Link>
            </div>
          ))
        ) : (
          <p>No blog posts available.</p>
        )}
      </div>

      <Link href="/blog">
        <button className="bg-transparent text-black border-b-2 pb-2 text-[20px] border-b-black">More</button>
      </Link>
    </div>
  );
};

export default BlogSection;