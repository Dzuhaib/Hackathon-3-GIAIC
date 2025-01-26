
import React from "react";
import { notFound } from "next/navigation";
import Image from "next/image";
import client from "@/app/sanityClient";

interface BlogPost {
  _id: string;
  title: string;
  slug: {
    current: string;
  };
  content: Array<ContentBlock>;
  publishedAt: string;
  image?: {
    asset: {
      _id: string;
      url: string;
    };
  };
}

interface ContentBlock {
  _type: string; // e.g., "block"
  children: Array<ContentChild>;
}

interface ContentChild {
  _key: string;
  _type: string; // e.g., "span"
  text: string;
}

// Default export function for the dynamic page
export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>; // Using Promise here
}) {
  const resolvedParams = await params; // Await the promise to get the actual params
  const slug = resolvedParams.slug; // Extract the slug

  const query = `*[_type == "blog" && slug.current == $slug][0] {
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
  }`;

  const post: BlogPost | null = await client.fetch(query, { slug });

  if (!post) {
    notFound(); // Show 404 if post is not found
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      {/* Hero Section */}
      <div className="mb-6">
        <h1 className="text-4xl font-bold text-center">{post.title}</h1>
        {post.image && (
          <Image
            src={post.image.asset.url}
            width={800}
            height={400}
            alt={post.title}
            className="mt-4 rounded-lg shadow-lg"
          />
        )}
      </div>

      {/* Content Section */}
      <div className="mt-6">
        {post.content.map((block, index) => (
          <div key={index} className="mb-4">
            {block.children.map((child, childIndex) => (
              <p key={childIndex} className="text-lg leading-relaxed text-gray-700">
                {child.text}
              </p>
            ))}
          </div>
        ))}
      </div>

      {/* Published Date */}
      <p className="mt-4 text-gray-500 text-center">
        Published on: {new Date(post.publishedAt).toLocaleDateString()}
      </p>
    </div>
  );
}