"use client";

import React from "react";
import { GuidePopover } from "@/entities/guide/ui/GuidePopover";
import GuideText from "@/entities/guide/ui/GuideText";

export default function Guide() {
  return (
    <GuidePopover>
      <GuideText isTabletOrMobile />
    </GuidePopover>
  );
}
