"use client";
import React from "react";
import { motion } from "framer-motion";

export default function Motion(props: any) {
  return <motion.div {...props}>{props.children}</motion.div>;
}
