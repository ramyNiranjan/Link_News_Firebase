import React from "react";
import Layout from "./components/Layout";
import { useAuth } from "./hooks/useAuth";

export default function Home() {
  const { user } = useAuth();
  return <Layout></Layout>;
}
