"use client";

import React from "react";
import { useRowLabel } from "@payloadcms/ui";

const ArticleRowLabel: React.FC = () => {
  const currentArticle = useRowLabel();
  const data = currentArticle?.data || {};
  //@ts-ignore
  const docType = data?.doc_type?.toUpperCase() || "ARTICLE";
  //@ts-ignore
  const id = data?.id || "Untitled-ID";
  //@ts-ignore
  const title = data?.title || "Untitled";

  return `${docType} — ${id} — ${title}`;
};

export default ArticleRowLabel;
