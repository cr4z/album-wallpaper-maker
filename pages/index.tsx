import type { NextPage } from "next";
import Head from "next/head";
import { useState } from "react";
import Controller from "../src/controller";
import Grid from "../src/grid";
import styles from "../styles/Home.module.css";

const Home: NextPage = () => {
  const [cols, setCols] = useState<number>(3);
  const [rows, setRows] = useState<number>(6);
  const [feedback, setFeedback] = useState<string>("");

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to <a href="https://nextjs.org">Next.js!</a>
        </h1>

        <p className={styles.description}>
          Get started by editing <code className={styles.code}>pages/index.tsx</code>
        </p>

        <Controller setCols={setCols} setRows={setRows} setFeedback={setFeedback} />
        {feedback}
        <Grid cols={cols} rows={rows} />
      </main>
    </div>
  );
};

export default Home;
