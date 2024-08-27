"use client";

import {
  useGetLinkageAIById,
  useGetLinkagesAIFile,
  useGetLinkageAIBySlug,
} from "@/api/ai";
import React from "react";
import { useParams } from "next/navigation";

const LinkageBot = () => {
  const params = useParams();
  const slug = params.slug as string;

  const { data } = useGetLinkageAIBySlug(slug);
  const { data: getLinkageAiById } = useGetLinkageAIById({
    linkageId: data?.data?.linkageId,
    AiId: data?.data?.id,
  });

  const { data: linkageAIfiles } = useGetLinkagesAIFile(data?.data?.linkageId);

  return <div>LinkageBot (by slug) Details page here</div>;
};

export default LinkageBot;
