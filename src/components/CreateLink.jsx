import React from "react";
import { useAuth } from "../hooks/useAuth";
import Layout from "./Layout";

function CreateLink() {
  const { user } = useAuth();
  console.log(user);

  return <Layout>Hello</Layout>;
}

export default CreateLink;
