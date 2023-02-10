import type { NextPage } from "next";
import styles from "../styles/Home.module.css";
import { useState, useEffect } from "react";
import Link from "next/link";

const Index: NextPage = () => {
  return (
    <div name="middle">
      <h1>"TenderAssist"</h1>

      <Link href={"login"}>
        <button type="button" name="Button">
          Login
        </button>
      </Link>
    </div>
  );
};

export default Index;
