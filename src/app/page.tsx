import Head from "next/head";
import ChatPage from "./chatPage";

export default function Home() {
  return (
    <>
      <Head>
        <title>FURIA Chatbot</title>
        <meta name="Furioso" content="Chatbot interativo para fãs da FURIA" />
      </Head>
      <main>
        <ChatPage />
      </main>
    </>
  );
}
