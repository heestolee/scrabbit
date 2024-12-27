"use client";

import React from "react";
import { GuidePopover } from "@/components/guide/GuidePopover";
import GuideText from "@/components/guide/GuideText";

export default function Guide() {
  return (
    <GuidePopover>
      <GuideText />
    </GuidePopover>
  );
}
